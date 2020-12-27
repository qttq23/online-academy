const Video = require('../server.js').models.video
const chapterModel = require('../server.js').models.chapter

const utils = require('../utils/utils.js')
const config = require('../config.json')


// middleware
// middleware
Video.beforeRemote('**', async function(context) {
  console.log('video.js: beforeRemote all')
  console.log(context.methodString)

  // pass all with find/findbyid
  if (context.methodString == 'video.find' ||
    context.methodString == 'video.findById') {
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

    // allow create when owner of course
    if (context.methodString == 'video.create' &&
      decoded.userType == config.custom.database.account.type.teacher
    ) {

      let chapterId = context.req.body.chapterId
      let teacherId = decoded.userId
      console.log(chapterId)
      let chapterList = await chapterModel.find({
        "where": { "id": chapterId },
        "include": {
          "relation": "course",
          "scope": {
            "where": { "teacherId": teacherId }
          }
        }
      })
      console.log(chapterList)

      // a field may include functions, so convert to json to check if field exists
      if (chapterList && chapterList.length > 0) {
        let json = JSON.stringify(chapterList[0])
        let chapterResult = JSON.parse(json);
        console.log(chapterResult)

        if (chapterResult.hasOwnProperty('course')) {
          console.log('video.js: pass create')
          return // pass
        }
      }

    }


    throw { 'error': 'not authorized' }

  } catch (err) {
    console.log(err)
    throw err
  }

})
