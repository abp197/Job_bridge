import jwt from 'jsonwebtoken';
import User from ';

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Authentication token is missing.',
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;  // Ensure this sets the user ID correctly
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid authentication token.',
            success: false
        });
    }
};

export default isAuthenticated;
