const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    genres: { type: [String], required: true },
    image: { type: String, required: true },
    premiered: { type: String, required: true },
  },
  { versionKey: false }
);

const Movie = mongoose.model("movie", moviesSchema, "movies");

module.exports = Movie;
