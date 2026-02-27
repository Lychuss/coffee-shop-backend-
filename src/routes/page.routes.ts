import express from "express";
import { guest } from "../controllers/page.controller";

const pageRouter = express.Router();

pageRouter.get('/guest', guest);

export default pageRouter;