const genericDao = require('./generic.dao.js')
const tableName = 'course'
// const config = require('../config.json')
const config = require('../startup.js').config

async function getAll() {
    return await genericDao.getAll(tableName)
}

async function getById(id) {
    return await genericDao.getById(tableName, id)
}

// return number of created rows
async function create(item) {
    return await genericDao.create(tableName, item)
}

async function update(id, item) {
    return await genericDao.update(tableName, id, item)
}

// return number of deleted rows
async function remove(id) {
    return await genericDao.remove(tableName, id)
}

//https://github.com/ajv-validator/ajv/blob/master/docs/json-schema.md#type

var schemaCreate = {

    "type": "object",
    "properties": {
        "categoryId": {
            "type": "string",
            "minLength": config.database.idLength,
            "maxLength": config.database.idLength
        },
        "name": { "type": "string", "maxLength": 100 },
        "teacherId": {
            "type": "string",
            "minLength": config.database.idLength,
            "maxLength": config.database.idLength
        },
        "price": { "type": "number", "mininum": 0 },
        "saleOffPercent": { "type": "number", "mininum": 0, "maximum": 1 },
        "shortDescription": { "type": "string", "maxLength": 100 },
        "longDescription": { "type": "string", "maxLength": 500 },
    },
    "required": [
        "categoryId",
        "name",
        "teacherId",
        "price",
        "saleOffPercent",
        "shortDescription",
        "longDescription"
    ],
    "additionalProperties": false
}

var schemaUpdate = {

    "type": "object",
    "properties": {
        "categoryId": {
            "type": "string",
            "minLength": config.database.idLength,
            "maxLength": config.database.idLength
        },
        "name": { "type": "string", "maxLength": 100 },
        "teacherId": {
            "type": "string",
            "minLength": config.database.idLength,
            "maxLength": config.database.idLength
        },
        "price": { "type": "number", "mininum": 0 },
        "saleOffPercent": { "type": "number", "mininum": 0, "maximum": 1 },
        "shortDescription": { "type": "string", "maxLength": 100 },
        "longDescription": { "type": "string", "maxLength": 500 },
    },
    "anyOf": [
        { "required": ["categoryId"] },
        { "required": ["name"] },
        { "required": ["teacherId"] },
        { "required": ["price"] },
        { "required": ["saleOffPercent"] },
        { "required": ["shortDescription"] },
        { "required": ["longDescription"] }
    ],
    "additionalProperties": false
}



module.exports = { getAll, getById, create, update, remove, schemaCreate, schemaUpdate }