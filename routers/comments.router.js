const express = require("express");
const { deleteCommentById, patchCommentById, getCommentsByReview } = require("../controllers/comments.controller");

const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").delete(deleteCommentById).patch(patchCommentById).get(getCommentsByReview);

module.exports = commentsRouter;
