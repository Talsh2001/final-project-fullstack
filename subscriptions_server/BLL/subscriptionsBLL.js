const Subscription = require("../models/subscriptionsModel");

const getAllSubscriptions = () => {
  return Subscription.find();
};

const getSubscriptionById = (id) => {
  return Subscription.findById(id);
};

const addSubscription = async (obj) => {
  const subscription = new Subscription(obj);
  await subscription.save();
  return "Subscription Created!";
};

const updateSubscription = async (id, obj) => {
  await Subscription.findByIdAndUpdate(id, obj);
  return "Subscription Updated!";
};

const deleteSubscription = async (id) => {
  await Subscription.findByIdAndDelete(id);
  return "Subscription Deleted!";
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
