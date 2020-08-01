import "../node_modules/tailwindcss/dist/tailwind.css";
import io from "socket.io-client";
import Qs from "qs";

const chatForm = document.getElementById('chatForm');
const chatContainer = document.getElementById('chat-content');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('room-users-list');

// Get username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// Join chat room
socket.emit('joinRoom', {username, room});

socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});

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
        <span class="username text-blue-700 text-sm">${msg.username}</span>
        <span class="time text-gray-600 text-sm">${msg.time}</span>
        <div class="msg">${msg.text}</div>
    `;
    document.getElementById('chat-content').appendChild(div);
}

// Add roomname to chat
function outputRoomName(room) {
    roomName.innerText = `Active Room: ${room}`;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li class="py-2 border-b border-gray-300 text-sm">${user.username}</li>`).join('')}
    `;
}