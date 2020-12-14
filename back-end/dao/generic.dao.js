const db = require('../db/db.js')
var ObjectID = require('mongodb').ObjectID

async function getAll(collectionName) {

    const collection = await db.getCollection(collectionName)
    const cursor = await collection.aggregate([{
        $match: {}
    }, ])
    return await cursor.toArray()
}

async function getById(collectionName, id) {

    const collection = await db.getCollection(collectionName)
    const cursor = await collection.aggregate([{
        $match: { '_id': new ObjectID(id) }
    }, ])
    return await cursor.toArray()
}

// return number of created rows
// ops: [{newItem}], insertedCount, insertedId
async function create(collectionName, item) {

    const collection = await db.getCollection(collectionName)
    return await collection.insertOne(item)
}

// modifiedCount
async function edit(collectionName, id, item) {
    const collection = await db.getCollection(collectionName)
    let updateDocument = {
    	$set: item
    }
    return await collection.updateOne({ '_id': new ObjectID(id) }, updateDocument)
}

// return number of deleted rows
// deletedCount
async function remove(collectionName, id) {
    const collection = await db.getCollection(collectionName)
    return await collection.deleteOne({ '_id': new ObjectID(id) })
}

module.exports = { getAll, getById, create, edit, remove }