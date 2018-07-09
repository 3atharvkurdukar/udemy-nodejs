// module.exports.addNote = () => {
//     console.log('New Note');
//     return 'New Note';
// };

// module.exports.add  = (a, b) => a + b;
const fs = require('fs');

const fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes-data.json'))
    } catch (error) {
        return [];
    }
};

const saveNotes = (notes) => fs.writeFileSync('notes-data.json', JSON.stringify(notes));

const addNote = (title, body) => {
    let notes = [];
    const note= {
        title, 
        body
    };

    notes = fetchNotes();

    const duplicateNotes = notes.filter(note => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const getAll = () => {
    
};

const getNote = (title) => {

};

const removeNote = (title) => {
    const notes = fetchNotes();
    const newNotes = notes.filter(note => note.title !== title);
    saveNotes(newNotes);
    return (notes.length !== newNotes.length);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}

