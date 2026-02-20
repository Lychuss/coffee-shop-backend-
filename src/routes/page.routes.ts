import express from "express";
import { guest } from "../controllers/page.controller.ts";

const pageRouter = express.Router();

pageRouter.post('/guest', guest);

export default pageRouter;