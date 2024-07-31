const express = require("express");
const {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../BLL/moviesBLL");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await getAllMovies();
    res.send(movies);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await getMovieById(id);
    res.send(movie);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await addMovie(obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const obj = req.body;
    const { id } = req.params;
    const result = await updateMovie(id, obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMovie(id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
