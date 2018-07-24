var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server 😊');

    // socket.emit('createMessage', {
    //     from: 'Alice',
    //     text: 'Sample text'
    // });
});

socket.on('disconnect', function () {
    console.log('Server disconnected 😥');
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);
});