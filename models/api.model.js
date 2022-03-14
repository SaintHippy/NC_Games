exports.selectApi = () => {
  const endpoints = require("../endpoints.json");
  return { message: endpoints };
};
