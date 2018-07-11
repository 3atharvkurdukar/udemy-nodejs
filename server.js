const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('<h1>Hello express</h1>');
    res.send('<h1>Hello express!</h1>');
});

app.get('/about', (req, res) => {
    res.send({
        name: 'John',
        age: 23
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});



