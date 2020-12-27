'use strict';

module.exports = function(Myconfig) {

  Myconfig.disableRemoteMethodByName('find');
  Myconfig.disableRemoteMethodByName('findById');
  Myconfig.disableRemoteMethodByName('create');
  Myconfig.disableRemoteMethodByName('prototype.patchAttributes');
  Myconfig.disableRemoteMethodByName('deleteById');


  // declare
  Myconfig.remoteMethod(
    'getDbConfig', {
      http: { path: '/getDbConfig', verb: 'get' },
      description: 'get database config',
      accepts: [],
      returns: { root: true, type: 'Object' }
    }
  );


  // handler
  Myconfig.getDbConfig = async function() {

    const datasourceConfig = require('../../server/datasources.json')
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(datasourceConfig.mongodbDs.url)

    await client.connect();
    const database = client.db('onlineAcademy');
    const collection = database.collection('CONFIG');
    const cursor = await collection.find({})
    const realRes = await cursor.toArray();

    return realRes[0]
  }


};
