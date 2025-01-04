import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"], // Allow multiple origins for scalability
    credentials: true, // Allow credentials (cookies, headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify headers
};
app.use(cors(corsOptions));

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve Frontend
app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.stack || err);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// Server Startup
const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB(); // Connect to the database
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit the process on failure
    }
};

startServer();

