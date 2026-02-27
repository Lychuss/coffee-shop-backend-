"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.display_cart = exports.add_cart = void 0;
const token_service_1 = require("../services/token.service");
const addcart_repository_1 = require("../repository/addcart.repository");
const uuid_1 = require("uuid");
const add_cart = async (req, res) => {
    const cart_items_id = (0, uuid_1.v4)();
    const token = req.cookies.token;
    console.log(req.body);
    const cartItem = req.body;
    const payLoad = (0, token_service_1.returnPayload)(token);
    console.log(cartItem);
    if (payLoad === null)
        return res.status(404).json({ message: 'Invalid cart id no value!', success: false });
    try {
        await (0, addcart_repository_1.add_cart_items)(cart_items_id, payLoad.cartId, cartItem);
        const query = await (0, addcart_repository_1.get_total_items)(payLoad.userId);
        const data = query.rows[0];
        return res.status(200).json({ message: 'Added cart sucessfully', success: true, data: data.total_items });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error!', success: false });
    }
};
exports.add_cart = add_cart;
const display_cart = async (req, res) => {
    const token = req.cookies.token;
    const payLoad = (0, token_service_1.returnPayload)(token);
    if (!token || !payLoad)
        return res.status(404).json({ message: 'Invalid token! must have a token', success: false });
    try {
        const query = await (0, addcart_repository_1.display_products_cart)(payLoad.userId);
        const data = query.rows;
        console.log(data);
        return res.status(200).json({ message: 'Successfully get all the product cart', data: data, success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error!', success: false });
    }
};
exports.display_cart = display_cart;
