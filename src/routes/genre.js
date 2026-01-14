import { Router } from 'express';
import Genre from '../models/Genre.js';

const router = Router();

// GET : genre
router.get("/", async (req, res) => {
    try {
        const genres = await Genre.find().sort({ name: 1 });
        res.json({
            success: true, total: genres.length, genres
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch genres" });
    }
});

// POST : genre
router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Genre name is required" });
        }

        const existingGenre = await Genre.findOne({ name });
        if (existingGenre) {
            return res.status(409).json({ success: false, message: "Genre already exists" });
        }

        const genre = await Genre.create({ name, description });

        res.status(201).json({
            success: true, message: "Genre created successfully", genre
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create genre" });
    }
});

export default router;