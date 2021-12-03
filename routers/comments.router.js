const express = require("express");
const { getCommentsByReview, deleteCommentById } = require("../controllers/comments.controller");

const commentsRouter = express.Router();

commentsRouter.route("/").get(getCommentsByReview); //.post(postReview)
commentsRouter.route("/:comment_id").delete(deleteCommentById);

module.exports = commentsRouter;
