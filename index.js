'use strict';
const path = require('path');
const express = require('express');
const socket = require('socket.io');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

const server = app.listen(PORT, () => {
    console.log(`Listen on http://127.0.0.1:${PORT}`)
});

app.use(express.static(path.resolve(__dirname, 'client')));

const io = socket(server);

io.on('connection', function (socket) {
    console.log(`New Connection ${socket.id}`);

    socket.on('message', (data) => {
        console.log(`New message from ${socket.id}: ${data}`);
    });

    socket.on('notification', (data) => {
        console.log(`New notification: ${data}`);
    });
});