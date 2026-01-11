import express from 'express';
import cors from 'cors';
const app = express();

// Middleware
// CORS for normal requests
const corsOptions = {
  origin: process.env.FRONTEND_URL
};
app.use(cors(corsOptions));

// method to get json body
app.use(express.json());


// default endpoint
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to Bookworm server'});
});

export default app;