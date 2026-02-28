"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_middlewares_1 = require("../middlewares/authorization.middlewares");
const products_controller_1 = require("../controllers/products.controller");
const productRouter = express_1.default.Router();
productRouter.get("/coffee/product/:category", authorization_middlewares_1.authenticated, products_controller_1.category_product);
productRouter.get("/coffee/search-product/:name", authorization_middlewares_1.authenticated, products_controller_1.search_products);
exports.default = productRouter;
