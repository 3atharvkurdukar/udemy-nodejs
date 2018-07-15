const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    res.send([
        {
            name: 'Atharv',
            age: 19
        },
        {
            name: 'Shardul',
            age: 15
        },
        {
            name: 'Mahesh',
            age: 20
        },
        {
            name: 'John',
            age: 23
        }
    ]);
});

app.listen(3000);
module.exports.app = app;
