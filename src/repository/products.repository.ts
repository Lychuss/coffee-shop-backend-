import { pool } from "../config/db.ts";

export const display_all_product = async () => {
    return pool.query(
        'SELECT * FROM products'
    );
}
