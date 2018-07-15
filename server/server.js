// 'mongoose' is a MongoDB based module that allows faster,
// simpler and much easier database connectivity 

const mongoose = require('mongoose');

// By default, mongoose uses Third-party promises.
// So, we can make sure it uses deafult ES6 promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// mongoose generates a DB model for validating the input
const Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// The generator passed to it is  used to add element
const newTodo = new Todo({
    text: 'Pack luggage',
    completed: true,
    completedAt: 123456
});

// save() method sends the data to the database
newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (err) => {
    console.log('Unable to save todo', err);
});