const express = require("express");
const { deleteCommentById, patchCommentById, getAllComments } = require("../controllers/comments.controller");

const commentsRouter = express.Router();

commentsRouter.route("/").get(getAllComments);
commentsRouter.route("/:comment_id").delete(deleteCommentById).patch(patchCommentById);

module.exports = commentsRouter;
