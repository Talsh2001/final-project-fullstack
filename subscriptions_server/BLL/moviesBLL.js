const Movie = require("../models/moviesModel");

const getAllMovies = () => {
  return Movie.find();
};

const getMovieById = (id) => {
  return Movie.findById(id);
};

const addMovie = async (obj) => {
  const movie = new Movie(obj);
  await movie.save();
  return "Movie Created!";
};

const updateMovie = async (id, obj) => {
  await Movie.findByIdAndUpdate(id, obj);
  return "Movie Updated!";
};

const deleteMovie = async (id) => {
  await Movie.findByIdAndDelete(id);
  return "Movie Deleted!";
};

module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };
