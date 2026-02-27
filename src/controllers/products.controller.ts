import type { Request, Response } from "express";
import { display_all_product, search_product, catergory_get_products } from "../repository/products.repository"

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

export const category_product = async (req: Request, res: Response) => {
    const { category } = req.params;
    console.log(category)
    if(!category || typeof category !== "string") return res.status(404).json({ message: 'Params for catergory has no value!', success: false });
    try {
        if(category == "all-products") {
            const data = await display_all_product();
            const rows = data.rows;
            return res.status(200).json({ message: "Getting all the products is successful!", data: rows, success: true});
        }
            
        const data = await catergory_get_products(category);
        const rows = data.rows;
        
        return res.status(200).json({message: "Getting all the products is successful!", data: rows, success: true});
    } catch(err){
        return res.status(500).json({ message: 'There is an error in the server!', success: false });
    }
}