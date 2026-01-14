import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;