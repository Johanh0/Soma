const modal = document.getElementById("logoutModal");
const logoutBtn = document.getElementById("logoutBtn");
const closeModal = document.getElementById("closeModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");

// Show the modal when the logout button is clicked
logoutBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

// Close the modal when the 'X' is clicked
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

// Close the modal if the user clicks "Cancel"
cancelLogout.addEventListener("click", function() {
    modal.style.display = "none";
});

// Logout if the user clicks "Yes, Logout"
confirmLogout.addEventListener("click", function() {
    // Logic for logging the user out, e.g., redirect to login page or clear session
    window.location.href = '/login'; // Redirect to login page
});

// Close the modal if the user clicks anywhere outside the modal
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
