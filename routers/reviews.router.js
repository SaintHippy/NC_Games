const express = require("express");
const commentsRouter = require("../routers/comments.router");
const { getReviews, getReviewById, patchVotesBy } = require("../controllers/reviews.controller");

const reviewsRouter = express.Router();

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchVotesBy);
reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:review_id/comments", commentsRouter);

module.exports = reviewsRouter;
