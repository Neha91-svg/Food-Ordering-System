import userModel from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
    try {
        // authMiddleware ne req.user set kiya hoga
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // Fetch user from DB
        const user = await userModel.findById(userId).select("role");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Role check
        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied: Admins only",
            });
        }

        next();
    } catch (error) {
        console.error("Admin auth error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Admin authorization failed",
        });
    }
};

export default adminMiddleware;
