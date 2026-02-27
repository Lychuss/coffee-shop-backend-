"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const addcart_routes_1 = __importDefault(require("./routes/addcart.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://yes-park-cafe-frontend.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
        express_1.default.json()(req, res, next);
    }
    else {
        next();
    }
});
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/health", (req, res) => {
    res.json({ status: "Server is running!" });
});
app.use("/yespark", products_routes_1.default, page_routes_1.default, addcart_routes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
