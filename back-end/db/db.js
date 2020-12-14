const { MongoClient } = require("mongodb")
const uri = require('../config.json').connectionString

var myClient = null


async function connect() {

    console.log('connecting to database...')
    myClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    await myClient.connect()

    // close on exit events
    const events = [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`, `SIGKILL`]
    events.forEach((eventType) => {
        process.on(eventType, close.bind(null, eventType))
    })

    console.log('connect ok2')
    return myClient
}

function close(eventType) {
    console.log('closing connection ', eventType)

    if (myClient != null) {
        myClient.close()
    }

    // IMPORTANT: close server, if eventtype == ctrl + C
    process.exit()
}



async function getCollection(collectionName) {

    let client = await connectPromise
    return client.db('onlineAcademy').collection(collectionName)
}



var connectPromise = connect()

module.exports = { getCollection }

