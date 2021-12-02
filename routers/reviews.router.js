const express = require("express");
const { getReviews, getReviewsById } = require("../controllers/reviews.controller");

const reviewsRouter = express.Router(); //THIS FUCKING LINE!!!

reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:reviews_id").get(getReviewsById);

module.exports = reviewsRouter;
