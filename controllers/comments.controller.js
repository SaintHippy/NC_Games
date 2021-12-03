const selectCommentsByReview = require("../models/comments.model");

exports.getCommentsByReview = (review_id) => {
  const { review_id } = req.params;
  selectCommentsById(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
