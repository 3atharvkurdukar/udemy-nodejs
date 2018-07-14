// 'mocha' is a JavaScript test framework built to easily test the code
// It makes testing much easier

// 'expect' is a JavaScript assertion library used for generating automatic errors
// based on the conditions expected.

const expect = require('expect');
const utils = require('./utils');

it('should add two numbers', () => {
    const res = utils.add(33, 11);
    expect(res).toBe(44).toBeA('number');

    // if (res != 44) {
    //     throw new Error(`Expected 44, but got ${res}`);
    // }
});

it('should square a number', () => {
    const res = utils.square(18);
    expect(res).toBe(324).toBeA('number');

    // if (res != 324) {
    //     throw new Error(`Expected 324, but got ${res}`);
    // }
});

it('should verify first name and last name are set', () => {
    var user = {
        age: 18,
        location: 'India'
    };
    utils.setName(user, 'Atharv Kurdukar');
    expect(user).toInclude({
        firstName: 'Atharv',
        lastName: 'Kurdukar'
    }).toBeA('object');
});

it('should expect some values', () => {
    expect(12).toNotBe(11);
    expect({name: 'Andrew'}).toEqual({name: 'Andrew'}); // Similarly, toNotEqual()
    expect([2, 3, 4]).toInclude(2); // Similarly, toExclude()
    expect({
        name: 'Andrew',
        age:25,
        location: 'New York'
    }).toExclude({
        age: 23
    });
});