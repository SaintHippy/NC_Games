const db = require("../db/connection");

exports.selectReviews = (sort_by = "reviews.created_at", order = "DESC", category) => {
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
        ORDER BY ${sort_by} ${order};  `
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

exports.updateReviewById = (review_id, inc_votes) => {
  if (inc_votes && isNaN(inc_votes)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid request, inc_votes must be a number",
    });
  }
  return db
    .query(`UPDATE reviews SET votes = votes + $2 WHERE review_id = $1`, [review_id, inc_votes])
    .then(() => {
      return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id]);
    })
    .then((response) => {
      return response.rows[0];
    });
};
