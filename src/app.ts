import express from "express";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import cors from "cors";
import productRouter from "./routes/products.routes";
import pageRouter from "./routes/page.routes";
import cartRouter from "./routes/addcart.routes";

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:3000"
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            "https://yes-park-cafe-frontend.vercel.app",
            "http://localhost:3000"
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "Server is running!" });
});

app.use("/yespark", productRouter);
app.use("/yespark", pageRouter);
app.use("/yespark", cartRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;