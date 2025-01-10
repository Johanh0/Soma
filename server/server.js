const path = require("path");
const express = require("express");
const app = express();
const { create } = require("express-handlebars");

// PORT
const PORT = process.env.PORT || 3009;

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
    layout: "loginLayout",
    title: "MindWay login",
    style: "css/login.css",
    script: "js/login.js",
  });
});

app.get("/form", (req, res) => {
  res.render("form", { layout: "main", title: "MindWay from" });
});

app.get("/resources", (req, res) => {
  res.render("resources", { layout: "main", title: "MindWay resources" });
});

app.get("/chatai", (req, res) => {
  res.render("chatai", { layout: "main", title: "MindWay chatAI" });
});

// Handle 404 - Not Found
app.use((req, res) => {
  res.status(404).send({
    msg: "404 - Page not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
