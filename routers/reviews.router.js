const express = require("express");
const commentsRouter = require("../routers/comments.router");
const { getReviews, getReviewById, patchReviewById } = require("../controllers/reviews.controller");

const reviewsRouter = express.Router();

reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);
reviewsRouter.route("/:review_id/comments", commentsRouter);

module.exports = reviewsRouter;
