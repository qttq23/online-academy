const genericDao = require('./generic.dao.js')

async function getAll() {
    return await genericDao.getAll('category')
}

async function getById(id) {
    return await genericDao.getById('category', id)
}

// return number of created rows
async function create(item) {
    return await genericDao.create('category', item)
}

async function update(id, item) {
    return await genericDao.update('category', id, item)
}

// return number of deleted rows
async function remove(id) {
    return await genericDao.remove('category', id)
}

var schemaCreate = {

    "type": "object",
    "properties": {
        "name": { "type": "string", "maxLength": 45 },
        "topic": { "type": "string", "maxLength": 45 }
    },
    "required": ["name", "topic"],
    "additionalProperties": false
}

var schemaUpdate = {

    "type": "object",
    "properties": {
        "name": { "type": "string", "maxLength": 45 },
        "topic": { "type": "string", "maxLength": 45 }
    },
    "anyOf": [
        { "required": ["name"] },
        { "required": ["topic"] }
    ],
    "additionalProperties": false
}



module.exports = { getAll, getById, create, update, remove, schemaCreate, schemaUpdate }