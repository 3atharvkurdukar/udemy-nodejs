const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'test1@example.com',
    password: 'testpass1',
    tokens: [{
        access: 'auth',
        token: jwt.sign({id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'test2@example.com',
    password: 'testpass2'
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 1531836752884
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => {
        done();
    }).catch((err) => {
        done(err);
    });
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => {
        return done();
    }).catch((err) => {
        done(err);
    });
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};
