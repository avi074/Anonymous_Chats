// Connect to Socket.io
const socket = io();
const input = document.getElementById("messageInput");
const messageBox = document.getElementById("messages");
let username = "";

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

socket.on("newUser", (user) => {
  username = user;
  document.getElementById("username").innerText = `Username: ${user}`;
});

// Function to render a message on the UI
function renderMessage(data) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span class='text-sm text-gray-800 flex gap-4 border-b-2'>${
          data.user
        } <span class='text-gray-500'>${new Date(data.timestamp).toLocaleString(
    "en-IN",
  )}</span></span>
        <p class='font-semibold p-1 text-balance'>${data.message}</p>
    `;
  if (data.user == username) {
    li.classList.add("active");
  }
  messageBox.appendChild(li);
}

// Listen for previous messages when the page loads
fetch("/api/previousChats")
  .then((res) => res.json())
  .then((messages) => {
    messages.forEach((message) => {
      renderMessage(message);
    });
  })
  .catch(console.error);

// Listen for new messages
socket.on("newMessage", (data) => {
  renderMessage(data);
  scrollToBottom();
});

// Send a new message
function sendMessage() {
  const message = input.value;
  socket.emit("sendMessage", message);
  input.value = ""; // Clear the input
}

// Function to scroll the messages container to the bottom
function scrollToBottom() {
  messageBox.scrollTop = messageBox.scrollHeight;
}
