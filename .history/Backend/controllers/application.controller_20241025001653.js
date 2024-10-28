import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import {mailer} from "../mailer.js"

// Apply for a Job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;  // Get userId from isAuthenticated middleware
        const jobId = req.params.id;  // Get jobId from URL params

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        // Check if the user already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Create new application with default status 'pending'
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            status: 'pending',  // Default status for new applications
        });

        // Add the application to the job
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error while applying for job:", error.message);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};

// Get Applied Jobs
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } },
                }
            });

        return res.status(200).json({
            application,  // Return applications array here
            success: true
        });
    } catch (error) {
        console.error("Error while fetching applied jobs:", error.message);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};

// Get Applicants for a Job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error("Error while fetching applicants:", error.message);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};

// Update Application Status
