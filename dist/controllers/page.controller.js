"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guest = void 0;
const uuid_1 = require("uuid");
const guest_repository_1 = require("../repository/guest.repository");
const authorization_middlewares_1 = require("../middlewares/authorization.middlewares");
const guest = async (req, res) => {
    console.log("DATABASE_URL =", process.env.DATABASE_URL);
    const userId = (0, uuid_1.v4)();
    const cartId = (0, uuid_1.v4)();
    try {
        const token = req.cookies?.token;
        if (token) {
            if ((0, authorization_middlewares_1.verify_token)(token)) {
                return res.status(200).json({ message: 'You have a valid token!', success: true });
            }
        }
        await (0, guest_repository_1.insert_guest)(userId);
        console.log(userId);
        await (0, guest_repository_1.create_cart)(cartId, userId);
        const newToken = (0, authorization_middlewares_1.createToken)(userId, cartId);
        res.cookie('token', newToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        return res.status(200).json({ message: 'Welcome user!', success: false, userId: userId });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};
exports.guest = guest;
