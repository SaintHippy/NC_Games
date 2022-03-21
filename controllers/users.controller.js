const { selectUsers, selectUserByUsername } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
  console.log("in getUser controller");
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  console.log("in getUserByUsername controller");
  const { username } = req.params;
  selectUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
