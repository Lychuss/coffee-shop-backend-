import express from 'express';
import { add_cart } from '../controllers/add-cart.controller.ts';
import { authenticated } from '../middlewares/authorization.middlewares.ts';

const cartRouter = express.Router();

cartRouter.post('/product/add-cart', authenticated, add_cart);

export default cartRouter;

