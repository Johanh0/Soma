const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const axios = require("axios");

const API_KEY = process.env.API_KEY_CHATAI;

async function sendMessage(message) {
  const options = {
    method: "POST",
    url: "https://chatgpt-42.p.rapidapi.com/gpt4",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      messages: [
        {
          role: "system",
          content:
            "You are a friendly and motivational assistant designed to help people lead a healthy lifestyle. Your main role is to provide beginner-friendly exercise recommendations, explain them in detail, and generate simple exercise routines. You should recommend balanced and nutritious diets that contribute to overall health, explaining the benefits of these foods. Your advice should always be clear that it is for informational purposes only and that users should consult real health professionals for personalized care. You are here to offer general health tips to maintain an optimal lifestyle, including both exercise and nutrition, but you cannot provide medical advice or respond to anything outside this scope. Be sure to always encourage and motivate the user, and make your suggestions feel approachable and fun. You will generate weekly routines for exercise and meal planning, but they are general recommendations, not personalized plans.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      web_access: false,
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
  sendMessage,
};
