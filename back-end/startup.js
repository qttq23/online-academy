// app config
let config = require('./config.json')

// require database for auto connection
const db = require('./db/db.js')

async function start() {

    // get database config
    const collection = await db.getCollection('CONFIG')
    const cursor = await collection.aggregate([{
        $match: {}
    }, ])
    const dbConfig = await cursor.toArray()

    // merge into app config
    config.database = dbConfig[0]
    return config
}

module.exports = {start, config}

