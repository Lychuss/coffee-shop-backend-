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

