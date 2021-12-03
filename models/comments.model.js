const db = require("../db/connection");

exports.selectCommentsByReview = (review_id) => {
  console.log("in select comments");
  console.log(review_id);
  return db
    .query(
      `
  SELECT author, body, comment_id, created_at, votes 
  FROM comments
  LEFT JOIN reviews ON comments.review_id = reviews.review_id
  WHERE comments.review_id = $1
  GROUP BT comments.review_id;`,
      [review_id]
    )
    .then((comments) => {
      if (!comments.rows[0]) {
        return Promise.reject({ status: 404, msg: "review not found" });
      }
      return review.rows;
    });
};

exports.removeCommentById = (comment_id) => {
  console.log("in remove comment");
  return db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id]).then((response) => {
    return response;
  });
};

exports.addReviewComment = (comment, review_id) => {
  //need logic for finding highest review_id. dbquery first? Can't remember and it's 4:30pm
  console.log("in add comment");
  return db.query(`INSERT INTO comments`);
};
