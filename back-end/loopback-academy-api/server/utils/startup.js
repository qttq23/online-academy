
// config from loopback
let config = require('../config.json')

// config from me
let myConfig = require('./myConfig.json')

// also get config from database
const datasourceConfig = require('../datasources.json')
const { MongoClient } = require("mongodb");
const client = new MongoClient(datasourceConfig.mongodbDs.url)

async function start() {

  await client.connect();
  const database = client.db('onlineAcademy');
  const collection = database.collection('CONFIG');
  const cursor = await collection.find({})
  const realRes = await cursor.toArray();

  // append to config.custom
  config.custom = myConfig
  config.custom.database = realRes[0]
  console.log(config.custom.database)


};

module.exports = { start }
