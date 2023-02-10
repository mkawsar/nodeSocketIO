const socket = io();

socket.emit('message', 'HI');
socket.emit('notification', 'Thanks for connecting to Codedamn!');