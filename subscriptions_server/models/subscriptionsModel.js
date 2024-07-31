const mongoose = require("mongoose");

const subscriptionsSchema = new mongoose.Schema(
  {
    memberId: { type: String, required: true },
    movies: [
      {
        movieId: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],
  },
  { versionKey: false }
);

const Model = mongoose.model("subscription", subscriptionsSchema, "subscriptions");

module.exports = Model;
