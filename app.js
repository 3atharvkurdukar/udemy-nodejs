console.log('App started!');

/**
 * Using readymade modules
 */
// const fs = require('fs');
// const os = require('os');

// let user = os.userInfo();

// // Async Method
// fs.appendFile('greetings.txt', `Hello ${user.username}!`, (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

// // Synchronous Method
// fs.appendFileSync('greetings.txt', `Hello ${user.username}!`);

/**
 * Creating custom module  
 */
// const notes = require('./notes.js');
// let res = notes.addNote();
// console.log('Sum = ', notes.add(15, 80));

/**
 * Using npm & loadsh module
 */
// const _ = require('lodash');
// console.log(_.isString(true));
// console.log(_.isString('Sample'));

// const array = [15, 28, 40, 13, 40, 15];
// const filteredArray = _.uniq(array);
// console.log(`The unique elements of ${array} are ${filteredArray}.`);

/**
 * Taking user input
 * Using yargs module
 */
const yargs = require('yargs');
const notes = require('./notes');

const argv = yargs.argv;
let command = argv._[0];

if (command === 'add') {
    const note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note Added 👍🏻');
    } else {
        console.log('ERR: Duplicate Note!');
    }
}
else if (command === 'list') {
    notes.getAll();
}
else if (command === 'read') {
    notes.getNote(argv.title);
}
else if (command === 'remove') {
    const notesRemoved = notes.removeNote(argv.title);
    console.log(notesRemoved ? 'Note was removed' : 'ERR: Note not found!');
}
else {
    console.log('Command not recognied!');
}


