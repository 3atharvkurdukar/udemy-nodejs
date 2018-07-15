const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost', (err, client) => {
    if (err) {
        return console.log('Unable to connect to  MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to insert todo', err);
    });

    db.collection('Todos').find({completed: false}).count().then((count) => {
        console.log(`${count} incomplete todos`);
    }, (err) => {
        console.log('Unable to insert todo', err);
    });

    client.close();
});