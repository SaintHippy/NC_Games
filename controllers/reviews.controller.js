const { selectReviews, selectReviewById, updateVotesBy } = require("../models/reviews.model");

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

exports.patchVotesBy = (req, res, next) => {
  const { inc_votes } = req.body;
  const { review_id } = req.params;
  updateVotesBy(inc_votes, review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};
