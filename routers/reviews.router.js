const express = require("express");
const { getReviews, getReviewById } = require("../controllers/reviews.controller");

const reviewsRouter = express.Router(); //THIS FUCKING LINE!!!

reviewsRouter.route("/").get(getReviews);
reviewsRouter.route(":reviews_id").get(getReviewById);

module.exports = reviewsRouter;
