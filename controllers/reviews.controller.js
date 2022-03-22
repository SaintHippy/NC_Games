const {
  selectReviews,
  selectReviewById,

  updateReviewById,
} = require("../models/reviews.model");

exports.getReviews = (req, res, next) => {
  selectReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getReviewByCategory = (req, res, next) => {
  const { category } = req.params;
  selectReviewsByCategory(category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

exports.patchReviewById = (req, res, next) => {
  const { review_id } = req.params;
  const { num } = req.body;
  updateReviewById(review_id, votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};
