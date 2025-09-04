(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

function sendEmail(e) {
    e.preventDefault()
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var subject = document.getElementById("subject").value
    var message = document.getElementById("message").value
    if(!name || !email || !subject || !message) {
        alert("Fill all fields and try again")
        return
    }
	Email.send({
        isNotMendrill: true,
        Username: 'hanumanthumanoj27@gmail.com',
        Password: 'Manoj@123',
        Host: 'smtp.elasticemail.com',
        Port: '2525',
        From: "hanumanthumanoj27@gmail.com",
        To : 'hmanoj.ece@gmail.com',
        Subject :subject,
        Body :  `email: ${email} <br/> name:${name} <br/> Subject: ${subject} <br/> message: ${message}`,
	}).then(res =>{ 
        alert('Message has been send');
        document.getElementById("name").value = ""
        document.getElementById("email").value = ""
        document.getElementById("subject").value = ""
        document.getElementById("message").value = ""
    }, function(error) {
        console.log('FAILED...', error);
    });

}
// AI Chat Functions
function toggleChat() {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
  }
  
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
  
  async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';
    
    // Show typing indicator
    const typingIndicator = addTypingIndicator();
    
    try {
      // Send message to backend
      const response = await askAI(message);
      
      // Remove typing indicator
      typingIndicator.remove();
      
      // Add AI response
      addMessage(response, 'bot');
    } catch (error) {
      // Remove typing indicator
      typingIndicator.remove();
      
      // Show error message
      addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", 'bot');
      console.error('Error:', error);
    }
  }
  
  function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function addTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<p>Thinking...</p>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }
  
  // This function will call your backend
  // This function will call your Flask backend
async function askAI(question) {
  try {
    const response = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: question }),
    });

    const data = await response.json();
    return data.response; // AI reply comes from Flask
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
}
