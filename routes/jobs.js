import express from "express";
import {
  createJobs,
  deleteJobs,
  getJobs,
  getJobsById,
  updateJobsById,
} from "../controllers/jobsController.js";
const router = express.Router();

router.route("/jobs").get(getJobs);

router.route("/jobs").post(createJobs);

router.route("/jobs/:id").get(getJobsById);

router.route("/jobs/:id").put(updateJobsById);

router.route("/jobs/:id").delete(deleteJobs);

export default router;
