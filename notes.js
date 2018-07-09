// module.exports.addNote = () => {
//     console.log('New Note');
//     return 'New Note';
// };

// module.exports.add  = (a, b) => a + b;
const fs = require('fs');

const addNote = (title, body) => {
    let notes = [];
    const note= {
        title, 
        body
    };

    try {
        notes = JSON.parse(fs.readFileSync('notes-data.json'));
    } catch (error) {
        
    }

    const duplicateNotes = notes.filter(note => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    } else {
        console.log('ERR: Duplicate Note!');
    }
};

const getAll = () => {
    
};

const getNote = () => {

};

const removeNote = () => {

};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}

