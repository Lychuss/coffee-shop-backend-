"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_cart_id = exports.create_cart = exports.insert_guest = void 0;
const db_1 = require("../config/db");
const insert_guest = (userId) => {
    return db_1.pool.query(`INSERT INTO users VALUES ($1, 'guest')`, [userId]);
};
exports.insert_guest = insert_guest;
const create_cart = async (cart_id, user_id) => {
    return db_1.pool.query('INSERT INTO carts VALUES ($1, $2)', [cart_id, user_id]);
};
exports.create_cart = create_cart;
const get_cart_id = async (user_id) => {
    return db_1.pool.query('SELECT carts.id FROM carts WHERE user_id = $1', [user_id]);
};
exports.get_cart_id = get_cart_id;
