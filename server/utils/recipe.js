const axios = require("axios");

// API KEY
const API_KEY = process.env.API_KEY_RECIPE;

async function getRecipe(search, diet, intolerances, include, exclude) {
  //  pescetarian, vegan, paleo, primal, and vegetarian.
  const options = {
    method: "GET",
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
    params: {
      query: search,
      diet: diet,
      intolerances: intolerances,
      includeIngredients: include,
      excludeIngredients: exclude,
      instructionsRequired: "true",
      fillIngredients: "false",
      addRecipeInformation: "true",
      addRecipeInstructions: "true",
      addRecipeNutrition: "false",
      maxReadyTime: "45",
      ignorePantry: "true",
      sort: "max-used-ingredients",
      offset: "0",
      number: "20",
    },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getRecipe,
};
