const selectApi = require("../models/api.model");

exports.getApi = (req, res, next) => {
  selectApi()
    .then(({ message: endpoints }) => {
      res.status(200).send(endpoints);
    })
    .catch(next);
};
