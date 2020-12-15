const genericDao = require('./generic.dao.js')
var ObjectID = require('mongodb').ObjectID
const config = require('../startup.js').config
const collectionName = 'user'


async function getAll() {
    return await genericDao.getAll(collectionName)
}

async function getById(id) {
    return await genericDao.getById(collectionName, id)
}

// return number of created rows
async function create(item) {

    // add default fields for later using
    if (item.type === undefined) {
        item.type = config.database.user.type.student
    }
    item.imageUrl = ""
    item.loginType = config.database.user.loginType.password
    item.refreshToken = ""

    return await genericDao.create(collectionName, item)
}

async function update(id, item) {
    return await genericDao.update(collectionName, id, item)
}

// return number of deleted rows
async function remove(id) {
    return await genericDao.remove(collectionName, id)
}

var schemaCreate = {

    "type": "object",
    "properties": {
        "name": { "type": "string", "maxLength": 100 },
        "email": { "type": "string", "maxLength": 100 },
        "password": { "type": "string", "minLength": 4, "maxLength": 100 },
        "description": { "type": "string", "maxLength": 100 },
        "type": { "type": "number", "mininum": 0 }
    },
    "required": [
        "name",
        "email",
        "password",
        "description"
    ],
    "additionalProperties": false
}

var schemaUpdate = {

    "type": "object",
    "properties": {
        "name": { "type": "string", "maxLength": 100 },
        "description": { "type": "string", "maxLength": 100 }
    },
    "anyOf": [
        { "required": ["name"] },
        { "required": ["description"] }
    ],
    "additionalProperties": false
}


// getByEmail(credential.email)
async function getByEmail(email) {
    let stages = [{
        $match: { "email": email }
    }]
    let result = await genericDao.aggregate(collectionName, stages)

    if (!result || result.length == 0) {
        return null
    }
    return result[0]
}

//updateRefreshToken(user.id, refreshToken) = update
async function updateRefreshToken(id, refreshToken) {
    let item = { "refreshToken": refreshToken }
    return await genericDao.update(collectionName, id, item)
}

//checkUserRefreshToken(decoded.userId, refreshToken)
async function checkUserRefreshToken(id, refreshToken) {
    let stages = [{
        $match: { $and: [{ "_id": new ObjectID(id) }, { "refreshToken": refreshToken }] }
    }]
    let result = await genericDao.aggregate(collectionName, stages)

    if (!result || result.length == 0) {
        return null
    }
    return result[0]
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    schemaCreate,
    schemaUpdate,
    getByEmail,
    updateRefreshToken,
    checkUserRefreshToken
}