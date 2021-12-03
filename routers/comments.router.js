const express = require("express");
const getCommentsByReview = require("../controllers/comments.controller");

const commentsRouter = express.Router();

commentsRouter.use("/", getCommentsByReview);

module.exports = commentsRouter;
