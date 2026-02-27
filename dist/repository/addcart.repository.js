"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.display_products_cart = exports.get_total_items = exports.add_cart_items = void 0;
const db_1 = require("../config/db");
const add_cart_items = async (cartItemId, cartId, cart) => {
    return db_1.pool.query('INSERT INTO cart_items VALUES ($1, $2, $3, $4, $5)', [cartItemId, cartId, cart.product_name, cart.size, cart.quantity]);
};
exports.add_cart_items = add_cart_items;
const get_total_items = async (userId) => {
    return db_1.pool.query(`SELECT COUNT(*) AS total_items FROM cart_items 
        JOIN carts ON cart_items.carts_id = carts.carts_id
        WHERE carts.user_id = $1`, [userId]);
};
exports.get_total_items = get_total_items;
const display_products_cart = async (userId) => {
    return db_1.pool.query(`SELECT products.name, products.image, products.rating, products.price, products.category
        FROM products
        INNER JOIN cart_items ON products.name = cart_items.product_name
        INNER JOIN carts ON cart_items.carts_id = carts.carts_id
        WHERE carts.user_id = $1`, [userId]);
};
exports.display_products_cart = display_products_cart;
