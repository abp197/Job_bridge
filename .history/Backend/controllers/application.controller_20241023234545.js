
                    options: { sort: { createdAt: -1 } },
                }
            });

        return res.status(200).json({
            applications,  // Return applications array here
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
