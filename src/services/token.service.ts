import jwt from 'jsonwebtoken';
import type { User } from '../models/user.interface.ts';

export const returnPayload = (token: string): string | null => {
    try {
        const decode: User = jwt.decode(token) as User;
        return decode.cartId;
    } catch(err) {
        return null;
    }
}

