document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutModal = document.getElementById("logoutModal");
    const closeModal = document.getElementById("closeModal");
    const confirmLogout = document.getElementById("confirmLogout");
    const cancelLogout = document.getElementById("cancelLogout");
  
    const profileUsername = document.getElementById("profile-username");
    const firstNameSpan = document.querySelector("#firstName");
    const lastNameSpan = document.querySelector("#lastName");
    const emailSpan = document.querySelector("#email");
  
    // Logout Modal Functionality
    logoutBtn.addEventListener("click", () => {
      logoutModal.style.display = "block";
    });
  
    closeModal.addEventListener("click", () => {
      logoutModal.style.display = "none";
    });
  
    cancelLogout.addEventListener("click", () => {
      logoutModal.style.display = "none";
    });
  
    confirmLogout.addEventListener("click", () => {
      // Remove token from localStorage
      localStorage.removeItem("token");
      window.location.href = "/login";
    });
  
    // Close modal on clicking outside of it
    window.addEventListener("click", (event) => {
      if (event.target === logoutModal) {
        logoutModal.style.display = "none";
      }
    });
  
    // Fetch and Display User Profile Data
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You are not logged in! Redirecting to login.");
      window.location.href = "/login";
      return;
    }
  
    fetch("/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        return response.json();
      })
      .then((data) => {
        // Update the UI with the user data
        profileUsername.textContent = `Username: ${data.username || "N/A"}`;
        firstNameSpan.textContent = data.first_name;
        lastNameSpan.textContent = data.last_name;
        emailSpan.textContent = data.email;
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        alert("An error occurred. Redirecting to login.");
        window.location.href = "/login";
      });
  });
  