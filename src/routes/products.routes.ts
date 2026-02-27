import express from "express";
import { authenticated } from "../middlewares/authorization.middlewares";
import { category_product, search_products} from "../controllers/products.controller";

const productRouter = express.Router();

productRouter.get("/coffee/product/:category", authenticated, category_product);
productRouter.get("/coffee/search-product/:name", authenticated, search_products);

export default productRouter;