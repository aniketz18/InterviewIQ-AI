import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/connectDB.js";

const app = express();
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
