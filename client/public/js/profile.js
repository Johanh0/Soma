import { navbarToggle, themeToggle, storageTheme } from "/js/navbar.js";
import footerYear from "/js/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutModal = document.getElementById("logoutModal");
  const closeModal = document.getElementById("closeModal");
  const confirmLogout = document.getElementById("confirmLogout");
  const cancelLogout = document.getElementById("cancelLogout");

  // Logout Modal Functionality
  if (logoutBtn && logoutModal && closeModal && confirmLogout && cancelLogout) {
    logoutBtn.addEventListener("click", () => {
      logoutModal.style.display = "block"; // Show the modal
    });

    closeModal.addEventListener("click", () => {
      logoutModal.style.display = "none"; // Hide the modal
    });

    cancelLogout.addEventListener("click", () => {
      logoutModal.style.display = "none"; // Hide the modal
    });

    confirmLogout.addEventListener("click", () => {
      fetch("/logout", { method: "GET" })
        .then(() => {
          window.location.href = "/login";
        })
        .catch((error) => {
          console.error("Error during logout:", error);
        });
    });

    window.addEventListener("click", (event) => {
      if (event.target === logoutModal) {
        logoutModal.style.display = "none"; // Close modal on outside click
      }
    });
  } else {
    console.error("One or more modal elements are missing in the DOM.");
  }

  // Initialize UI Features
  storageTheme();
  themeToggle();
  navbarToggle();
  footerYear();
});
