import { pool } from "../config/db";

export const add_order = async (cartsId: string, payment: number, total_amount: number) => {
    return pool.query(
        `INSERT INTO orders (carts_id, payment, total_amount) 
        VALUES ($1, $2, $3) RETURNING *`, [cartsId, payment, total_amount]
    );
}

export const update_xendit = async (invoiceID: string, orderID: string) => {
    return pool.query(
        `UPDATE orders SET xendit_invoice_id = $1 WHERE id = $2`, [invoiceID, orderID]
    );
}

export const update_status = async (orderID: string) => {
    return pool.query(
            "UPDATE orders SET status = 'PAID' WHERE id = $1",
            [orderID]
        );
} 

