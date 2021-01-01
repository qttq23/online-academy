
const Account = require('../server.js').models.account

const utils = require('../utils/utils.js')
const config = require('../config.json')




// declare
Account.remoteMethod(
  'changePassword', {
    http: { path: '/:id/newPassword', verb: 'post' },
    description: 'change password *require access token*',
    accepts: [
      { arg: 'id', type: 'string', required: true, http: { source: 'path' } },
      { arg: 'oldPassword', type: 'string', required: true, http: { source: 'form' } },
      { arg: 'newPassword', type: 'string', required: true, http: { source: 'form' } },
      { arg: 'context', type: 'object', http: { source: 'context' }, documented: false }
    ],
    returns: { root: true, type: 'Object' }
  }
);

// middleware - model/account.js

// handler
Account.changePassword = async function(id, oldPassword, newPassword, context, callback) {

  console.log('Account.js: changePassword')
  console.log(context.req.body)

  let user = await Account.findById(id)
  if (!user) {
    context.res.status(400)
    return { 'error': 'authentication failed: id not found' }
  }

  // check correct old password
  let userWithPassword = await Account.findByEmail(user.email)
  let isValid = await utils.compare(oldPassword, userWithPassword.password)
  if (!isValid) {
    context.res.status(400)
    return { 'error': 'authentication failed: wrong password' }
  }

  // hash newpassword
  newPassword = await utils.hash(newPassword)

  // save new password to db
  let result = await user.patchAttributes({'password': newPassword})

  // return
  context.res.status(200)
  return {
  	message: 'change password successfully!'
  }

}

