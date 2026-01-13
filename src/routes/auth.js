import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, photoURL } = req.body;
        // inputs validation
        if (!name || !email || !password || !photoURL) {
            return res.status(400).json({
                success: false, message: "All fields are required",
            });
        }

        // force at least 6 character password
        if (password.length < 6) {
            return res.status(400).json({
                success: false, message: "Password must be at least 6 characters long",
            });
        }

        // Check if user already exists
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({
                success: false, message: "Email already registered, try to login",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        await User.create({
            name, email: normalizedEmail, password: hashedPassword, photoURL, role: "user"
        });

        return res.status(201).json({
            success: true, message: "Registration successful. Please login."
        });
    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({
            success: false, message: "Server error",
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        const normalizedEmail = email.toLowerCase().trim();
        // Find user (include password explicitly)
        const user = await User.findOne({ email: normalizedEmail }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false, message: "Invalid email or password",
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false, message: "Invalid email or password",
            });
        }

        // Create JWT payload
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                photoURL: user.photoURL
            },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        // Send response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                photoURL: user.photoURL,
            },
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

export default router;