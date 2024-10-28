import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Assuming the token is coming from cookies
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY); // Decoding token
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.userId; // Attaching userId to the request
    next(); // Proceed to next middleware/controller

  } catch (error) {
    console.log("Error during token verification:", error);
    return res.status(500).json({
      message: "Internal server error during authentication",
      success: false,
    });
  }
};

export default isAuthenticated;
