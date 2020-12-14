const db = require('./db/db.js')

db.connect()
    .then(async function(client) {
        console.log('connect ok')

        const database = client.db('onlineAcademy');
        const collection = database.collection('category');
        const cursor = await collection.aggregate([{
                $match: {}
            },

        ])


        // const cursor = await collection.find({});
        const allValues = await cursor.toArray();
        console.log(allValues);



    })
    .catch(function(err) {
        console.log('connect failed', err)
        db.close()
    })