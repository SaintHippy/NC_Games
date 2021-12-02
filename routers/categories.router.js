const express = require("express");
const { getCategories } = require("../controllers/categories.controller");

const categoriesRouter = express.Router();

categoriesRouter.route("/").get(getCategories); //all the categories

module.exports = categoriesRouter;
