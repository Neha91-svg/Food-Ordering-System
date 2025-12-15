import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// JWT Token generator
const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not defined in .env");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        // Check if user exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate token
        const token = createToken(user._id);

        res.status(201).json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Safe check
        if (!user.password) {
            return res.status(400).json({ success: false, message: "Password not set for this user" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const token = createToken(user._id);
        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
