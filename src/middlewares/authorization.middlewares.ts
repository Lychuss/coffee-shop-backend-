import type { NextFunction } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { User } from "../interface/user.interface";

export const createToken = (userId: string, cartId: string): string => {
    const payLoad = {userId: userId, role: 'guest', cartId: cartId};
    const JWT_SECRET = process.env.SECRET_KEY;

    if(!JWT_SECRET) throw new Error("JWT_SECRET must have a value!");

    const token = jwt.sign(payLoad, JWT_SECRET, {expiresIn: '1h'});

    return token;
}

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    const JWT_SECRET = process.env.SECRET_KEY;

    if(!JWT_SECRET) throw new Error("JWT_SECRET must have a value!");

    if(!token) return res.status(401).json({message: 'You must have a token!'});

    try {
        const decode = jwt.verify(token, JWT_SECRET) as User;
        next();
    } catch(err) {
        return res.status(401).json({
            message: "You have an invalid token!",
            success: false
        });
    }
}

export const verify_token = (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY!);
    } catch {
        return false;
    }
};
