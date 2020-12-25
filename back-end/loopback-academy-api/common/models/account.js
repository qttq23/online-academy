'use strict';
const config = require('../../server/config.json')
const utils = require('../../server/utils/utils.js')

module.exports = function(Account) {
  console.log('here1')

  // not create
  Account.disableRemoteMethodByName('create')


  addValidation(Account)

  addMethod(Account)


  // middleware
  Account.beforeRemote('**', async function(context) {
    console.log('account.js: beforeRemote all')
    console.log(context.methodString)

    // pass all with find/findbyid
    if (context.methodString == 'account.find' ||
      context.methodString == 'account.findById') {
      return
    }

    // check access token
    try {
      const token = context.req.get('x-access-token')
      const decoded = await utils.verifyJWT(token, "abcdef")

      // pass all with admin
      if (decoded.userType == config.custom.database.account.type.admin) {
        return
      }

      // user is now teacher or student
      // only allow update themselves
      if (context.methodString == 'account.prototype.patchAttributes' &&
        context.req.params.id == decoded.userId
      ) {
        return // pass
      }

      throw { 'error': 'not authorized' }

    } catch (err) {
      console.log(err)
      throw err
    }

  })



  // after find/find by id, remove password field
  // https://loopback.io/doc/en/lb3/Operation-hooks.html#loaded
  Account.observe('loaded', function(ctx, next) {
    console.log('account.js: loaded: ', ctx.data)

    let data = ctx.data
    if (Array.isArray(data)) {
      console.log('is array: ', data.length)

      for (let i = 0; i < data.length; i++) {
        data[i].password = ""

      }
    } else if (typeof data === 'object' && data !== null) {
      console.log('is object: ')
      data.password = ""
      console.log(data)
    }


    next()
  })



};


function addValidation(Account) {

  // validate type in range of config.database.type
  let type = config.custom.database.account.type
  let typeArr = Object.values(type)
  console.log(typeArr)
  Account.validatesInclusionOf('type', { in: typeArr, message: 'type is not allowed' })


  // email must format
  let format = new RegExp(config.custom.database.account.emailFormat)
  Account.validatesFormatOf('email', { with: format, message: 'email is invalid' })

  // email must unique
  Account.validatesUniquenessOf('email', { message: 'email is not unique' });

  // loginType in rage
  let loginType = config.custom.database.account.loginType
  let loginTypeArr = Object.values(loginType)
  console.log(loginTypeArr)
  Account.validatesInclusionOf('loginType', { in: loginTypeArr, message: 'login type is not allowed' })


}


function addMethod(Account) {

  // additional method
  Account.updateRefreshToken = async function(id, refreshToken) {

    let acc = await Account.findById(id)
    let result = await acc.patchAttributes({ refreshToken })
    console.log('account.js: result patchAttributes: ', result)
  }

  Account.checkUserRefreshToken = async function(id, refreshToken) {
    let accList = await Account.find({
      where: {
        and: [
          { "id": id },
          { "refreshToken": refreshToken }
        ]
      }
    })

    if (!accList || accList.length == 0) {
      return false
    }
    return true

  }

  // custom method for 'find' with password included in result
  Account.findByEmail = async function(email) {

    const datasourceConfig = require('../../server/datasources.json')
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(datasourceConfig.mongodbDs.url)

    await client.connect();
    const database = client.db('onlineAcademy');
    const collection = database.collection('account');
    const cursor = await collection.find({email: email})
    const result = await cursor.toArray();

    if(!result || result.length == 0){
      return null
    }

    // covert raw '_id' to 'id'
    let acc = result[0]
    console.log(JSON.stringify(acc))
    acc.id = acc['_id']
    delete acc['_id']

    console.log(acc)
    return acc;
  }



}
