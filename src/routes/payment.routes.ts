import express from "express";
import { createPayment, xenditWebhook } from "../controllers/payment.controller";
import { authenticated } from "../middlewares/authorization.middlewares";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment", authenticated, createPayment);
paymentRouter.post("/webhook", authenticated, xenditWebhook);

export default paymentRouter;