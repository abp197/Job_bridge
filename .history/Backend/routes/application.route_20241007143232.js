import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

// Change this line to POST for applying to a job
// Route for applying to a job
router.route("/apply/:id").post(isAuthenticated, applyJob);  // Use POST and jobId from URL params
  // Change to POST, jobId should be in the request body

router.route("/get").(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
