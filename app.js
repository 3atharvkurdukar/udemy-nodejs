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

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .help()
    .argv;
let command = argv._[0];

switch (command) {
    case 'add':
        var note = notes.addNote(argv.title, argv.body);
        if (note) {
            console.log('Note Added 👍🏻');
            notes.logNote(note);
        } else {
            console.log('ERR: Duplicate Note!');            
        }
        break;
    case 'remove':
        const notesRemoved = notes.removeNote(argv.title);
        console.log(notesRemoved ? 'Note was removed' : 'ERR: Note not found!');
        break;
    case 'list':
        var allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} notes...`);
        allNotes.forEach(note => notes.logNote(note));
        break;
    case 'read':
        var note = notes.getNote(argv.title);
        if (note) {
            console.log('Note:');
            notes.logNote(note);
        } else {
            console.log('ERR: Note not found!');
        }
        break;

    default:
        console.log('Command not recognied!');
        break;
}

