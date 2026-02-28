import { pool } from "../config/db";
import type { CartItem } from "../interface/cart.interface";

export const add_cart_items = async (cartItemId: string, cartId: string, cart: CartItem) => {
    return pool.query(
        `INSERT INTO cart_items VALUES ($1, $2, $3, $4, $5) 
        ON CONFLICT (carts_id, product_name)
        DO UPDATE
        SET quantity = cart_items.quantity + EXCLUDED.quantity`,
        [cartItemId, cartId, cart.product_name, cart.size, cart.quantity]
    );
}

export const get_total_items = async (userId: string) => {
    return pool.query(
        `SELECT COUNT(*) AS total_items FROM cart_items 
        JOIN carts ON cart_items.carts_id = carts.carts_id
        WHERE carts.user_id = $1`, [userId]
    );
}

export const display_products_cart = async (userId: string) => {
    return pool.query(
        `SELECT products.name, products.image, products.rating, products.price, products.category
        FROM products
        INNER JOIN cart_items ON products.name = cart_items.product_name
        INNER JOIN carts ON cart_items.carts_id = carts.carts_id
        WHERE carts.user_id = $1`, [userId]
    );
}

export const display_product_bills = async (userId: string) => {
    return pool.query(
        `SELECT products.price, products.name, products.image, cart_items.quantity 
        FROM products JOIN cart_items ON products.name = cart_items.product_name
        JOIN carts ON cart_items.carts_id = carts.carts_id
        JOIN users ON carts.user_id = users.users_id
        WHERE carts.user_id = $1`, [userId]
    );
}

export const update_product_bills = async (userId: string, method: string, name: string) => {
    if(method === 'minus'){
            return pool.query(
                `UPDATE cart_items 
                SET quantity = quantity - 1
                FROM carts, products 
                WHERE cart_items.carts_id = carts.carts_id 
                AND cart_items.product_name = $1
                AND carts.user_id = $2`, [name, userId]
            );
    } else {
            return pool.query(
                `UPDATE cart_items 
                SET quantity = quantity + 1
                FROM carts, products 
                WHERE cart_items.carts_id = carts.carts_id 
                AND cart_items.product_name = $1
                AND carts.user_id = $2`, [name, userId]
            );
    }
}