import { Router } from 'express';
import Book from '../models/Book.js';
import Genre from '../models/Genre.js';

const router = Router();

// GET all books with genre populated
router.get("/", async (req, res) => {
    try {
        // Populate genre to get its name
        const books = await Book.find()
            .populate("genre", "name") // only get genre name
            .sort({ createdAt: -1 }); // latest first

        // Transform to simple object for frontend if needed
        const bookList = books.map(book => ({
            _id: book._id,
            title: book.title,
            author: book.author,
            genre: book.genre ? book.genre.name : "N/A",
            coverUrl: book.coverUrl,
            createdAt: book.createdAt,
        }));

        res.json({ success: true, books: bookList, total: bookList.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


router.post("/", async (req, res) => {
    try {
        const { title, author, genre, description, coverUrl } = req.body;

        if (!title || !author || !genre || !coverUrl) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Validate genre exists
        const validGenre = await Genre.findById(genre);
        if (!validGenre) {
            return res.status(400).json({ success: false, message: "Invalid genre selected" });
        }

        const newBook = new Book({
            title, author, genre, description, coverUrl
        });

        await newBook.save();

        res.status(201).json({ success: true, message: 'Book is added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;