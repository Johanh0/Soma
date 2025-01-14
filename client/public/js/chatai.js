import { navbarToggle, themeToggle, storageTheme } from "/js/navbar.js";
import footerYear from "/js/footer.js";

const userInput = document.getElementById("user-input");
console.log(userInput);

// Selecting the send btn and adding an event listener
document.getElementById("send-button").addEventListener("click", sendMessage);

// Adding an event listener to the input when the keyboard enter is press
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Function to send the message
function sendMessage() {
  const userInputValue = userInput.value.trim();

  // If it is empty return
  if (userInputValue === "") return;

  // Call the function to add the message to the chat
  appendMessage(userInputValue, "user-message");

  // Clean the input
  userInput.value = "";

  setTimeout(async () => {
    const aiResponse = await generateAIResponse(userInputValue);
    appendMessage(aiResponse, "ai-message");
  }, 1000);
}

function appendMessage(message, type) {
  // Create a new div element to hold the message
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);

  // Convert the AI message to HTML if it's an AI response
  if (type === "ai-message") {
    messageElement.innerHTML = `
      <div class="message-response">
        <p>${convertMarkdownToHTML(message)}</p>
      </div>
    `; // Use the manual conversion function
  } else {
    messageElement.textContent = message; // For user input, no need to convert
  }

  // Append the message to the messages container
  const messagesContainer = document.getElementById("messages");
  messagesContainer.appendChild(messageElement);

  // Automatically scroll to the bottom of the chat box
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function generateAIResponse(userInput) {
  // Example simple AI responses based on user input
  console.log(userInput);
  const userInputValue = userInput.toLowerCase();

  const aiMessage = await chatResponse(userInputValue);
  return aiMessage;
}

async function chatResponse(message) {
  try {
    const url = `/api/v1/chatai/message?msg=${encodeURIComponent(message)}`;
    const response = await fetch(url, {
      method: "POST",
    });

    const data = await response.json();
    return data.result;
  } catch {}
}

// Function to manually convert Markdown to HTML
function convertMarkdownToHTML(text) {
  // Convert bold text
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert unordered lists
  text = text.replace(/^-\s(.*?)(?=\n|$)/gm, "<ul><li>$1</li></ul>");

  // Convert ordered lists
  text = text.replace(/^\d+\.\s(.*?)(?=\n|$)/gm, "<strong>$1</strong>");

  // Convert newlines to <br> for line breaks
  text = text.replace(/(\.)(?=\s|$)/g, "$1&nbsp;<br><br>");

  return text;
}

// Trigger functions after the DOM were load
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const aiResponse = "Hello! How can SOMA assist you today?";
    appendMessage(aiResponse, "ai-message");
  }, 1000);

  storageTheme();
  themeToggle();
  navbarToggle();
  footerYear();
});
