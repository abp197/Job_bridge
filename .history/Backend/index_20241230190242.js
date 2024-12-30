import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path"

dotenv.config();



const app = express();

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",  // Use environment variable for flexibility
    credentials: true
};
app.use(cors(corsOptions));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname,"/Frontend/disto")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_))
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong!';
    res.status(statusCode).json({ message });
});

// Server startup
const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB(); // Ensure DB connection is established
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Exit the process with failure
    }
};

startServer();
