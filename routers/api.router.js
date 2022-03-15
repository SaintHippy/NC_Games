const apiRouter = require("express").Router();
const endpoints = require("../endpoints.json");
// const getApi = require("../controllers/api.controller");
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");
// const usersRouter  = require("./user.router");

apiRouter.route("/").get((req, res) => res.send({ msg: JSON.stringify(JSON.parse(endpoints)) }));
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
// apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
