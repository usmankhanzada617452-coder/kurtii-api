const CATEGORIES = require("../config/categories");

const getCategories = (req, res) => {
  res.json(CATEGORIES);
};

module.exports = { getCategories };