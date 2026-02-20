import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { insert_guest } from "../repository/guest.repository.ts";
import { createToken, verify_token } from "../middlewares/authorization.middlewares.ts";

export const guest = async (req: Request, res: Response) => {
    const userId = uuidv4();
    const {token} = req.body;

    if(token){
        if(verify_token(token)) {
            return res.status(200).json({ message: 'You have a valid token!', success: true});
        }

        try {
            const token = createToken(userId);

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });

            return res.status(200).json({ message: 'Welcome user!', success: false });

        } catch(err){
            console.log(err);
            return res.status(500).json({ message: 'There is an error in the internal server!', success: false });
        }

    }

}