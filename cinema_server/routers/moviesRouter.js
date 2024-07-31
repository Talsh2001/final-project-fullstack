const express = require("express");
const {
  getAllRoute,
  getByIdRoute,
  addRoute,
  updateRoute,
  deleteRoute,
} = require("../BLL/subscriptionsBLL");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await getAllRoute("movies");
    res.send(movies);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await getByIdRoute("movies", id);
    res.send(movie);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await addRoute("movies", obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const obj = req.body;
    const { id } = req.params;
    const result = await updateRoute("movies", id, obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRoute("movies", id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
