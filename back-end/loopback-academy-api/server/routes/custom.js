const custom = require('../server.js').models.custom
const model = require('../utils/myModel.js')
const accountCourseModel = require('../server.js').models.accountCourse
const courseModel = require('../server.js').models.course

const utils = require('../utils/utils.js')
const config = require('../config.json')




custom.disableRemoteMethodByName('find');
custom.disableRemoteMethodByName('findById');
custom.disableRemoteMethodByName('create');
custom.disableRemoteMethodByName('prototype.patchAttributes');
custom.disableRemoteMethodByName('deleteById');


// declare
custom.remoteMethod(
  'getMostRegisteredCourses', {
    http: { path: '/Courses/mostRegistered', verb: 'get' },
    description: 'get the most registered courses',
    accepts: [
      { arg: 'order', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'numLimit', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'time', type: 'number', required: true, http: { source: 'query' } }
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.getMostRegisteredCourses = async function(order, numLimit, time) {

  console.log("custom.js: getMostRegisteredCourses")
  return await model.getMostRegisteredCourses(order, numLimit, time)
}




// declare
custom.remoteMethod(
  'getMostViewedCourses', {
    http: { path: '/Courses/mostViewed', verb: 'get' },
    description: 'get the most viewed courses',
    accepts: [
      { arg: 'order', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'numLimit', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'time', type: 'number', required: true, http: { source: 'query' } }
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.getMostViewedCourses = async function(order, numLimit, time) {

  console.log("custom.js: getMostViewedCourses")
  return await model.getMostViewedCourses(order, numLimit, time)
}



// declare
custom.remoteMethod(
  'getNewestCourses', {
    http: { path: '/Courses/Newest', verb: 'get' },
    description: 'get the newest courses',
    accepts: [
      { arg: 'order', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'numLimit', type: 'number', required: true, http: { source: 'query' } }
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.getNewestCourses = async function(order, numLimit) {

  console.log("custom.js: getNewestCourses")
  return await model.getNewestCourses(order, numLimit)
}



// declare
custom.remoteMethod(
  'getMostRegisteredCategories', {
    http: { path: '/Categories/MostRegistered', verb: 'get' },
    description: 'get the most registerd CATEGORY',
    accepts: [
      { arg: 'order', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'numLimit', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'time', type: 'number', required: true, http: { source: 'query' } }
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.getMostRegisteredCategories = async function(order, numLimit, time) {

  console.log("custom.js: getMostRegisteredCategories")
  return await model.getMostRegisteredCategories(order, numLimit, time)
}



// declare
custom.remoteMethod(
  'updateNumView', {
    http: { path: '/Courses/:courseId/view', verb: 'post' },
    description: 'increase number of view of a course',
    accepts: [
      { arg: 'courseId', type: 'string', required: true, http: { source: 'path' } },
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.updateNumView = async function(courseId) {

  console.log("custom.js: updateNumView")
  return await model.updateNumView(courseId)
}



// declare
custom.remoteMethod(
  'getCourseByCategoryTopic', {
    http: { path: '/Courses/ByTopic', verb: 'get' },
    description: 'get list of courses by topic',
    accepts: [
      { arg: 'topic', type: 'string', required: true, http: { source: 'query' } },
      { arg: 'numLimit', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'numSkip', type: 'number', required: true, http: { source: 'query' } },
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.getCourseByCategoryTopic = async function(topic, numLimit, numSkip) {

  console.log("custom.js: getCourseByCategoryTopic")
  return await model.getCourseByCategoryTopic(topic, numLimit, numSkip)
}



// declare
custom.remoteMethod(
  'getCourseByCategoryId', {
    http: { path: '/Courses/ByCategoryId', verb: 'get' },
    description: 'get list of courses by category id',
    accepts: [
      { arg: 'categoryId', type: 'string', required: true, http: { source: 'query' } },
      { arg: 'numLimit', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'numSkip', type: 'number', required: true, http: { source: 'query' } },
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.getCourseByCategoryId = async function(categoryId, numLimit, numSkip) {

  console.log("custom.js: getCourseByCategoryId")
  return await model.getCourseByCategoryId(categoryId, numLimit, numSkip)
}



// declare
custom.remoteMethod(
  'searchCourse', {
    http: { path: '/Courses/search', verb: 'get' },
    description: 'get list of courses by search keyword. fields: "name,category.name,category.topic"',
    accepts: [
      { arg: 'keyword', type: 'string', required: true, http: { source: 'query' } },
      { arg: 'fields', type: 'string', required: true, http: { source: 'query' } },
      { arg: 'numLimit', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'numSkip', type: 'number', required: true, http: { source: 'query' } },
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.searchCourse = async function(keyword, fields, numLimit, numSkip) {

  console.log("custom.js: searchCourse: " + fields)
  let listFields = fields.split(',')
  return await model.searchCourse(keyword, listFields, numLimit, numSkip)
}



// declare
custom.remoteMethod(
  'getCourseById', {
    http: { path: '/Courses/ById/:courseId', verb: 'get' },
    description: 'get list of courses by id. return more details about: category, teacher, rate,...',
    accepts: [
      { arg: 'courseId', type: 'string', required: true, http: { source: 'path' } },
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.getCourseById = async function(courseId) {

  console.log("custom.js: getCourseById: " + courseId)
  return await model.getCourseById(courseId)
}




// declare
custom.remoteMethod(
  'getRelatedCourses', {
    http: { path: '/Courses/:courseId/related', verb: 'get' },
    description: 'get list of related (same category & most-registerd) courses of the course specified by courseId',
    accepts: [
      { arg: 'courseId', type: 'string', required: true, http: { source: 'path' } },
      { arg: 'numLimit', type: 'number', required: true, http: { source: 'query' } }
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.getRelatedCourses = async function(courseId, numLimit) {

  console.log("custom.js: getRelatedCourses: " + courseId)

  let course = await model.getCourseById(courseId)
  return await model.getRelatedCourses(course.categoryId, courseId, numLimit, -1)
}


// 1.1
// lay danh sach linh vuc
// get /api/categories


// **include:  all chapter + number of videos
// /api/courses?filter={"include": { "relation": "chapters",  "scope":  { "include": "videos"}  }, "where": {"id": "5fd4ec944ec3a2471437e2c2"}  }


// ** include feedback: type = comment
// /api/feedbacks?filter={ "where": {"and": [ {"courseId": "5fd4ec944ec3a2471437e2c2"},  {"type": 1} ] }  }



// 2.1 
// post /api/watchLists/
// header: x-acess-token

// 2.2
// update: emai, hoten
// patch /api/accounts/id

// update: password
// post /api/accounts/:id/newPassword


// xem watchlist:
// get /api/watchlists/?filter={"where": {"accountId": "5fd8ec51ca983a3740c1c711"} }


// loai bo course khoi watchlist:
// get /api/watchlists/?filter={"where":  {"and": [ {"accountId": "5fd8ec51ca983a3740c1c711"} ,{"courseId": "5fe5e7d8d2bf305f580862ec"}] }}

// -> get id of watcthlist

// delete /api/watchlists/id


// xem register list:
// get /api/accountCourses/?filter={"where": { "accountId": "5fd8ec51ca983a3740c1c711" } }

// 2.3

// tham gia:
// post /api/accountCourse

// luu trang thai video:
// patch /api/seenvideos/id
// {
//   "pausedAt": ""
// }


// 2.4
// post /api/feedbacks
// *token*


// 2.5
// get video from firebase storage
// get /api/storage/token
// get video url: /api/videos/id
// put url to a video element
// .............implement front-end react?????


// get preview
// get video url: /api/videos/id with order = 1, 2, 3
// ...................implement front-end react?????


// 3.1
// post /api/courses


// post video to firebase storage
// get /api/storage/token
// resolve filename = num videos in chapter + 1
// upload to storage, then update videoUrl in db
// ................implement front-end react?????


// 3.2 
// cap nhat thong tin khoa hoc & danh dau hoan thanh:
// patch /api/courses/:id


// them & cap nhat chuong:
// post /api/chapters


// patch /api/chapters/id


// 3.3
// quan ly ho so ca nhan:
// patch api/accounts/id
// {
//   "desciption": ""
// }


// xem danh sach khoa hoc giảng dạy:
// get /api/courses/?filter={"where": {"teacherId": "sdfsdklfjsdl"}}



// 4.1
// /api/categories


// 4.2
// /api/courses

// 4.3
// /api/accounts

// dang ky tai khoan cho teacher:
// /api/auth/register


// 5.1

// login with google???
// .................????????????


// 6.2
// sample data??????????
// .............???????????????????/



// declare
custom.remoteMethod(
  'getStorageToken', {
    http: { path: '/storage/token', verb: 'get' },
    description: 'get token to download/upload video based on your role. *include access token in header*',
    accepts: [
      { arg: 'context', type: 'object', http: { source: 'context' }, documented: false }
    ],
    returns: { root: true, type: 'Object' }
  }
);


// handler
custom.getStorageToken = async function(context) {

  console.log("custom.js: getStorageToken: ")

  // check access token
  let decoded
  try {
    const token = context.req.get('x-access-token')
    decoded = await utils.verifyJWT(token, "abcdef")

  } catch (err) {
    console.log(err)

    context.res.status(400)
    return { 'error': err }
  }


  // user now already logged in

  let listName = 'empty'
  let listCourseId = []
  if (decoded.userType == config.custom.database.account.type.student) {

    // get list of courses they studied
    const listAccountCourses = await accountCourseModel.find({ "where": { "accountId": decoded.userId } })
    listCourseId = listAccountCourses.map(function(item) {
      return item.courseId
    })
    listName = 'listStudy'

  } else if (decoded.userType == config.custom.database.account.type.teacher) {

    // get list of courses they taught
    const listCourses = await courseModel.find({ "where": { "teacherId": decoded.userId } })
    listCourseId = listCourses.map(function(item) {
      return item.id
    })
    listName = 'listTeach'
  }

  console.log(listCourseId)

  // create firebase token
  const uid = decoded.userId;
  const additionalClaims = {}
  additionalClaims[listName] = listCourseId

  try {
    const readToken = await utils.signJWTFirebase(uid, additionalClaims)

    // Send token back to client
    context.res.status(200)
    return { readToken }

  } catch (error) {

    context.res.status(400)
    return { 'error': error }
  }

}




// // declare
// custom.remoteMethod(
//   'getWriteToken', {
//     http: { path: '/token/write', verb: 'get' },
//     description: 'get token to upload video. *include access token in header*',
//     accepts: [
//       { arg: 'context', type: 'object', http: { source: 'context' }, documented: false }
//     ],
//     returns: { root: true, type: 'Object' }
//   }
// );


// // handler
// custom.getWriteToken = async function(context) {

//   console.log("custom.js: getWriteToken: ")

//   // check access token
//   let decoded
//   try {
//     const token = context.req.get('x-access-token')
//     decoded = await utils.verifyJWT(token, "abcdef")

//   } catch (err) {
//     console.log(err)

//     context.res.status(400)
//     return { 'error': err }
//   }


//   // user now already logged in

//   // get list of courses they taught
//   const listCourses = await courseModel.find({ "where": { "teacherId": decoded.userId } })
//   const listCourseId = listCourses.map(function(item) {
//     return item.id
//   })
//   console.log(listCourseId)



//   // create firebase token
//   const uid = decoded.userId;
//   const additionalClaims = {
//     "listTeach": listCourseId
//   };

//   try {
//     const writeToken = await utils.signJWTFirebase(uid, additionalClaims)

//     // Send token back to client
//     context.res.status(200)
//     return { writeToken }

//   } catch (error) {

//     context.res.status(400)
//     return { 'error': error }
//   }

// }
