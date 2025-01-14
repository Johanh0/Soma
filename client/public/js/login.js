document.getElementById("login-form").addEventListener("submit", async function (event) {
  // Prevent the form from automatically submitting
  event.preventDefault();

  // Get the values of the input fields
  const loginEmail = document.getElementById("login-email").value.trim();
  const loginPassword = document.getElementById("login-pw").value.trim();

  // Get the error fields for displaying messages
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  // Clear previous error messages
  emailError.textContent = '';
  passwordError.textContent = '';

  // Validate the inputs
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (loginEmail === '' || !emailRegex.test(loginEmail)) {
    emailError.textContent = "Please enter a valid email address.";
    return;
  }

  if (loginPassword === '' || loginPassword.length < 8) {
    passwordError.textContent = "Please make sure your password is at least 8 characters long.";
    return;
  }

  try {
    // Send login data to the server
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });

    const data = await response.json();

    // Handle server response
    if (!response.ok) {
      if (data.error === 'Incorrect password.') {
        passwordError.textContent = data.error;
      } else if (data.error === 'User not found.') {
        emailError.textContent = data.error;
      }
      return;
    }

    // Redirect to the home page after successful login
    if (data.success) {
      alert('Login successful!');
      window.location.href = data.redirect || '/';
    }
  } catch (error) {
    console.error('Error during login:', error);
    passwordError.textContent = 'An error occurred. Please try again.';
  }
});
