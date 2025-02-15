// script.js
async function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return;  // Prevent empty messages

    // Display user message with smooth transition
    appendMessage(userInput, 'user');

    // Clear the input field
    document.getElementById('userInput').value = '';

    // Show loading indicator with animation
    document.getElementById('loading').style.display = 'block';

    // Send the user input to the backend (Gemini API)
    try {
        const response = await fetch('https://chatbot-ai-backend-gokul-8382181cf70b.herokuapp.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();

        if (response.ok) {
            // Display bot response with smooth transition
            appendMessage(data.response, 'bot');
        } else {
            appendMessage('Error communicating with the server.', 'bot');
        }
    } catch (error) {
        console.error(error);
        appendMessage('Failed to connect to server.', 'bot');
    }

    // Hide the loading indicator after receiving the response
    document.getElementById('loading').style.display = 'none';
}

// Function to append messages (user and bot) with smooth animations
function appendMessage(message, sender) {
    const chatBox = document.getElementById('chatBox');
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender);
    bubble.textContent = message;
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom for new messages
}

// Optional: Auto-focus the input field when the user types
document.getElementById('userInput').addEventListener('focus', function () {
    document.getElementById('loading').style.display = 'none';
});
