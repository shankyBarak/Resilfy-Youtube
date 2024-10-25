import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';  // Assuming you're importing the user model like this

// Middleware to check if the user is signed in
export const requireSignIn = async (req, res, next) => {
    try {
        // Get the token from the headers
        const token = req.headers.authorization;

        // If there's no token, return an unauthorized error
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing."
            });
        }

        // Verify the token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Save the decoded token payload to req.user for further use

        // Proceed to the next middleware
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid token or authorization error."
        });
    }
};

// Middleware to check if the user is an admin
export const isAdmin = async (req, res, next) => {
    try {
        // Check if user ID is present in req.user (set by requireSignIn middleware)
        const user = await userModel.findById(req.user._id);

        // If user is not found or is not an admin, return an unauthorized error
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized Access - Admin only'
            });
        }

        // If the user is an admin, proceed to the next middleware
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            error,
            message: "Error in Admin middleware"
        });
    }
};
