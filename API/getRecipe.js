const getRecipe = (recipes, req, res, id) => {
  const recipeObject = recipes.filter((recipe) => recipe.id === id)[0];
  if (!recipeObject) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Recipe not found" }));
  }
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify({ recipe: recipeObject }));
};
module.exports = getRecipe;
