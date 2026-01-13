// Serverless entry point for deployment platforms (Vercel)

import app from "./src/app.js";
import connectDB from "./src/config/connectDB.js";

// Serverless function wrapper
export default async (req, res) => {
  try {
    await connectDB(); // safe to call on every request
    return app(req, res); // delegate to Express app
  } catch (err) {
    console.error("DB connection error:", err.message);
    res.status(500).json({ status: false, message: "Database connection failed" });
  }
};