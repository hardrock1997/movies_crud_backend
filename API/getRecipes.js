const getRecipes = (recipesData, req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.end(recipesData);
};

module.exports = getRecipes;
