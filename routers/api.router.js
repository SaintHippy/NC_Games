const apiRouter = require("express").Router();
const getApi = require("../controllers/api.controller");
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");
// const usersRouter  = require("./user.router");

apiRouter.use("/", getApi);
apiRouter.Route("/categories", categoriesRouter);
apiRouter.Route("/reviews", reviewsRouter);
apiRouter.Route("/comments", commentsRouter);
// apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
