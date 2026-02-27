"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_token = exports.authenticated = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (userId, cartId) => {
    const payLoad = { userId: userId, role: 'guest', cartId: cartId };
    const JWT_SECRET = process.env.SECRET_KEY;
    if (!JWT_SECRET)
        throw new Error("JWT_SECRET must have a value!");
    const token = jsonwebtoken_1.default.sign(payLoad, JWT_SECRET, { expiresIn: '1h' });
    return token;
};
exports.createToken = createToken;
const authenticated = (req, res, next) => {
    const token = req.cookies?.token;
    const JWT_SECRET = process.env.SECRET_KEY;
    if (!JWT_SECRET)
        throw new Error("JWT_SECRET must have a value!");
    if (!token)
        return res.status(401).json({ message: 'You must have a token!' });
    try {
        const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "You have an invalid token!",
            success: false
        });
    }
};
exports.authenticated = authenticated;
const verify_token = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    }
    catch {
        return false;
    }
};
exports.verify_token = verify_token;
