const path = require("path");
const express = require("express");
const app = express();
const { create } = require("express-handlebars");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const db = require("./database/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(cookieParser());
app.use(express.json());
const SECRET_KEY = process.env.JWT_SECRET;

// PORT
const PORT = process.env.PORT || 3009;

// API Version
const API_VERSION = "/api/v1";

// Middleware to authenticate token from cookies
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token provided in cookies");
    return res.status(401).render("401", {
      layout: "main",
      title: "Unauthorized",
      message: "You must log in to access this page.",
      style: "css/home.css",
      script: "js/home.js",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).render("403", {
        layout: "main",
        title: "Forbidden",
        message: "Your session has expired or your token is invalid. Please log in again.",
        style: "css/home.css",
        script: "js/home.js",
      });
    }

    req.user = user; 
    next();
  });
}
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

// Route: Signup Page
app.get("/signup", (req, res) => {
  res.render("signup", {
    layout: "main",
    title: "Soma Signup",
    style: "css/signup.css",
    script: "js/signup.js",
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    layout: "main",
    title: "Soma login",
    style: "css/login.css",
    script: "js/login.js",
  });
});

// Protected Routes
app.get("/exercise", authenticateToken, (req, res) => {
  res.render("exercise", {
    layout: "main",
    title: "Soma Exercise",
    style: "css/exercise.css",
    script: "js/exercise.js",
  });
});

app.get("/bmi", authenticateToken, (req, res) => {
  res.render("bmi", {
    layout: "main",
    title: "Soma BMI",
    style: "css/bmi.css",
    script: "js/bmi.js",
  });
});

app.get("/chatai", authenticateToken, (req, res) => {
  res.render("chatai", {
    layout: "main",
    title: "Soma ChatAI",
    style: "css/chatai.css",
    script: "js/chatai.js",
  });
});

app.get("/recipes", authenticateToken, (req, res) => {
  res.render("recipes", {
    layout: "main",
    title: "Soma Recipes",
    style: "css/recipes.css",
    script: "js/recipes.js",
  });
});

// Profile Route
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    console.log("Fetching profile for user ID:", req.user.id);

    const [userRows] = await db.connection
      .promise()
      .query("SELECT first_name, last_name, email FROM users WHERE id = ?", [req.user.id]);

    if (userRows.length === 0) {
      console.log("No user found with ID:", req.user.id);
      return res.status(404).send("User not found.");
    }

    const user = userRows[0];
    res.render("profile", {
      layout: "main",
      title: "Soma Profile",
      user,
      style: "css/profile.css",
      script: "js/profile.js",
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).send("Internal server error.");
  }
});

// Logout Route
app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.redirect("/login");
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const [existingUser] = await db.connection
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      return res.status(400).send("Email already in use.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.connection
      .promise()
      .query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
        [firstName, lastName, email, hashedPassword]
      );

    res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Internal server error.");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userRows] = await db.connection.promise().query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER(?)",
      [email]
    );

    if (userRows.length === 0) {
      return res.status(400).json({ error: "User not found." });
    }

    const user = userRows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({ success: true, redirect: "/" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

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
