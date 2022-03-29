const express = require("express");

const {
  getReviews,
  getReviewById,

  patchReviewById,
} = require("../controllers/reviews.controller");
const { getCommentsByReview, postComment } = require("../controllers/comments.controller");

const reviewsRouter = express.Router();

reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:review_id").patch(patchReviewById).get(getReviewById);
reviewsRouter.route("/:review_id/comments").get(getCommentsByReview).post(postComment);

module.exports = reviewsRouter;
