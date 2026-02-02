import type { NextFunction } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { User } from "../models/user.interface.ts";

export const createToken = (): string => {
    const payLoad = {iat: Math.floor(Date.now()/ 1000)};
    const JWT_SECRET = process.env.SECRET_KEY;

    if(!JWT_SECRET) throw new Error("JWT_SECRET must have a value!");

    const token = jwt.sign(payLoad, JWT_SECRET, {expiresIn: '1h'});

    return token;
}

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.get("authorization");
    const token = bearerHeader && bearerHeader.split(' ')[1];
    const JWT_SECRET = process.env.SECRET_KEY;

    if(!JWT_SECRET) throw new Error("JWT_SECRET must have a value!");

    if(!token) return res.status(401).json({message: 'You must have a token!'});

    try {
        const decode = jwt.verify(token, JWT_SECRET) as User;
        const currentTime = Math.floor(Date.now() / 1000);
        const timeExpiration = decode.exp! - currentTime;

        if(timeExpiration < 360){
            const newToken = createToken();
            res.setHeader('x-refresh-token', newToken);
        }

        next();
    } catch(err) {
        return res.status(401).json({
            message: "You have an invalid token!",
            success: false
        });
    }
}
