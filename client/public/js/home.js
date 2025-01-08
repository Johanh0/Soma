import { navbarToggle, themeToggle } from "/js/navbar.js";
import footerYear from "/js/footer.js";

// Trigger functions after the DOM were load
document.addEventListener("DOMContentLoaded", () => {
  themeToggle();
  navbarToggle();
  footerYear();
});
