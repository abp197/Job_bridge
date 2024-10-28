import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

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
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        // Restrict valid statuses
        const validStatuses = ['pending', 'approved', 'rejected'];
        if (!status || !validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: 'Invalid status value. Allowed values are: pending, approved, rejected.',
                success: false
            });
        }

        // Find the application by ID
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // Update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.error("Error while updating status:", error.message);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};
