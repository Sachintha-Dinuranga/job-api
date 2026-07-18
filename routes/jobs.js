import express from "express";
import {
  createJobs,
  deleteJobs,
  getJobs,
  getJobsById,
  getJobsByIdAndSlug,
  updateJobsById,
} from "../controllers/jobsController.js";
import {
  isAuthenticatedUser,
  authorizedRoles,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/jobs").get(getJobs);

router.route("/jobs/:id").get(getJobsById);

router.route("/jobs/:id/:slug").get(getJobsByIdAndSlug);

router
  .route("/jobs")
  .post(isAuthenticatedUser, authorizedRoles("employeer", "admin"), createJobs);

router.route("/jobs/:id").put(isAuthenticatedUser, updateJobsById);

router.route("/jobs/:id").delete(isAuthenticatedUser, deleteJobs);

export default router;
