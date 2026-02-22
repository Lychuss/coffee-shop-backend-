import type { Request, Response } from "express";
import type { CartItem } from "../models/cart.interface.ts";
import { returnPayload } from "../services/token.service.ts";
import { add_cart_items } from "../repository/addcart.repository.ts";
import { v4 as uuidv4 } from "uuid";

export const add_cart = async (req: Request, res: Response) => {
    const cart_items_id = uuidv4();
    const token: string  = req.cookies.token;
    const cartItem: CartItem = req.body;
    const cartId: string | null = returnPayload(token);

    if(cartId === null) return res.status(404).json({ message: 'Invalid cart id no value!', success: false});

    try {
        const add_cart = await add_cart_items(cart_items_id, cartId, cartItem);

        return res.status(200).json({ message: 'Added cart sucessfully', success: true });
    } catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error!', success: false });
    }
}