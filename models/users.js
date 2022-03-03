const db = require("../db/connection");

exports.selectUserByUsername = (username) => {
  return db.query(`SELECT * FROM USERS WHERE username = $1;`, [username]).then((user) => {
    if (!user) {
      return Promise.reject({ status: 404, msg: "review not found" });
    }
    return user;
  });
};
