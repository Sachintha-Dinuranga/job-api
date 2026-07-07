import express from "express";
import { createJobs, getJobs } from "../controllers/jobsController.js";
const router = express.Router();

router.route("/jobs").get(getJobs);

router.route("/jobs").post(createJobs);

export default router;
