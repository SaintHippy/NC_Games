const db = require("../db/connection");

exports.selectReviews = () => {
  console.log("In selectReviews");
  return db.query(`SELECT * FROM reviews`).then((reviews) => {
    return reviews.rows;
  });
};

exports.selectReviewById = (review_id) => {
  console.log("in selectById");
  if (typeof review_id != Number) {
    return Promise.reject({
      status: 404,
      msg: "Bad ID",
    });
  } else {
    return db
      .query(
        `SELECT reviews.owner, reviews.title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, COUNT(comments.review_id = reviews.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id LEFT JOIN users ON reviews.owner = users.username WHERE reviews.reviews_id = $1`,
        [review_id]
      )
      .then((review) => {
        return review.rows[0];
      });
  }
};
