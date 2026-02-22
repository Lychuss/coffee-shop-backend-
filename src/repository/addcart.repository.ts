import { pool } from "../config/db.ts";
import type { CartItem } from "../models/cart.interface.ts";

export const add_cart_items = async (cartItemId: string, cartId: string, cart: CartItem) => {
    return pool.query(
        'INSERT INTO cart_items VALUES ($1, $2, $3, $4, $5)',
        [cartItemId, cartId, cart.product_name, cart.size, cart.quantity]
    );
}