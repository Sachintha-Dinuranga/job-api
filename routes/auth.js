import express from "express";
import { registerUSer } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(registerUSer);

export default router;
