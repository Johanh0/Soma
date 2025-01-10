

document.getElementById("login-form").addEventListener("submit", function(event) {
    // Prevent the form from automatically submitting
    event.preventDefault();

    // Get the values of the input fields
    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-pw").value;

    // Get the error fields when the user enters in the data wrong in the input field
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");

    // Clears the previous error messages
    usernameError.textContent = '';
    passwordError.textContent = '';

    const loginUserNameRegex = /^[A-Za-z0-9]+$/;

    // Check if the username or password fields are empty or if it does not have the number of characters needed to login
    if (loginUsername === '' || loginUsername.length < 5 || !loginUserNameRegex.test(loginUsername)) {
      usernameError.textContent = "Please make sure you fill out the Username field, have at least 5 characters and no special characters.";
      return; 
    }
    if (loginPassword === '' || loginPassword.length < 8) {
      passwordError.textContent = "Please make sure you fill out the Password field and have at least 8 characters to login.";
      return; 
    }

    document.getElementById("login-form").submit();
  });

