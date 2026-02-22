import express from 'express';
import { add_cart, get_items } from '../controllers/add-cart.controller.ts';
import { authenticated } from '../middlewares/authorization.middlewares.ts';

const cartRouter = express.Router();

cartRouter.post('/product/add-cart', authenticated, add_cart);
cartRouter.get('/product/total-items', authenticated, get_items);

export default cartRouter;

