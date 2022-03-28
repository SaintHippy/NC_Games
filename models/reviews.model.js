const db = require("../db/connection");

// exports.selectReviews = () => {
//   // console.log("In selectReviews");
//   sort_by = "reviews.created_at";
//   return db
//     .query(
//       `SELECT owner, designer, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes,
//       COUNT(comments.review_id = reviews.review_id) AS comment_count
//       FROM reviews
//       LEFT JOIN comments ON reviews.review_id = comments.review_id
//       LEFT JOIN users ON reviews.owner = users.username
//       GROUP BY reviews.review_id;`
//     )
//     .then((reviews) => {
//       if (!reviews.rows[0]) {
//         return Promise.reject({ status: 404, msg: "review not found" });
//       }
//       return reviews.rows;
//     });
// };

exports.selectReviews = (sort_by = "reviews.votes", category) => {
  if (
    ![
      "owner",
      "title",
      "reviews.review_id",
      "category",
      "review_img_url",
      "reviews.created_at",
      "reviews.votes",
      "comment_count",
    ].includes(sort_by)
  ) {
    return Promise.reject({
      status: 400,
      msg: " No such column",
    });
  } else if (category) {
    return db
      .query(
        `SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, 
        COUNT(comments.review_id = reviews.review_id) AS comment_count FROM reviews 
        LEFT JOIN comments ON reviews.review_id = comments.review_id 
        LEFT JOIN users ON reviews.owner = users.username WHERE category = '${category}' 
        GROUP BY reviews.review_id 
        ORDER BY ${sort_by};  `
      )
      .then((response) => {
        if (response.rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Category not found",
          });
        } else {
          return response.rows;
        }
      });
  } else {
    return db
      .query(
        `SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, 
        COUNT(comments.review_id = reviews.review_id) AS comment_count FROM reviews 
        LEFT JOIN comments ON reviews.review_id = comments.review_id 
        LEFT JOIN users ON reviews.owner = users.username 
        GROUP BY reviews.review_id ORDER BY ${sort_by} ${order}`
      )
      .then((response) => {
        return response.rows;
      });
  }
};

exports.selectReviewById = (review_id) => {
  // console.log("In selectReviewById");

  return db
    .query(
      `SELECT reviews.owner, reviews.review_body, reviews.designer, reviews.title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, 
      COUNT(comments.review_id = reviews.review_id) :: INT 
      AS comment_count
      FROM reviews 
      LEFT JOIN comments ON reviews.review_id = comments.review_id 
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id;`,
      [review_id]
    )
    .then((review) => {
      if (!review.rows[0]) {
        return Promise.reject({ status: 404, msg: "review not found" });
      }
      return review.rows[0];
    });
};

exports.selectReviewsByCategory = (category) => {
  return db
    .query(
      `SELECT reviews.owner, reviews.review_body, reviews.designer, reviews.title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, 
    COUNT(comments.review_id = reviews.review_id) :: INT 
    AS comment_count
    FROM reviews 
    LEFT JOIN comments ON reviews.review_id = comments.review_id 
    WHERE reviews.category = $1
    GROUP BY reviews.review_id;`,
      [category]
    )
    .then((review) => {
      if (!review.rows[0]) {
        return Promise.reject({ status: 404, msg: "no reviews found" });
      }
      return review.rows[0];
    });
};

exports.updateReviewById = (review_id, incVotes) => {
  return db
    .query(
      `UPDATE reviews 
      SET votes = votes + $1 
      WHERE reviews.review_id =$2 RETURNING *;`,
      [incVotes, review_id]
    )
    .then(() => {
      return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id]);
    })
    .then((review) => {
      if (!review.rows[0]) {
        return Promise.reject({ status: 404, msg: `review: ${review_id} not found` });
      }
      return review.rows[0];
    });
};
