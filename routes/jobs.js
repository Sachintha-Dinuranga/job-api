import express from "express";
import { getJobs } from "../controllers/jobsController.js";
const router = express.Router();

// define the home page route
router.route("/jobs").get(getJobs);

export default router;
