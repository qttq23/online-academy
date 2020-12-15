
const router = require('express').Router()
const userDao = require('../dao/user.dao.js')
const utils = require('../utils/utils.js')
const validation = require('../middlewares/validation.mdw.js')
const config = require('../startup.js').config

module.exports = router

//POST
//email
//password
router.post('/', validation.checkEnoughCredential, async (req, res) => {

    console.log(req.body)
    let credential = req.body

    // check credentials
    let user = await userDao.getByEmail(credential.email)
    if (!user) {
        return res.status(400).json({ 'error': 'authentication failed' })
    }

    let isValid = await utils.compare(credential.password, user.password)
    if (!isValid) {
        return res.status(400).json({ 'error': 'authentication failed' })
    }

    // generate access token, refresh token
    let accessToken = await utils.signJWT(
        { 
            userId: user['_id'],
            userType: user['type'],
            refreshTokenExp: utils.getCurrentSecondsPlus(config.refreshTokenExpireIn)
        },
        config.secretKey,
        config.accessTokenExpireIn)
    let refreshToken = utils.randomString(config.refeshKeyLength)

    // save refresh token to database
    let mresult = await userDao.updateRefreshToken(user['_id'], refreshToken)
    console.log(mresult)

    // return
    res.status(200).json({
        accessToken,
        refreshToken
    })

})


// everyone
// POST
// email
// password
// name
// description
router.post('/register',
    validation.validate(userDao.schemaCreate),
    async (req, res) => {

        console.log(req.body)
        let user = req.body

        // only used for everyone to create student account
        if(user.type){
            return res.status(400).json({ 'error': 'do not include field \'type\' '})
        }

        // check if email exists
        let userAlready = await userDao.getByEmail(user.email)
        if (userAlready) {
            return res.status(400).json({ 'error': 'email already taken' })
        }

        // hash password
        user.password = await utils.hash(user.password)

        // save to db
        let result = await userDao.create(user)
        if (!result) {
            return res.status(400).json({ 'error': 'register failed' })
        }

        delete user.password
        return res.status(201).json({ user })
    })

// POST
// accessToken
// refreshToken
router.post('/refreshToken', async (req, res) => {

    console.log(req.body)
    const accessToken = req.body.accessToken
    const refreshToken = req.body.refreshToken

    // parse userId from access token
    let decoded
    try {
        decoded = await utils.verifyJWT(accessToken, config.secretKey, true)
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ error: 'access token invalid' })
    }

    // check if refresh token expired
    if(utils.isCurrentSecondsExceed(decoded.refreshTokenExp)){
        console.log('refresh token expired')
        return res.status(401).json({error: 'refresh token expired'})
    }

    // check userId vs refresh token
    let result = await userDao.checkUserRefreshToken(decoded.userId, refreshToken)
    if (!result) {
        return res.status(400).json({ error: 'refresh token not found' })
    }

    // generate new access token
    let newAccessToken = await utils.signJWT(
        { userId: decoded.userId },
        config.secretKey,
        config.accessTokenExpireIn)

    // return
    res.status(200).json({
        accessToken: newAccessToken,
        refreshToken
    })

})