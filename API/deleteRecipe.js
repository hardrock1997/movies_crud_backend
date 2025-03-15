const fsP = require("fs/promises");
const deleteMovie = async (recipes, req, res, id) => {
  if (recipes.length === 0) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "No recipes found!" }));
  }
  let recipeIndex = recipes.findIndex((recipe) => recipe?.id === id);
  if (recipeIndex !== -1) {
    recipes.splice(recipeIndex, 1);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    await fsP.writeFile(
      "./data/recipes.json",
      JSON.stringify({ recipes: recipes }, null, 2),
      (err) => {
        if (err) {
          console.log("write error", err);
        } else {
          console.log("OVERWRITTEN!");
        }
      }
    );
    res.end(JSON.stringify({ message: "Recipe deleted successfully" }));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Recipe not found" }));
  }
};

module.exports = deleteMovie;
