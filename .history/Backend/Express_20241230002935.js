const express = require("express");
const multer = require("multer");
const router = express.Router();
const { updateUserProfile } = require("../controllers/userController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/profile/update", upload.single("file"), async (req, res) => {
    try {
        const updatedUser = await updateUserProfile(req.body, req.file);
        res.status(200).json({ success: true, user: updatedUser, message: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update profile" });
    }
});

module.exports = router;
