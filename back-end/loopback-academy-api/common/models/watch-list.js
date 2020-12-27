'use strict';

const utils = require('../../server/utils/utils.js')
const config = require('../../server/config.json')

module.exports = function(Watchlist) {


  // limit: only read, create, delete
  Watchlist.disableRemoteMethodByName('prototype.patchAttributes')


  // validation



  // middleware
  Watchlist.beforeRemote('**', async function(context) {
    console.log('watchList.js: beforeRemote all')
    console.log(context.methodString)

    // pass all with find/findbyid
    if (context.methodString == 'watchList.find' ||
      context.methodString == 'watchList.findById') {
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
      if (context.methodString == 'watchList.create' &&
        context.req.body.accountId == decoded.userId) {

        return //pass
      }

      // allow delete when owner
      if (context.methodString == 'watchList.deleteById') {
        let watchListId = context.req.params.id
        let accountId = decoded.userId
        let listOfWatchList = await Watchlist.find({
          "where": { "and": [{ "id": watchListId }, { "accountId": accountId }] }
        })

        if (listOfWatchList && listOfWatchList.length > 0) {

          // console.log(listOfWatchList[0].account)
          // console.log(listOfWatchList[0].account.id)

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
