'use strict';
const config = require('../../server/config.json')
const utils = require('../../server/utils/utils.js')

module.exports = function(Feedback) {

  // limit: not update, not delete
  Feedback.disableRemoteMethodByName('prototype.patchAttributes')
  Feedback.disableRemoteMethodByName('deleteById')


  // validate type in range of config.database.type
  let type = config.custom.database.feedback.type
  let typeArr = Object.values(type)
  console.log(typeArr)
  Feedback.validatesInclusionOf('type', { in: typeArr, message: 'type is not allowed' })


  // validate point in range of config.database.type
  let pointArr = config.custom.database.feedback.ratePoint
  console.log(pointArr)
  Feedback.validatesInclusionOf('ratePoint', { in: pointArr, message: 'rate point is not allowed' })





};
