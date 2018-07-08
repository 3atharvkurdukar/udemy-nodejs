/**
 * Disclaimer: The files present in playground folder have nothing to do
 * with the projects. they  are justuseful to understanf the concept.
 */

// Converting an object to string
const obj = {
    name: 'John',
    age: 23
};
const stringObj = JSON.stringify(obj);
console.log(typeof stringObj);
console.log(stringObj);

// Converting a string to JSON object
const personString = '{"name": "John", "age": 23}';
const person = JSON.parse(personString);
console.log(typeof person);
console.log(person);
