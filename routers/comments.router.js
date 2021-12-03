const express = require("express");
const { getCommentsByReview, deleteCommentById, postReviewComment } = require("../controllers/comments.controller");

const commentsRouter = express.Router();

commentsRouter.route("/").get(getCommentsByReview).post(postReviewComment);
commentsRouter.route("/:comment_id").delete(deleteCommentById);

module.exports = commentsRouter;
