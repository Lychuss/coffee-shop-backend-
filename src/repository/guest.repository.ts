import { pool } from "../config/db.ts";

export const insert_guest = (userId: string) => {
    return pool.query(
        `INSERT INTO users VALUES ($1, 'guest')`, [userId]
    );
}