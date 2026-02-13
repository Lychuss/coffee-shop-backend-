import { pool } from "../config/db.ts";

export const display_all_product = async () => {
    return pool.query(
        'SELECT * FROM products'
    );
}

export const search_product = async (name: string) => {
    return pool.query(
        'SELECT * FROM products WHERE name = $1',
        [name]
    );
}

export const catergory_get_products = async (category: string) => {
    return pool.query(
        'SELECT * FROM PRODUCTS WHERE category = $1',
        [category]
    );
}
