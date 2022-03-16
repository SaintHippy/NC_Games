const {
  selectCommentsByReview,
  removeCommentById,
  updateCommentById,
  insertComment,
} = require("../models/comments.model");

exports.getCommentsByReview = (req, res, next) => {
  const { review_id } = req.params;
  selectCommentsByReview(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then((response) => {
      res.status(204).send(response);
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const { username: author, body } = req.body;
  insertComment({ review_id, author, body })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { review_id } = req.params;
  updateCommentById(review_id, req.body).then((comment) => {
    res.status(204).send({ comment });
  });
};
