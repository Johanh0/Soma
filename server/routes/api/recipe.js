const express = require("express");
const router = express.Router();
const recipe = require("../../utils/recipe");

router.get("/search-recipe", async (req, res) => {
  const { search, diet, intolerances, include, exclude } = req.query;

  if (
    search == undefined ||
    diet == undefined ||
    intolerances == undefined ||
    include == undefined ||
    exclude == undefined
  ) {
    res.send({
      error: "You must provide a recipe name",
    });

    return;
  }

  try {
    const data = await recipe.getRecipe(
      search,
      diet,
      intolerances,
      include,
      exclude
    );
    res.send({ data });
  } catch {}
});

module.exports = router;
