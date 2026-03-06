import { pool } from "../config/db";

export const insert_guest = (userId: string) => {
    return pool.query(
        `INSERT INTO users VALUES ($1, 'guest')`, [userId]
    );
}

export const create_cart = async (cart_id: string, user_id: string) => {
    return pool.query(
        'INSERT INTO carts VALUES ($1, $2)', [cart_id, user_id]
    );
}

export const get_cart_id = async (user_id: string) => {
    return pool.query(
        'SELECT carts.carts_id FROM carts WHERE user_id = $1',
        [user_id]
    );
}

