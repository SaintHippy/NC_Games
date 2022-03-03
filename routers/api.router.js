const express = require("express");
const getApi = require("../controllers/api.controller");
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
// const { commentsRouter } = require("./comments.router");
// const { userRouter } = require("./user.router");

const apiRouter = express.Router();

// apiRouter.use("/", getApi);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
