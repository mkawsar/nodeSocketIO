'use strict';
var express = require('express');
var http = require('http');

var app = express();
//var server = http.createServer(app);

var socketIO = require('socket.io');
var path = require('path');

const PORT = 3000;

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

var name;

const server = app.listen(PORT, () => {
    console.log(`Listen on http://127.0.0.1:${PORT}`)
});

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log(`new user connected ${socket.id}`);

    socket.on('join msg', (username) => {
        name = username;
        console.log(`chat mesage --- ${name} joined the chat ---`);
        io.emit('chat mesage', `---${name} joined the chat ---`);
    });

    socket.on('disconnect', () => {
        console.log(`chat mesage ---${name} let the chat---`);
        io.emit('chat mesage', `---${name} let the chat---`);
    });

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg); //sending message to all except the sender
    });
});
