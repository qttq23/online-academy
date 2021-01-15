const Category = require('../server.js').models.category
const Course = require('../server.js').models.course
const utils = require('../utils/utils.js')
const config = require('../config.json')


// middleware
Category.beforeRemote('**', async function(context) {
  console.log('Category.js: beforeRemote all')
  console.log(context.methodString)

  // pass all with find/findbyid
  if (context.methodString == 'category.find' ||
    context.methodString == 'category.findById') {
    return
  }

  // check access token
  try {
    const token = context.req.get('x-access-token')
    const decoded = await utils.verifyJWT(token, "abcdef")

    // only admin
    if (decoded.userType == config.custom.database.account.type.admin) {

      // allow create,update
      if (context.methodString == 'category.create' ||
        context.methodString == 'category.prototype.patchAttributes'
      ) {
        return // pass
      }

      // only delete if no course
      if (context.methodString == 'category.deleteById') {

        let categoryId = context.req.params.id
        let listCourses = await Course.find({
          "where": { "categoryId": categoryId }
        })

        if (!listCourses || listCourses.length == 0) {
          return // pass
        }

      }

    }

    // student or unauthorized teacher will be not allowed
    throw { 'error': 'not authorized' }

  } catch (err) {
    console.log(err)
    throw err
  }

})
