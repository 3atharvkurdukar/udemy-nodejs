const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, users, populateTodos, populateUsers}  = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Sample test todo';

        request(app)
            .post('/todos')
            .send({text})
            .set('x-auth', users[0].tokens[0].token).expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err)=> done(err));
            });
    });
    it('should not create a todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .set('x-auth', users[0].tokens[0].token).expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err)=> done(err));
            });
    });
});

describe('Get /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should get todo for valid id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should not return todo created by another user', (done) => {
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${(new ObjectID()).toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
    it('should return 400 if id is invalid', (done) => {
        request(app)
            .get(`/todos/123`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(400)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo for valid id', (done) => {
        const hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((err) => done(err));
            });
    });
    it('should not remove todo created by another user', (done) => {
        const hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        request(app)
            .delete(`/todos/${(new ObjectID()).toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
    it('should return 400 if id is invalid', (done) => {
        request(app)
            .delete(`/todos/123`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(400)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should complete an incomplete todo', (done) => {
        const hexId = todos[0]._id.toHexString();
        const text = 'New test 1 text';
        request(app)
            .patch(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });
    it('should not change todo created by another user', (done) => {
        const hexId = todos[0]._id.toHexString();
        const text = 'New test 1 text';
        request(app)
            .patch(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                text,
                completed: true
            })
            .expect(404)
            .end(done);
    });
    it('should incomplete a completed todo', (done) => {
        const hexId = todos[1]._id.toHexString();
        const text = 'New test 2 text';
        request(app)
            .patch(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get(`/users/me`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });
    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get(`/users/me`)
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        const email = 'example@example.com';
        const password = 'p@ssw0rd123';
        request(app)
            .post(`/users`)
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                User.findOne({email}).then((user) => {
                     expect(user).toExist();
                     expect(user.password).toNotBe(password);
                     done();
                }).catch((err) => done(err));
            });
    });
    it('should return validation error if request invalid', (done) => {
        request(app)
            .post(`/users`)
            .send({
                email: 'and',
                password: 'pass'
            })
            .expect(400)
            .end(done);
    });
    it('should not create user if email in use', (done) => {
        request(app)
            .post(`/users`)
            .send({
                email: users[0].email,
                password: users[0].password
            })
            .expect(400)
            .end(done);
    });
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post(`/users/login`)
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body.email).toBe(users[1].email);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user).toExist();
                    expect(user.tokens[1]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((err) => done(err));
            });
    });
    it('should reject invalid login', (done) => {
        request(app)
            .post(`/users/login`)
            .send({
                email: users[1].email,
                password: users[1].password + 'x'
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user).toExist();
                    expect(user.tokens.length).toBe(1);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('DELETE /users/me/token', () => {
    it('should remove auth token when logged out', (done) => {
        request(app)
            .delete(`/users/me/token`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    });
});
