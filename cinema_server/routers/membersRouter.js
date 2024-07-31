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
    const members = await getAllRoute("members");
    res.send(members);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const member = await getByIdRoute("members", id);
    res.send(member);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await addRoute("members", obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const obj = req.body;
    const { id } = req.params;
    const result = await updateRoute("members", id, obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRoute("members", id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
