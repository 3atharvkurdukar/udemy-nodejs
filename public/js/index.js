var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server 😊');
});

socket.on('disconnect', function () {
    console.log('Server disconnected 😥');
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    });
});
