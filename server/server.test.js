const request = require('supertest');
const expect = require('expect');
const app = require('./server').app;

it('should return hello world response', (done) => {
        request(app)
        .get('/')
        .expect(200)
        .expect('Hello World')
        .end(done);
});

it('should have user info', (done) => {
    request(app)
        .get('/users')
        .expect((res) => {
            expect(res.body).toInclude({
                name: 'Atharv',
                age: 19
            });
        })
        .end(done);
});
