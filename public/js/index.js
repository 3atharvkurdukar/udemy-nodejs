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

socket.on('newLocationMessage', function (message) {
    console.log('New Location Message', message);
    var li = $('<li></li>');
    var a = $('<a target="_blank">View Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        
        socket.emit('createLocationMessage', {
            from: 'User',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    }, function () {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send Location');
    });
});