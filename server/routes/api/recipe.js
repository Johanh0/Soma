const express = require("express");
const router = express.Router();
const recipe = require("../../utils/recipe");

router.get("/search-recipe", async (req, res) => {
  if (!req.query.search && !req.query.diet) {
    res.send({
      error: "You must provide a recipe name",
    });

    return;
  }

  //   console.log(req.query.search, req.query.diet);
  const data = await recipe.getRecipe(req.query.search, req.query.search);
  res.send({ data });
});

module.exports = router;
