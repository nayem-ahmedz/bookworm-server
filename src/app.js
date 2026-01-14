import express from 'express';
import cors from 'cors';
const app = express();

// auth routes imports
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/book.js';
import genreRoutes from './routes/genre.js';

// Middleware
// CORS for normal requests
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

// method to get json body
app.use(express.json());


// default endpoint
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to Bookworm server'});
});


// auth endpoint
app.use('/api/auth', authRoutes);

// books, genress
app.use('/api/book', bookRoutes);
app.use('/api/genre', genreRoutes);


export default app;