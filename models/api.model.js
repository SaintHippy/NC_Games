const db = require("../db/connection");

exports.selectApi = () => {
  const endpoints = require("../endpoints.json");
  return endpoints;
};
