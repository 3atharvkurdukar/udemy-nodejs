const {ObjectID} = require('mongodb');

const  {mongoose} = require('./../server/db/mongoose');
const  {Todo} = require('./../server/models/todo');


Todo.find({}).then((result) => {
    console.log(result);
});

const id = '5b4cc202b21b6b196cab1fa0';

if (!ObjectID.isValid(id)) {
    return console.log('ID is not valid');
}

Todo.findOneAndRemove({
    _id: id
}).then((todo) => {
    console.log('Todo Removed: \n', todo);
});

Todo.findById(id).then((todo) => {
    console.log('Todo Removed by ID: \n', todo);
}).catch((err) => console.log(err));
