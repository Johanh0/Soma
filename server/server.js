const path = require("path");
const express = require("express");
const app = express();
const { create } = require("express-handlebars");

// PORT
const PORT = process.env.PORT || 3009;

// API Version
const API_VERSION = "/api/v1";

// Set handlebars
const hbs = create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  extname: ".hbs",
});

app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");

// Path static client directory
app.use(express.static(path.join(__dirname, "../client/public")));
console.log(path.join(__dirname, "../client/public"));

// Route's pages
app.get("/", (req, res) => {
  res.render("home", {
    layout: "main",
    title: "Soma",
    style: "css/home.css",
    script: "js/home.js",
  });
});

app.get("/signup", (req, res) => {
  res.render("signup", {
    layout: "main",
    title: "MindWay",
    style: "css/signup.css",
    script: "js/signup.js",
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    layout: "main",
    title: "MindWay login",
    style: "css/login.css",
    script: "js/login.js",
  });
});

app.get("/profile", (req, res) => {
  res.render("profile", {
    layout: "main",
    title: "Soma profile",
    style: "css/profile.css",
    script: "js/profile.js",
  });
});

app.get("/exercise", (req, res) => {
  res.render("exercise", {
    layout: "main",
    title: "Soma Exercise",
    style: "css/exercise.css",
    script: "js/exercise.js",
  });
});

app.get("/recipes", (req, res) => {
  res.render("recipes", {
    layout: "main",
    title: "Soma Recipes",
    style: "css/recipes.css",
    script: "js/recipes.js",
  });
});

app.get("/bmi", (req, res) => {
  res.render("bmi", {
    layout: "main",
    title: "Soma BMI",
    style: "css/bmi.css",
    script: "js/bmi.js",
  });
});

app.get("/chatai", (req, res) => {
  res.render("chatai", { layout: "main", title: "Soma chatAI", style: "css/chatai.css", script:"js/chatai.js"});
});

// Routers
const apiExercise = require("./routes/api/exercise.js");
const apiRecipe = require("./routes/api/recipe.js");

app.use(`${API_VERSION}/exercise`, apiExercise);
app.use(`${API_VERSION}/recipe`, apiRecipe);

// Handle 404 - Not Found
app.get("/*", (req, res) => {
  res.status(404).render("404", {
    layout: "main",
    title: "Page Not Found",
    style: "css/404.css",
    script: "js/404.js",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
