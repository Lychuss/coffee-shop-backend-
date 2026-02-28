import express from 'express';
import { add_cart, display_cart, display_bills, update_bills } from '../controllers/add-cart.controller';
import { authenticated } from '../middlewares/authorization.middlewares';

const cartRouter = express.Router();

cartRouter.post('/product/add-cart', authenticated, add_cart);
cartRouter.get('/product/all-user-cart', authenticated, display_cart);
cartRouter.get('/product/all-user-bills', authenticated, display_bills);
cartRouter.put('/product/all-user-bills/:method/:name', authenticated, update_bills);

export default cartRouter;

