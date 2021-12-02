const db = require("../db/connection");
const reviews = require("../db/data/test-data/reviews");

exports.selectReviews = () => {
  return db.query(`SELECT * FROM reviews`).then((reviews) => {
    return reviews.rows;
  });
};

exports.selectReviewsById = (review_id) => {
  return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id]).then((review) => {
    if (typeof review_id != Number) {
      return Promise.reject({
        status: 404,
        msg: "Bad ID",
      });
    } else {
      console.log("!!!!!!!!!!!!!HERE!!!!!!!!!!");
      //check the length of the comments
      return db.query(`SELECT * FROM comments WHERE review_id = $1`, [review_id]).then((comments) => {
        review.rows.comment_count = comments.length; //refator for obj. Counter?
        // console.log(review.rows);
        return review.rows;
      });
    }
  });
};

// exports.patchReview = (review_id, newVotes) => {
//   return db.query(`
//   UPDATE reviews `);
// };
