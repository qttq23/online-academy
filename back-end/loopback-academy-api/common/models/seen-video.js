'use strict';

const utils = require('../../server/utils/utils.js')
const config = require('../../server/config.json')

module.exports = function(Seenvideo) {



  // limit: only read, create, update
  Seenvideo.disableRemoteMethodByName('deleteById')


  // validation



  // middleware
  Seenvideo.beforeRemote('**', async function(context) {
    console.log('seenVideo.js: beforeRemote all')
    console.log(context.methodString)

    // pass all with find/findbyid
    if (context.methodString == 'seenVideo.find' ||
      context.methodString == 'seenVideo.findById') {
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

      // allow create when owner
      if (context.methodString == 'seenVideo.create' &&
        context.req.body.accountId == decoded.userId) {

        return //pass
      }

      // allow update when owner
      if (
        context.methodString == 'seenVideo.prototype.patchAttributes'
      ) {

        let seenVideoId = context.req.params.id
        let accountId = decoded.userId
        let listOfSeenVideo = await Seenvideo.find({
          "where": { "and": [{ "id": seenVideoId }, { "accountId": accountId }] }
        })

        if (listOfSeenVideo && listOfSeenVideo.length > 0) {
          return //pass
        }
      }


      throw { 'error': 'not authorized' }

    } catch (err) {
      console.log(err)
      throw err
    }

  })


};
