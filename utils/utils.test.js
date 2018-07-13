// mocha is a javaScript test framework built to easily test the code
// It makes testing much easier

const utils = require('./utils');

it('should add two numbers', () => {
    const res = utils.add(33, 11);

    if (res != 44) {
        throw new Error(`Expected 44, but got ${res}`);
    }
});

it('should square a number', () => {
    const res = utils.square(18);

    if (res != 324) {
        throw new Error(`Expected 324, but got ${res}`);
    }
});