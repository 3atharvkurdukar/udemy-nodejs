const {ObjectID} = require('mongodb');

const  {mongoose} = require('./../server/db/mongoose');
const  {Todo} = require('./../server/models/todo');

const id = '5b4cc202b21b6b196cab1fa0';

if (!ObjectID.isValid(id)) {
    return console.log('ID is not valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos: \n', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo: \n', todo);
});

Todo.findById(id).then((todo) => {
    console.log('Todo By ID: \n', todo);
}).catch((err) => console.log(err));
