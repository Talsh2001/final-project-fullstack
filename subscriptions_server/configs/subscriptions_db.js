const mongoose = require("mongoose");

const connectSubsDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/subscriptionsDB")
    .then(() => {
      console.log("Connected to subscriptionsDB");
    })
    .catch((error) => console.log(error));
};

module.exports = connectSubsDB;
