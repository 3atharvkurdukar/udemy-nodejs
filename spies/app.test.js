// 'rewire' is a test framework which is used to generate
// dummy calls, also known as 'Spies' in order to test 
// function calls  without needing to execute them.

const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app');


describe('App', () => {
    const db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);
    
    it('should call the spy correctly', () => {
        const spy = expect.createSpy();
        spy('Atharv');
        expect(spy).toHaveBeenCalledWith('Atharv');
    });

    it('should call saveUser with user object', () => {
        const email = 'sample@example.com';
        const password = 'password123';

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({
            email,
            password
        });
    });
});