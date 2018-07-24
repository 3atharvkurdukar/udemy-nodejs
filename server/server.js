const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected! 😊');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
   });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined!',
        createdAt: new Date().getTime()
    });

    // socket.emit('newMessage', {
    //     from: 'Bob',
    //     text: 'Something...',
    //     createdAt: 1423545345
    // });

    socket.on('createMessage', (message) => {
        console.log('Message created:', message);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected. 😥');
    });
});



server.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});