import express from "express";
import { authenticated } from "../middlewares/authorization.middlewares.ts";
import { category_product, search_products, display_product } from "../controllers/products.controller.ts";

const productRouter = express.Router();

productRouter.get("/coffee/product/:category", authenticated, category_product);
productRouter.get("/coffee/search-product/:name", authenticated, search_products);
productRouter.get("/coffee/products", authenticated, display_product);

export default productRouter;