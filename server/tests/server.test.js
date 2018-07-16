const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

// beforeEach((done) => {
//     Todo.remove({}).then(() => done());
// });

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Sample todo';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end(done);
            // .end((err, res) => {
            //     if (err) {
            //         return done(err);
            //     }

            //     Todo.find({text}).then((todos) => {
            //         expect(todos.length).toBe(1);
            //         expect(todos[0].text).toBe(text);
            //         done();
            //     }).catch((err)=> done(err));
            // });
    });
    // it('should not create a todo with invalid data', (done) => {
    //     request(app)
    //         .post('/todos')
    //         .send({})
    //         .expect(400)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             Todo.find().then((todos) => {
    //                 expect(todos.length).toBe(0);
    //                 done();
    //             }).catch((err)=> done(err));
    //         });
    // });
});

describe('Get /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBeGreaterThan(0);
            })
            .end(done);
    });
});