"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const page_controller_1 = require("../controllers/page.controller");
const pageRouter = express_1.default.Router();
pageRouter.get('/guest', page_controller_1.guest);
exports.default = pageRouter;
