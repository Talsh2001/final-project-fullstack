const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
  },
  { versionKey: false }
);

const Member = mongoose.model("member", membersSchema, "members");

module.exports = Member;
