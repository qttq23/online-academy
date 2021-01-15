const Feedback = require('../server.js').models.feedback
const Accountcourse = require('../server.js').models.accountCourse
const utils = require('../utils/utils.js')
const config = require('../config.json')


// middleware
Feedback.beforeRemote('**', async function(context) {
  console.log('Feedback.js: beforeRemote all')
  console.log(context.methodString)

  // pass all with find/findbyid
  if (context.methodString == 'feedback.find' ||
    context.methodString == 'feedback.findById') {
    return
  }

  // insert current date
  if (context.methodString == 'feedback.create') {
    context.req.body.createdAt = new Date()
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

      let accountId = decoded.userId
      let courseId = context.req.body.courseId
      let listAccountcourses = await Accountcourse.find({
        "where": { "and": [{ "accountId": accountId }, { "courseId": courseId }] }
      })

      if (listAccountcourses && listAccountcourses.length > 0) {

        return //pass
      }

    }


    throw { 'error': 'not authorized' }

  } catch (err) {
    console.log(err)
    throw err
  }

})
