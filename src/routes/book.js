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

// Get single book
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("genre", "name");

        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        const bookData = {
            _id: book._id,
            title: book.title,
            author: book.author,
            genre: book.genre ? book.genre.name : "N/A",
            coverUrl: book.coverUrl,
            description: book.description,
            createdAt: book.createdAt,
        };

        res.json({ success: true, book: bookData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// POST
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

// Update
// PATCH /api/book/:id
router.patch("/:id", async (req, res) => {
    try {
        const { title, author, genre, description, coverUrl } = req.body;

        // At least one field should be provided
        if (!title && !author && !genre && !description && !coverUrl) {
            return res.status(400).json({ success: false, message: "No fields to update" });
        }

        const updateData = {};

        if (title) updateData.title = title;
        if (author) updateData.author = author;
        if (description) updateData.description = description;
        if (coverUrl) updateData.coverUrl = coverUrl;

        if (genre) {
            const validGenre = await Genre.findById(genre);
            if (!validGenre) {
                return res.status(400).json({ success: false, message: "Invalid genre selected" });
            }
            updateData.genre = genre;
        }

        const updatedBook = await Book.findByIdAndUpdate( req.params.id, updateData, { new: true } );

        if (!updatedBook) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.json({ success: true, message: "Book updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        res.json({ success: true, message: "Book deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


export default router;