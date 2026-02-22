import jwt from 'jsonwebtoken';
import type { User } from '../models/user.interface.ts';

export const returnPayload = (token: string): User | null => {
    try {
        const decode: User = jwt.decode(token) as User;
        return decode;
    } catch(err) {
        return null;
    }
}

