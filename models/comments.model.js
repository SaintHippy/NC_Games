const db = require("../db/connection");

exports.selectCommentsByReview = (review_id) => {
  return db
    .query(
      `
  SELECT body, comments.votes, author, comment_id, comments.created_at  
  FROM comments
  LEFT JOIN reviews ON comments.review_id = reviews.review_id
  WHERE comments.review_id = $1
  GROUP BY comments.review_id, comments.votes, comments.body, comments.created_at, comments.author, comments.comment_id;`,
      [review_id]
    )
    .then((comments) => {
      if (!comments.rows[0]) {
        return Promise.reject({ status: 404, msg: "review not found" });
      }
      return comments.rows;
    });
};

exports.removeCommentById = (comment_id) => {
  return db
    .query(
      `DELETE FROM comments 
  WHERE comment_id = $1;`,
      [comment_id]
    )
    .then((response) => {
      return response;
    });
};

exports.insertComment = ({ review_id, body, author }) => {
  return db
    .query(
      `INSERT INTO comments ( review_id, body, author )
  VALUES ($1, $2, $3);`,
      [review_id, body, author]
    )
    .then((newComment) => {
      return newComment;
    });
};
