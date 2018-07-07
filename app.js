console.log('App started!');

// const fs = require('fs');
// const os = require('os');

// let user = os.userInfo();

// Async Method
// fs.appendFile('greetings.txt', `Hello ${user.username}!`, (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

// Synchronous Method
// fs.appendFileSync('greetings.txt', `Hello ${user.username}!`);

const notes = require('./notes.js');

let res = notes.addNote();

let sum = notes.add(15, 80);
console.log('Sum = ', notes.add(15, 80));

