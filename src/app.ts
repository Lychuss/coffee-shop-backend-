import express from "express";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import cors from "cors";
import productRouter from "./routes/products.routes.ts";
import pageRouter from "./routes/page.routes.ts";
import cartRouter from "./routes/addcart.routes.ts";

const app = express();

app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://tradingsystem-frontend.vercel.app" 
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

app.listen(5000, () => {
    console.log("Server 5000 is listening...");
})