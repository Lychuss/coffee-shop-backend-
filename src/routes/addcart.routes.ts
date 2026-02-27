import express from 'express';
import { add_cart, display_cart } from '../controllers/add-cart.controller';
import { authenticated } from '../middlewares/authorization.middlewares';

const cartRouter = express.Router();

cartRouter.post('/product/add-cart', authenticated, add_cart);
cartRouter.get('/prorduct/all-user-cart', authenticated, display_cart);

export default cartRouter;

