import type { Request, Response } from "express";
import { createInvoice } from "../services/xendit.service";
import type { Order } from "../interface/order.interface";
import { add_order, update_xendit, update_status } from "../repository/payment.repository";
import { get_cart_id } from "../repository/guest.repository";
import { returnPayload } from "../services/token.service";
import type { User } from "../interface/user.interface";

export const createPayment = async (req: Request, res: Response) => {
    const { payment, total_amount} = req.body as Order;
    const token = req.cookies.token;
    const payLoad: User | null = returnPayload(token);

    if(!payment || !total_amount) return res.status(404).json({ message: 'Must have a cart before order!', success: false });
    if(payLoad === null) return res.status(404).json({ message: 'Invalid cart id no value!', success: false});

    try {
        const get_id = await get_cart_id(payLoad.userId);
        const cart_id = get_id.rows[0].carts_id;

        const set_order = await add_order(cart_id, payment, total_amount);
        const set_order_data = set_order.rows[0];

        const invoice = await createInvoice(set_order_data.orders_id, total_amount);

        const set_xendit = await update_xendit(invoice.id, set_order_data.orders_id);

        return res.json({ invoice_url: invoice.invoice_url });

    } catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal Server error!', success: false });
    }
};

export const xenditWebhook = async (req: Request, res: Response) => {
    const event = req.body;

    if (event.status === "PAID") {
        const externalId = event.external_id; 
        const orderId = externalId.split("-")[1];

        await update_status(orderId);
    }

    return res.sendStatus(200);
};