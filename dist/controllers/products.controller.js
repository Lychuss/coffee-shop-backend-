"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category_product = exports.search_products = void 0;
const products_repository_1 = require("../repository/products.repository");
const search_products = async (req, res) => {
    const { name } = req.params;
    try {
        if (typeof name !== "string") {
            return res.status(404).json({
                message: "The parameter must be a string",
                success: false
            });
        }
        const call = await (0, products_repository_1.search_product)(name);
        const data = call.rows;
        return res.status(200).json({
            message: data,
            success: true
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "There is an error in the server!",
            sucess: false
        });
    }
};
exports.search_products = search_products;
const category_product = async (req, res) => {
    const { category } = req.params;
    console.log(category);
    if (!category || typeof category !== "string")
        return res.status(404).json({ message: 'Params for catergory has no value!', success: false });
    try {
        if (category == "all-products") {
            const data = await (0, products_repository_1.display_all_product)();
            const rows = data.rows;
            return res.status(200).json({ message: "Getting all the products is successful!", data: rows, success: true });
        }
        const data = await (0, products_repository_1.catergory_get_products)(category);
        const rows = data.rows;
        return res.status(200).json({ message: "Getting all the products is successful!", data: rows, success: true });
    }
    catch (err) {
        return res.status(500).json({ message: 'There is an error in the server!', success: false });
    }
};
exports.category_product = category_product;
