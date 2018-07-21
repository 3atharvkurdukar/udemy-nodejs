const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost', (err, client) => {
    if (err) {
        return console.log('Unable to connect to  MongoDB server: ', err);
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');
    
    // Find one document, update it and return it in result
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b4b3280f6b899072c1ba13e')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });


    client.close();
});