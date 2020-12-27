'use strict';
const config = require('../../server/config.json')
const utils = require('../../server/utils/utils.js')

module.exports = function(Feedback) {

  // limit: not update, not delete
  Feedback.disableRemoteMethodByName('prototype.patchAttributes')
  Feedback.disableRemoteMethodByName('deleteById')


  // validate type in range of config.database.type
  let type = config.custom.database.feedback.type
  let typeArr = Object.values(type)
  console.log(typeArr)
  Feedback.validatesInclusionOf('type', { in: typeArr, message: 'type is not allowed' })


  // validate point in range of config.database.type
  let pointArr = config.custom.database.feedback.ratePoint
  console.log(pointArr)
  Feedback.validatesInclusionOf('ratePoint', { in: pointArr, message: 'rate point is not allowed' })




  // middleware
  Feedback.beforeRemote('**', async function(context) {
    console.log('Feedback.js: beforeRemote all')
    console.log(context.methodString)

    // pass all with find/findbyid
    if (context.methodString == 'feedback.find' ||
      context.methodString == 'feedback.findById') {
      return
    }

    // check access token
    try {
      const token = context.req.get('x-access-token')
      const decoded = await utils.verifyJWT(token, "abcdef")

      // pass all with admin
      if (decoded.userType == config.custom.database.feedback.type.admin) {
        return
      }

      // user is now teacher or student

      // allow create when authenticated
      if (context.methodString == 'feedback.create' &&
        context.req.body.accountId == decoded.userId) {
        return // pass
      }


      throw { 'error': 'not authorized' }

    } catch (err) {
      console.log(err)
      throw err
    }

  })

};
