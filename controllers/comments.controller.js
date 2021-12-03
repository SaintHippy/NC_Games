const { selectCommentsByReview, removeCommentById } = require("../models/comments.model");

exports.getCommentsByReview = (req, res, next) => {
  console.log("in getComments");
  const { review_id } = req.params;
  selectCommentsByReview(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  console.log("deleting...");
  const comment_id = req.params;
  removeCommentById(comment_id)
    .then((response) => {
      res.status(204).send(response);
    })
    .catch(next);
};
