console.log('App started!');

const fs = require('fs');
const os = require('os');

let user = os.userInfo();

// Async Method
fs.appendFile('greetings.txt', `Hello ${user.username}!`, (err) => {
    if (err) {
        console.log(err);
    }
});

// Synchronous Method
fs.appendFileSync('greetings.txt', `Hello ${user.username}!`);

