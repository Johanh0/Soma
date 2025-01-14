const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const axios = require("axios");

// API KEY
const API_KEY = process.env.API_KEY_EXERCISE;

async function getExercises() {
  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${encodeURIComponent(
      "body weight"
    )}`,
    params: {
      limit: "325",
      offset: "0",
    },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const exerciseResponse = await axios.request(options);
    return exerciseResponse.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return null;
  }
}

module.exports = {
  getExercises,
};
