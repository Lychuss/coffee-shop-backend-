"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_cart_controller_1 = require("../controllers/add-cart.controller");
const authorization_middlewares_1 = require("../middlewares/authorization.middlewares");
const cartRouter = express_1.default.Router();
cartRouter.post('/product/add-cart', authorization_middlewares_1.authenticated, add_cart_controller_1.add_cart);
cartRouter.get('/prorduct/all-user-cart', authorization_middlewares_1.authenticated, add_cart_controller_1.display_cart);
exports.default = cartRouter;
