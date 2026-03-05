import axios from "axios";

export const createInvoice = async (orderId: number, amount: number, payment_method: string) => {
    const response = await axios.post(
        "https://api.xendit.co/v2/invoices",
        {
            external_id: `order-${orderId}`,
            amount: amount,
            description: "Coffee Shop Order",
            payment_methods: [payment_method] 
        },
        {
            auth: {
                username: process.env.PAYMENT_GATEWAY!,
                password: ""
            }
        }
    );

    return response.data;
};