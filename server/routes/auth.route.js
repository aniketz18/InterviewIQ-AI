import { logout, registerUser } from "../controllers/auth.controller.js";
import express from "express";
const authRouter = express.Router();

authRouter.post("/google", registerUser);
authRouter.get("/logout", logout);

export default authRouter;
