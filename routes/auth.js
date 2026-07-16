import express from "express";
import { loginUser, registerUSer } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(registerUSer);

router.route("/login").post(loginUser);

export default router;
