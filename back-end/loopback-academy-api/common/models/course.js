'use strict';
const config = require('../../server/config.json')
const utils = require('../../server/utils/utils.js')


module.exports = function(Course) {

  Course.validate('price',
    function(err) {

      if (this.price < 0) {
        err()
      }

    }, { message: 'invalid price' }
  )

  Course.validate('saleOffPercent',
    function(err) {

      if (this.saleOffPercent < 0) {
        err()
      }

    }, { message: 'invalid saleOffPercent' }
  )

  // validate belongs to category id


  // validate belongs to teacher id


  // authorize

  // middleware
  Course.beforeRemote('**', async function(context) {
    console.log('course.js: beforeRemote all')
    console.log(context.methodString)

    // pass all with find/findbyid
    if (context.methodString == 'course.find' ||
      context.methodString == 'course.findById') {
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

      // teacher can create
      if (context.methodString == 'course.create' &&
        decoded.userType == config.custom.database.account.type.teacher) {

        if (context.req.body.teacherId == decoded.userId) {
          return // pass

        }
      }

      // teacher can only update/delete their courses
      if (
        (context.methodString == 'course.prototype.patchAttributes' ||
          context.methodString == 'course.deleteById') &&
        decoded.userType == config.custom.database.account.type.teacher
      ) {

        let courseId = context.req.params.id
        console.log(courseId)
        let courseList = await Course.find({ "where": { "id": courseId } })

        if (courseList[0].teacherId == decoded.userId) {

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
