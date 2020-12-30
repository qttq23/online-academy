const custom = require('../server.js').models.custom
const model = require('../utils/myModel.js')

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



