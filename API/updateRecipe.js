const url = require("url");
const fsP = require("fs/promises");
const updateRecipe = async (recipes, req, res, id) => {
  const bufferStream = [];
  req.on("data", (chunk) => {
    bufferStream.push(chunk);
  });
  req.on("end", async () => {
    const newRecipeObject = JSON.parse(Buffer.concat(bufferStream).toString());
    const recipeToUpdate = recipes.filter((recipe) => recipe.id === id)[0];
    if (recipeToUpdate.length === 0) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Recipe not found!!!" }));
    } else {
      const dataKeys = Object.keys(newRecipeObject);
      for (let i = 0; i < dataKeys.length; ++i) {
        if (dataKeys[i] !== "id") {
          recipeToUpdate[dataKeys[i]] = newRecipeObject[dataKeys[i]];
        }
      }
      const index = recipes.findIndex(
        (recipe) => recipe.id === recipeToUpdate.id
      );
      recipes[index] = recipeToUpdate;
      await fsP.writeFile(
        "./data/recipes.json",
        JSON.stringify({ recipes: recipes }, null, 2),
        (err) => {
          if (err) {
            console.log("write error", err);
          } else {
            console.log("CREATED!");
          }
        }
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Recipe updated!" }));
    }
  });
};

module.exports = updateRecipe;
