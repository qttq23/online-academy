const model = require('../server.js').models.account
const Auth = require('../server.js').models.auth
const utils = require('../utils/utils.js')
const config = require('../config.json').custom




// declare
Auth.remoteMethod(
  'login', {
    http: { path: '/login', verb: 'post' },
    description: 'login to get access token',
    accepts: [
      { arg: 'email', type: 'string', required: true, http: { source: 'form' } },
      { arg: 'password', type: 'string', required: true, http: { source: 'form' } },
      { arg: 'context', type: 'object', http: { source: 'context' }, documented: false }
    ],
    returns: { root: true, type: 'Object' }
  }
);

// middleware
Auth.beforeRemote('login', function(context, affectedInstance, next) {

  console.log('before login')
  next()

});

// handler
Auth.login = async function(email, password, context, callback) {

  console.log('Auth.js: login')
  console.log(context.req.body)

  // check credentials
  // let users = await model.find({ where: { 'email': email } })
  let user = await model.findByEmail(email)
  if (!user) {
    context.res.status(400)
    return { 'error': 'authentication failed: email not found' }
  }

  // check password
  let isValid = await utils.compare(password, user.password)
  if (!isValid) {
    context.res.status(400)
    return { 'error': 'authentication failed: wrong password' }
  }

  // generate access token, refresh token
  let accessToken = await utils.signJWT({
      userId: user.id,
      userType: user.type,
      refreshTokenExp: utils.getCurrentSecondsPlus(config.refreshTokenExpireIn)
    },
    config.secretKey,
    config.accessTokenExpireIn)
  let refreshToken = utils.randomString(config.refeshKeyLength)

  // save refresh token to database
  await model.updateRefreshToken(user.id, refreshToken)

  // return
  context.res.status(200)
  return {
    accessToken,
    refreshToken,
    accountId: user.id
  }

}


// declare
Auth.remoteMethod(
  'register', {
    http: { path: '/register', verb: 'post' },
    description: 'register new account. *creating Teacher/Admin account needs Admin token*',
    accepts: [
      { arg: 'type', type: 'number', required: true, http: { source: 'form' } },
      { arg: 'name', type: 'string', required: true, http: { source: 'form' } },
      { arg: 'email', type: 'string', required: true, http: { source: 'form' } },
      { arg: 'password', type: 'string', required: true, http: { source: 'form' } },
      { arg: 'loginType', type: 'number', required: true, http: { source: 'form' } },
      { arg: 'context', type: 'object', http: { source: 'context' }, documented: false }
    ],
    returns: { root: true, type: 'object' }
  }
);


// middleware
Auth.beforeRemote('register', async function(context, affectedInstance, next) {

  console.log('before register')

  // not allow create admin & teacher account
  if (context.req.body.type == config.database.account.type.admin ||
    context.req.body.type == config.database.account.type.teacher) {

    // check access token
    try {
      const token = context.req.get('x-access-token')
      const decoded = await utils.verifyJWT(token, "abcdef")

      // only admin
      if (!decoded.userType == config.database.account.type.admin) {
        throw { 'error': 'not authorized' }
      }


    } catch (err) {
      console.log(err)
      throw err
    }

    // console.log('not authorized')
    // context.res.status(401).json({ 'error': 'only admin privilige can create teacher/admin account' })
  }

  return // pass ok

});

// handler
Auth.register = async function(type, name, email, password, loginType, context, callback) {

  console.log('Auth.js: register')
  console.log(context.req.body)

  let user = context.req.body

  // hash password
  user.password = await utils.hash(user.password)

  // save to db
  let result = await model.create(user)
  console.log(result)
  if (!result) {
    context.res.status(400)
    return { 'error': 'register failed' }
  }

  // result.password = "" // auto remove when hook 'loaded'
  context.res.status(201)
  return result
}



// declare
Auth.remoteMethod(
  'refreshToken', {
    http: { path: '/refreshToken', verb: 'post' },
    description: 'use refresh token to get new access token',
    accepts: [
      { arg: 'accessToken', type: 'string', required: true, http: { source: 'form' } },
      { arg: 'refreshToken', type: 'string', required: true, http: { source: 'form' } },
      { arg: 'context', type: 'object', http: { source: 'context' }, documented: false }
    ],
    returns: { root: true, type: 'object' }
  }
);


// middleware
Auth.beforeRemote('refreshToken', async function(context, affectedInstance, next) {

  console.log('before refreshToken')
  // throw {'error': 'always error'}

});

// handler
Auth.refreshToken = async function(accessToken, refreshToken, context, callback) {

  console.log('Auth.js: refreshToken')
  console.log(context.req.body)

  // parse userId from access token
  let decoded
  try {
    decoded = await utils.verifyJWT(accessToken, config.secretKey, true)
  } catch (err) {
    context.res.status(400)
    return { error: 'access token invalid' }
  }

  // check if refresh token expired
  if (utils.isCurrentSecondsExceed(decoded.refreshTokenExp)) {
    console.log('refresh token expired')
    context.res.status(401)
    return { error: 'refresh token expired' }
  }

  // check userId vs refresh token
  let result = await model.checkUserRefreshToken(decoded.userId, refreshToken)
  if (!result) {
    context.res.status(400)
    return { error: 'refresh token not found' }
  }

  // generate new access token
  let newAccessToken = await utils.signJWT({ userId: decoded.userId },
    config.secretKey,
    config.accessTokenExpireIn)

  // return
  context.res.status(200)
  return {
    accessToken: newAccessToken,
    refreshToken
  }

}