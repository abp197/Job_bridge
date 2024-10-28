
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
