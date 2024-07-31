const axios = require("axios");

const url = "http://localhost:3000";

const getAllRoute = async (router) => {
  const { data } = await axios.get(`${url}/${router}`);
  return data;
};

const getByIdRoute = async (router, id) => {
  const { data } = await axios.get(`${url}/${router}/${id}`);
  return data;
};

const addRoute = async (router, obj) => {
  const { data } = await axios.post(`${url}/${router}`, obj);
  return data;
};

const updateRoute = async (router, id, obj) => {
  const { data } = await axios.put(`${url}/${router}/${id}`, obj);
  return data;
};

const deleteRoute = async (router, id) => {
  const { data } = await axios.delete(`${url}/${router}/${id}`);
  return data;
};

module.exports = { getAllRoute, getByIdRoute, addRoute, updateRoute, deleteRoute };
