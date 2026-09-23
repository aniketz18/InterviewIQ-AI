import express, { json } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./configs/connectDB.js";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000;
app.get("/health", (req, res) => {
  res.json({
    server: "helthy/good",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on(${port}) - http://localhost:${port}`);
  console.log(`health check on - http://localhost:${port}:/health`);
  connectDB();
});
