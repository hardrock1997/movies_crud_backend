const fsP = require("fs/promises");
const createRecipe = (recipes, req, res, id) => {
  const bufferStream = [];
  req.on("data", (chunk) => {
    bufferStream.push(chunk);
  });
  req.on("end", async () => {
    const newRecipe = JSON.parse(Buffer.concat(bufferStream).toString());
    const duplicateRecipe = recipes.filter(
      (recipe) => recipe.id === newRecipe.id
    );
    if (duplicateRecipe.length > 0) {
      res.statusCode = 409;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Recipe already exists" }));
    }
    recipes.push(newRecipe);
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
    res.end(JSON.stringify({ message: "New recipe created" }));
  });
};

module.exports = createRecipe;
