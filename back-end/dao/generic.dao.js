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

    let result = await collection.insertOne(item)
    if (result.insertedCount <= 0) {
        return null
    }
    return result.insertedId
}

// modifiedCount
async function update(collectionName, id, item) {
    const collection = await db.getCollection(collectionName)

    let updateDocument = {
        $set: item
    }
    let result = await collection.updateOne({ '_id': new ObjectID(id) }, updateDocument)
    console.log(result)
    if (result.modifiedCount <= 0) {
        return null
    }
    return id
}

// return number of deleted rows
// deletedCount
async function remove(collectionName, id) {
    const collection = await db.getCollection(collectionName)

    let result = await collection.deleteOne({ '_id': new ObjectID(id) })
    if (result.deletedCount <= 0) {
        return null
    }
    return id
}

async function aggregate(collectionName, listStages) {
    const collection = await db.getCollection(collectionName)
    const cursor = await collection.aggregate(listStages)
    return await cursor.toArray()
}

module.exports = { getAll, getById, create, update, remove, aggregate }