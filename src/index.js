import "../node_modules/tailwindcss/dist/tailwind.css";
import io from "socket.io-client";

const chatForm = document.getElementById('chatForm');
const chatContainer = document.getElementById('chat-content');
const socket = io();

// Message from server
socket.on('message', msg => {
    outputMessage(msg);

    // Scroll down
    chatContainer.scrollTop = chatContainer.scrollHeight;

});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get message text
    const msg = e.target.elements.msgbox.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input & focus
    e.target.elements.msgbox.value = '';
    e.target.elements.msgbox.focus();
});

// output message to DOM
function outputMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('msg-block', 'bg-blue-200', 'p-2', 'mb-2');
    div.innerHTML = `
        <span class="username text-blue-700 text-sm">Kamal</span>
        <span class="time text-gray-600 text-sm">2020-10-01 12:56:32</span>
        <div class="msg">${msg}</div>
    `;
    document.getElementById('chat-content').appendChild(div);
}