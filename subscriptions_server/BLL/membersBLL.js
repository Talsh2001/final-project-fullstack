const Member = require("../models/membersModel");

const getAllMembers = () => {
  return Member.find();
};

const getMemberById = (id) => {
  return Member.findById(id);
};

const addMember = async (obj) => {
  const member = new Member(obj);
  await member.save();
  return "Member Created!";
};

const updateMember = async (id, obj) => {
  await Member.findByIdAndUpdate(id, obj);
  return "Member Updated!";
};

const deleteMember = async (id) => {
  await Member.findByIdAndDelete(id);
  return "Member Deleted!";
};

module.exports = { getAllMembers, getMemberById, addMember, updateMember, deleteMember };
