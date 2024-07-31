const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: String,
  },
  { versionKey: false }
);

const User = mongoose.model("user", usersSchema, "users");

module.exports = User;
