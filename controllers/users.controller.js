const { selectUserByUsername } = require("../models/users");

exports.getUser = (req, res, next) => {
  const { userName } = req.params;
  selectUserByUsername(userName)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
