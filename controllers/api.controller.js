const selectApi = require("../models/api.model");

exports.getApi = (req, res, next) => {
  selectApi()
    .then((endpoints) => {
      res.status(200).send({ msg: endpoints });
    })
    .catch(next);
};
