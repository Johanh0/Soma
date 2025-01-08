const path = require("path");
const express = require("express");
const app = express();
const { create } = require("express-handlebars");

// PORT
const PORT = process.env.PORT || 3003;

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
    title: "MindWay",
    style: "css/home.css",
    script: "js/home.js",
  });
});

app.get("/exercise", (req, res) => {
  res.render("exercise", {
    layout: "main",
    title: "Motion Exercise",
    style: "css/exercise.css",
    script: "js/exercise.js",
  });
});

app.get("/login", (req, res) => {
  res.render("login", { layout: "main", title: "MindWay login" });
});

app.get("/form", (req, res) => {
  res.render("form", { layout: "main", title: "MindWay from" });
});

app.get("/chatai", (req, res) => {
  res.render("chatai", { layout: "main", title: "MindWay chatAI" });
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
