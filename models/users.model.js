const db = require("../db/connection");

exports.selectUsers = () => {
  return db
    .query(
      `SELECT username, name, avatar_url 
  FROM users;`
    )
    .then((users) => {
      if (!users.rows[0]) {
        return Promise.reject({ status: 404, msg: "user not found" });
      }
      return users.rows;
    });
};

exports.selectUserByUsername = (username) => {
  return db.query(`SELECT username, name, avatar_url FROM users WHERE username = $1;`, [username]).then((user) => {
    if (!user) {
      return Promise.reject({ status: 404, msg: "user not found" });
    }
    return user.rows;
  });
};
