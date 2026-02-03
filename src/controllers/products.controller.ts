import type { Request, Response } from "express";
import type { Products } from "../models/products.interface.ts";
import { display_all_product, search_product } from "../repository/products.repository.ts"

export const display_product = async (req: Request, res: Response) => {
    try {
        const data = await display_all_product();
        const products: Products[] = data.rows;

        if(products.length === 0) return res.status(404).json({ 
            message: "Error the products has no value",
            success: false
        });

        return res.status(200).json({
            message: "Here all the products!",
            data: products,
            success: true
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "There are errors in the server!",
            success: false
        })
    }
}

export const search_products = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
        if(typeof name !== "string"){
            return res.status(404).json({
                message: "The parameter must be a string",
                success: false
            });
        }

        const call = await search_product(name);
        const data = call.rows;

        return res.status(200).json({
            message: data,
            success: true
        })
    } catch(err){
        return res.status(500).json({
            message: "There is an error in the server!",
            sucess: false
        })
    }
}