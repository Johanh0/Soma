
document.getElementById('send-button').addEventListener('click', sendMessage);


document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {

    const userInput = document.getElementById('user-input').value.trim();

    
    if (userInput === '') return;

    
    appendMessage(userInput, 'user-message');

    
    document.getElementById('user-input').value = '';


    setTimeout(() => {
        const aiResponse = generateAIResponse(userInput);
        appendMessage(aiResponse, 'ai-message');
    }, 1000); 
}

function appendMessage(message, type) {
    // Create a new div element to hold the message
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = message;

    // Append the message to the messages container
    const messagesContainer = document.getElementById('messages');
    messagesContainer.appendChild(messageElement);

    // Automatically scroll to the bottom of the chat box
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(userInput) {
    // Example simple AI responses based on user input
    if (userInput.toLowerCase().includes('hello' || 'hey' || 'hi')) {
        return "Hello! How can SOMA assist you today?";
    } else if (userInput.toLowerCase().includes('how are you')) {
        return "SOMA is doing great! How about you?";
    } else if (userInput.toLowerCase().includes('help')) {
        return "SOMA will be glad to assist? What can I help you with today?";
    } else if (userInput.toLowerCase().includes('bye' || 'goodbye' || 'see you later')) {
        return "Goodbye from SOMA! Have a nice day!";
    }
     else {
        return "I'm not sure how to respond to that, but I'm here to help! Please provide valid or appropiate requests!";
    }
}