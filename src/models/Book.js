import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true },
        description: { type: String },
        coverUrl: { type: String },
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;