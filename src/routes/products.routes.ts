import express from "express";
import { authenticated } from "../middlewares/authorization.middlewares.ts";
import { category_product, search_products} from "../controllers/products.controller.ts";

const productRouter = express.Router();

productRouter.get("/coffee/product/:category", category_product);
productRouter.get("/coffee/search-product/:name", search_products);

export default productRouter;