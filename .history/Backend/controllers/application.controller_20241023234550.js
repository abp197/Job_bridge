e();
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
