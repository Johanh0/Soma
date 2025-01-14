
const form = document.querySelector(".contact-form");
const fullName = document.getElementById("name");
const emailField = document.getElementById("contact-email");
const messageField = document.getElementById("message");


const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");


form.addEventListener("submit", function(event) {
    let isValid = true; 

   
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

  
    fullName.classList.remove('error');
    emailField.classList.remove('error');
    messageField.classList.remove('error');

    const nameRegex = /^[A-Za-z]{5,}$/;  
    if (!nameRegex.test(fullName.value)) {
        nameError.textContent = "Username must contain only letters and be at least 5 characters long.";
        fullName.classList.add('error'); 
        isValid = false;
    }

    // Validate Email (must contain '@')
    if (!emailField.value.includes('@')) {
        emailError.textContent = "Email must contain '@'.";
        emailField.classList.add('error'); 
        isValid = false;
    }

    
    const messageLength = messageField.value.length;
    if (messageLength < 10 || messageLength > 350) {
        messageError.textContent = "Message must be between 10 and 350 characters.";
        messageField.classList.add('error'); 
        isValid = false;
    } 

  
    if (!isValid) {
        event.preventDefault(); 
    }

});