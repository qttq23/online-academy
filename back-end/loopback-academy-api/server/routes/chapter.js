const Chapter = require('../server.js').models.chapter
const courseModel = require('../server.js').models.course

const utils = require('../utils/utils.js')
const config = require('../config.json')


// middleware

Chapter.beforeRemote('**', async function(context) {
  console.log('chapter.js: beforeRemote all')
  console.log(context.methodString)

  // pass all with find/findbyid
  if (context.methodString == 'chapter.find' ||
    context.methodString == 'chapter.findById') {
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

    // allow teacher create
    if (context.methodString == 'chapter.create' &&
      decoded.userType == config.custom.database.account.type.teacher
    ) {

      let courseId = context.req.body.courseId
      let teacherId = decoded.userId
      console.log(courseId)
      let courseList = await courseModel.find({
        "where": { and: [{ "id": courseId }, { "teacherId": teacherId }] }
      })

      if (courseList && courseList.length > 0) {
        return // pass
      }
    }

    // allow teacher only update/delete their course
    if ((context.methodString == 'chapter.prototype.patchAttributes' ||
        context.methodString == 'chapter.deleteById') &&
      decoded.userType == config.custom.database.account.type.teacher
    ) {

      let chapterId = context.req.params.id
      let teacherId = decoded.userId
      console.log(chapterId)
      let chapterList = await Chapter.find({
        "where": { "id": chapterId },
        "include": {
          "relation": "course",
          "scope": {
            "where": { "teacherId": teacherId }
          }
        }
      })
      console.log(chapterList)


      if (chapterList && chapterList.length > 0) {

        // a field may include functions, so convert to json to check if field exists
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
