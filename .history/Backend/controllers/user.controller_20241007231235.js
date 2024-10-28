import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register controller
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;  // Get the uploaded file from multer
        
        // Validation: Check if required fields are missing
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with profile image path (if uploaded)
        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: file ? { profileImage: file.path } : {},  // Add profile image if uploaded
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Login controller
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Check password validity
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Validate user role
        if (role !== user.role) {
            return res.status(403).json({
                message: "Account doesn't exist with the selected role",
                success: false
            });
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Send the token as a cookie
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,  // 1 day
                httpOnly: true,
                sameSite: 'strict'
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                success: true
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Logout controller
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Profile update controller
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;  // Handle file upload

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.userId;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        // Updating fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;
       if (file) user.profile.profileImage = file.path;  // Update profile image if uploaded

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
