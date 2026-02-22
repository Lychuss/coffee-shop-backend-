import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { insert_guest, create_cart, get_cart_id } from "../repository/guest.repository.ts";
import { createToken, verify_token } from "../middlewares/authorization.middlewares.ts";

export const guest = async (req: Request, res: Response) => {
    const userId = uuidv4();
    const cartId = uuidv4();

    try {
        const token = req.cookies?.token; 

        if (token) {
            if (verify_token(token)) {
                return res.status(200).json({ message: 'You have a valid token!', success: true });
            }
        }

        await insert_guest(userId);
        console.log(userId);
        await create_cart(cartId, userId);
        const newToken = createToken(userId, cartId);

        res.cookie('token', newToken, {
        httpOnly: true,
        secure: false, 
        sameSite: 'lax',
        });

        return res.status(200).json({ message: 'Welcome user!', success: false, userId: userId });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};