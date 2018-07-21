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
    // Delete multiple documents
    // db.collection('Todos').deleteMany({
    //     text: "Something else"
    // }).then((result) => {
    //     console.log(result);
    // });

    // Delete one document
    // db.collection('Todos').deleteOne({
    //     text: "Finish tutorials"
    // }).then((result) => {
    //     console.log(result);
    // });

    // Find one document, delete it and return it in result
    db.collection('Todos').findOneAndDelete({
        text: "Something else"
    }).then((result) => {
        console.log(result);
    });


    client.close();
});