const express = require("express");
const getApi = require("../controllers/api.controller");
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
// const { commentRouter } = require("./comment.router");
// const { userRouter } = require("./user.router");

const apiRouter = express.Router();

// apiRouter.use("/", getApi); //Not sure where to put the successful connection message... api.Controller? here?

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
