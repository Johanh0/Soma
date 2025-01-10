import { navbarToggle, themeToggle, storageTheme } from "/js/navbar.js";
import footerYear from "/js/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  storageTheme();
  themeToggle();
  navbarToggle();
  footerYear();
});
