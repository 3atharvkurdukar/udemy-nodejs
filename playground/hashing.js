// 'crypto-js' is a JavaScript module that has all security related
// methods included in it like MD5, SHA, AES, etc.
const {SHA256} = require('crypto-js');

// SHA256 is a one way hash in which it is not possible to get the original
// data back once it has been hashed.
// const message  ='I am user 3';
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// For secure communication, we use tokens,  which combine the data with the hash
// so that the data can be validated at the receiver side.
// In order to prevent rehashing data by the middle-man, we add some extra code, 
// also known as 'Private Key' to make the hash unique
// const data = {
//     id: 5
// };
// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// Man-in-the-Middle
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

//  At receiver side, the hash is recalculated.
// If it is equal, the data is intact; otherwise not!
// const resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not changed. 🔐');
// } else {
//     console.log('Data was changed. Do not trust! 🚨');
// }

// 'jsonwebtoken' is a module that automates the process of creating and 
// verifying a token using a private key.
const jwt = require('jsonwebtoken');

const data = {
    id: 10
};
console.log(`Data: ${data}`);

const token = jwt.sign(data, '123abc');
console.log(`Token: ${token}`);

const decoded = jwt.verify(token, '123abc');
console.log(`Decoded: ${decoded}`);
