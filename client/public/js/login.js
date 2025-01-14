import { navbarToggle, themeToggle, storageTheme } from "/js/navbar.js";
import footerYear from "/js/footer.js";

document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    // Prevent the form from automatically submitting
    event.preventDefault();

    // Get the values of the input fields
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-pw").value;

    // Get the error fields for displaying messages
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // Clear previous error messages
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validate the inputs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clears the previous error messages
    usernameError.textContent = "";
    passwordError.textContent = "";
    if (loginEmail === "" || !emailRegex.test(loginEmail)) {
      emailError.textContent = "Please enter a valid email address.";
      return;
    }

    if (loginPassword === "" || loginPassword.length < 8) {
      passwordError.textContent =
        "Please make sure your password is at least 8 characters long.";
      return;
    }

    // Check if the username or password fields are empty or if it does not have the number of characters needed to login
    if (
      loginUsername === "" ||
      loginUsername.length < 5 ||
      !loginUserNameRegex.test(loginUsername)
    ) {
      usernameError.textContent =
        "Please make sure you fill out the Username field, have at least 5 characters and no special characters.";
      return;
    }
    if (loginPassword === "" || loginPassword.length < 8) {
      passwordError.textContent =
        "Please make sure you fill out the Password field and have at least 8 characters to login.";
      return;
    }

    // document.getElementById("login-form").submit();

    try {
      // Send login data to the server
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      // Handle server response
      if (!response.ok) {
        if (data.error === "Incorrect password.") {
          passwordError.textContent = data.error;
        } else if (data.error === "User not found.") {
          emailError.textContent = data.error;
        }
        return;
      }

      // Store the JWT token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = data.redirect;
      }
    } catch (error) {
      console.error("Error during login:", error);
      passwordError.textContent = "An error occurred. Please try again.";
    }
  });

// Trigger functions after the DOM were load
document.addEventListener("DOMContentLoaded", () => {
  storageTheme();
  themeToggle();
  navbarToggle();
  footerYear();
});
