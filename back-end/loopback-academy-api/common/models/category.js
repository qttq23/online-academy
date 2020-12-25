'use strict';
const config = require('../../server/config.json')

module.exports = function(Category) {

  // validate in range of topics
  let topicList = config.custom.database.category.topicList
  Category.validatesInclusionOf('topic', { in: topicList, message: 'topic does not exist' })
};
