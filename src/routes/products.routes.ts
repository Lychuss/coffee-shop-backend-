import express from "express";
import { authenticated } from "../middlewares/authorization.middlewares.ts";
import { category_product, search_products} from "../controllers/products.controller.ts";

const productRouter = express.Router();

productRouter.post("/coffee/product/:category", authenticated, category_product);
productRouter.get("/coffee/search-product/:name", authenticated, search_products);

export default productRouter;