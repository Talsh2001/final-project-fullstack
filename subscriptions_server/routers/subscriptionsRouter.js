const express = require("express");
const {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
} = require("../BLL/subscriptionsBLL");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const subscriptions = await getAllSubscriptions();
    res.send(subscriptions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await getSubscriptionById(id);
    res.send(subscription);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await addSubscription(obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const obj = req.body;
    const { id } = req.params;
    const result = await updateSubscription(id, obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteSubscription(id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
