require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

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

    newTodo.save().then((todo) => {
        res.send({todo});
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
            res.send({todo});
        }
        else {
            res.status(404).send();
        }
    }, (err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(400).send({
            error: 'Invalid ID'
        });
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo) {
            res.send({todo});
        } else {
            res.status(404).send();
        }
    }, (err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);   // allows user to just change completed
    if (!ObjectID.isValid(id)) {
        res.status(400).send({
            error: 'Invalid ID'
        });
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed =false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (todo) {
            res.send({todo});
        } else {
            res.status(404).send();
        }
    }, (err) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then(() => {
        const token = user.generateAuthToken();
        return token;
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send();
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((err) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

module.exports = {
    app
};
