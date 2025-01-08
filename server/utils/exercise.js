const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const axios = require("axios");

// API KEY
const API_KEY = process.env.API_KEY_EXERCISE;

async function getExercise(exercise) {
  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${encodeURIComponent(
      exercise
    )}`,
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
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
  getExercise,
};
