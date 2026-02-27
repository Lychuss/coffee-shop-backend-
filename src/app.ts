import express from "express";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import cors from "cors";
import productRouter from "./routes/products.routes";
import pageRouter from "./routes/page.routes";
import cartRouter from "./routes/addcart.routes";

const app = express();

app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://yes-park-cafe-frontend.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(cookieParser());
app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    express.json()(req, res, next);
  } else {
    next();
  }
});
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "Server is running!"});
})

app.use("/yespark", productRouter, pageRouter, cartRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});