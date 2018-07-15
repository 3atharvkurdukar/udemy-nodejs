// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost', (err, client) => {
    if (err) {
        return console.log('Unable to connect to  MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');
    db.collection('Todos').insertOne({
        text: 'Something else',
        completed: true
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        //  _id is an automatically generated field with built-in timestamp
        // getTimestamp() can be used to return Date object of _id
        console.log(result.ops[0]._id.getTimestamp());
    });

    // We can generate our own IDs using ObjectID class
    const obj = new ObjectID();
    console.log(obj);

    client.close();
});