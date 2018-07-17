const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
// const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// body-parser converts a received JSON request into object
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center">Welcome to TODO API</h1>');
});

app.post('/todos', (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
    });

    newTodo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(400).send({
            error: 'Invalid ID'
        });
    }
    Todo.findById(id).then((todo) => {
        if (todo) {
            res.send(todo);
        }
        else {
            res.status(404).send();
        }
    }, (err) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

module.exports = {
    app
};
