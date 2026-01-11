import 'dotenv/config';
import app from "./app.js";
import connectDB from './config/connectDB.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`bookworm server is running on port ${PORT}`);
        })
    } catch (err) {
        console.error("Failed to start server:", err.message);
    }
}

startServer();