import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// Route for applying to a job (POST request)
router.route("/apply/:id").post(isAuthenticated, applyJob);

// Route for fetching jobs applied by the authenticated user (GET request)
router.route("/get").get(isAuthenticated, getAppliedJobs);

// Route for fetching applicants for a specific job by ID (GET request)
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// Route for updating the application status (POST request)
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
