const apiRouter = require("express").Router();
const endpoints = require("../endpoints.json");
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");

apiRouter.route("/").get((req, res) => res.send({ msg: endpoints }));
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
