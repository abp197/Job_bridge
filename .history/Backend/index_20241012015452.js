import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(cookieParser()); // Parse cookies

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:5173", // Ensure this is your frontend URL
    credentials: true, // Allow credentials (cookies, etc.)
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
    });
});

// Define the PORT
const PORT = process.env.PORT || 8000;

// Start the server
const startServer = async () => {
    try {
        await connectDB(); // Connect to the database
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1); // Stop the server if there is an error
    }
};

startServer();
