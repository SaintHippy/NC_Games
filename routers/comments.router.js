const express = require("express");
const { deleteCommentById, patchCommentById, getCommentById } = require("../controllers/comments.controller");

const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").delete(deleteCommentById).patch(patchCommentById).get(getCommentById);

module.exports = commentsRouter;
