import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "Server is running!"});
})

app.listen(5000, () => {
    console.log("Server 5000 is listening...");
})