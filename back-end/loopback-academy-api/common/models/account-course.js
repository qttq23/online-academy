'use strict';

const config = require('../../server/config.json')
const utils = require('../../server/utils/utils.js')

module.exports = function(Accountcourse) {

  // validate account id belongs


  // validate accountCourse id belongs


  // middleware
  Accountcourse.beforeRemote('**', async function(context) {
    console.log('accountCourse.js: beforeRemote all')
    console.log(context.methodString)

    // pass all with find/findbyid
    if (context.methodString == 'accountCourse.find' ||
      context.methodString == 'accountCourse.findById') {
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

      // can create
      if (context.methodString == 'accountCourse.create') {

      	console.log('create')
      	console.log(context.req.body.accountId)
      	console.log(decoded.userId)
        if (context.req.body.accountId == decoded.userId) {

          return // pass

        }
      }

      // can delete
      // cannot update
      if (context.methodString == 'accountCourse.deleteById') {

      	let result = await Accountcourse.findById(context.req.params.id)
        if (result.accountId == decoded.userId) {
          return // pass
        }
      }


      // student or unauthorized teacher will be not allowed
      throw { 'error': 'not authorized' }

    } catch (err) {
      console.log(err)
      throw err
    }

  })

};
