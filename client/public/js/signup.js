

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("sign-up-form");
    const errorMessagesList = document.getElementById("errorMessages");
    const errorModal = document.getElementById("errorModal");  // html pops up when error happens during creation

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const passwordAgain = document.getElementById("passwordAgain").value.trim();

        const nameRegex = /^[A-Za-z]+$/;
        const userNameRegex = /^[A-Za-z0-9]+$/;
        let errorMessages = [];

        // Validation checks
        if (firstName === "" || firstName.length < 2 || !nameRegex.test(firstName)) {
            errorMessages.push("Please enter your first name.");
        }
        if (lastName === "" || lastName.length < 2 || !nameRegex.test(lastName)) {
            errorMessages.push("Please enter your last name.");
        }

        if (username.length < 5 || !userNameRegex.test(username)) {
            errorMessages.push("Username must be at least 5 characters long and no special characters.");
        }

        if (!validateEmail(email)) {
            errorMessages.push("Please enter a valid email address.");
        }

        if (password.length < 8) {
            errorMessages.push("Password must be at least 8 characters long.");
        }

        if (password !== passwordAgain) {
            errorMessages.push("Passwords do not match.");
        }

        // If there are errors, show the modal and prevent form submission
        if (errorMessages.length > 0) {
            displayModal(errorMessages);  // Show the modal with errors ma
            return;  // Don't submit the form yet
        }

        // If no errors, then we can submit the form
        form.submit();
    });

    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    // Display the modal with error messages
    function displayModal(errors) {
        errorMessagesList.innerHTML = ''; // Clear previous messages
        errors.forEach(function(message) {
            const li = document.createElement('li');
            li.textContent = message;
            errorMessagesList.appendChild(li);
        });
        errorModal.style.display = "block";  // Show the modal
    }

    });

