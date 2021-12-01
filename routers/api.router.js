const express = require("express");
const categoriesRouter = require("./categories.router");
// const { reviewRouter } = require("./review.router");
// const { commentRouter } = require("./comment.router");
// const { userRouter } = require("./user.router");

const apiRouter = express.Router();

apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;
