import type { NextFunction } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { User } from "../models/user.interface.ts";

export const createToken = (userId: string): string => {
    const payLoad = {userId: userId, role: 'guest'};
    const JWT_SECRET = process.env.SECRET_KEY;

    if(!JWT_SECRET) throw new Error("JWT_SECRET must have a value!");

    const token = jwt.sign(payLoad, JWT_SECRET, {expiresIn: '1h'});

    return token;
}

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.body;
    const token = req.cookies?.token;
    const JWT_SECRET = process.env.SECRET_KEY;

    if(!JWT_SECRET) throw new Error("JWT_SECRET must have a value!");

    if(!token) return res.status(401).json({message: 'You must have a token!'});

    try {
        const decode = jwt.verify(token, JWT_SECRET) as User;
        const currentTime = Math.floor(Date.now() / 1000);
        const timeExpiration = decode.exp! - currentTime;

        if(timeExpiration < 360){
            const newToken = createToken(userId);
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

export const verify_token = (token: string) => {
    try {
        if(token){
            try{ 
                if(jwt.verify(token, process.env.SECRET_KEY!)) return true;
            } catch(err){
                return false
            }   
        }
        return false;
    } catch(err){
        return false
    }
}
