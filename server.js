const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./src/utils/messages');
const { format } = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const systemName = 'Bot';

// Set static folder
app.use(express.static(path.join(__dirname, 'src')));

// Run when client connets
io.on('connection', socket => {

    // Welcome current user
    socket.emit('message', formatMessage(systemName, 'Welcome to chat'));

    // Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(systemName, 'Hey, A user has joined the chat'));

    // When client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(systemName, 'Hey, A user has left the chat'));
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    });
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
