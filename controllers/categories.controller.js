const { selectCategories, selectReviewsByCategory } = require("../models/categories.model.js");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewByCategory = (req, res, next) => {
  const { category } = req.params;
  selectReviewsByCategory(category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};
