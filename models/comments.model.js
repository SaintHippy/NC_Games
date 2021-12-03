const db = require("../db/connection");

exports.selectCommentsByReview = (review_id) => {
  return db.query(`;`).then((comments) => {
    if (!comments.rows[0]) {
      return Promise.reject({ status: 404, msg: "review not found" });
    }
    return review.rows[0];
  });
};
