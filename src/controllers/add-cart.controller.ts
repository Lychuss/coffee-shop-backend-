import type { Request, Response } from "express";
import type { CartItem } from "../interface/cart.interface";
import { returnPayload } from "../services/token.service";
import { add_cart_items, get_total_items, display_products_cart, 
    display_product_bills, update_product_bills
} from "../repository/addcart.repository";
import { v4 as uuidv4 } from "uuid";
import type { User } from "../interface/user.interface";

export const add_cart = async (req: Request, res: Response) => {
    const cart_items_id = uuidv4();
    const token: string  = req.cookies.token;
    console.log(req.body);
    const cartItem: CartItem = req.body;
    const payLoad: User | null = returnPayload(token);
    console.log(cartItem);

    if(payLoad === null) return res.status(404).json({ message: 'Invalid cart id no value!', success: false});

    try {
        await add_cart_items(cart_items_id, payLoad.cartId, cartItem);
        const query = await get_total_items(payLoad.userId);
        const data = query.rows[0];
        return res.status(200).json({ message: 'Added cart sucessfully', success: true, data: data.total_items });
    } catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error!', success: false });
    }
}

export const display_cart = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const payLoad: User | null = returnPayload(token);
    if(!token || !payLoad) return res.status(404).json({ message: 'Invalid token! must have a token', success: false });

    try {
        const query_cart = await display_products_cart(payLoad.userId);
        const query_bills = await display_product_bills(payLoad.userId);
        const data = query_cart.rows;
        const bills = query_bills.rows;
        console.log(data); 
        return res.status(200).json({ message: 'Successfully get all the product cart', data: data, success: true, bills: bills });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error!', success: false });
    }
}

export const display_bills = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const payLoad: User | null = returnPayload(token);
    if(!token || !payLoad) return res.status(404).json({ message: 'Invalid token! must have a token', success: false });

    try {
        const query = await display_product_bills(payLoad.userId);
        const data = query.rows;
        console.log(data); 
        return res.status(200).json({ message: 'Successfully get all the product bills', data: data, success: true });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error!', success: false });
    }
}

export const update_bills = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const payLoad: User | null = returnPayload(token);
    const { method, name } = req.params as {
        method: "add" | "minus";
        name: string;
    };

    if(!token || !payLoad || !method || !name ) return res.status(404).json({ message: 'Invalid token! must have a token or invalid params', success: false });

    try {
        await update_product_bills(payLoad.userId, method, name);
        return res.status(200).json({ message: 'Update successfully!', success: true });
    } catch(err) {
        console.log(err);
         return res.status(500).json({ message: 'Internal Server Error!', success: false });
    }
}
