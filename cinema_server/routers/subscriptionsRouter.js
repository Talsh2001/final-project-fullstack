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
    const subscriptions = await getAllRoute("subscriptions");
    res.send(subscriptions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await getByIdRoute("subscriptions", id);
    res.send(subscription);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await addRoute("subscriptions", obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const obj = req.body;
    const { id } = req.params;
    const result = await updateRoute("subscriptions", id, obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRoute("subscriptions", id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
