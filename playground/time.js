const moment = require('moment');

const date = moment();
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));

console.log(date.valueOf());