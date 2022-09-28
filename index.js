const express = require('express');
const app = express();
const http = require('http');
const server = process.env.PORT || http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use('/media', express.static(__dirname + '/media'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('new message', (msg) => {
        socket.broadcast.emit('new message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});