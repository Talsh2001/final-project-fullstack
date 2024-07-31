const express = require("express");
const {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
} = require("../BLL/membersBLL");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const members = await getAllMembers();
    res.send(members);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const member = await getMemberById(id);
    res.send(member);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await addMember(obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const obj = req.body;
    const { id } = req.params;
    const result = await updateMember(id, obj);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMember(id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
