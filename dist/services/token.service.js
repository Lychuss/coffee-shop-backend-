"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnPayload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const returnPayload = (token) => {
    try {
        const decode = jsonwebtoken_1.default.decode(token);
        return decode;
    }
    catch (err) {
        return null;
    }
};
exports.returnPayload = returnPayload;
