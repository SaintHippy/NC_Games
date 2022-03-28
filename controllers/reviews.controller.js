const { selectReviews, selectReviewById, updateReviewById } = require("../models/reviews.model");

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  selectReviews(sort_by, order, category)
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
  updateReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};
