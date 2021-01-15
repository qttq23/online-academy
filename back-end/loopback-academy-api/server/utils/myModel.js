
const config = require('../config.json')

const { MongoClient } = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
const datasourceConfig = require('../datasources.json')
const client = new MongoClient(datasourceConfig.mongodbDs.url)

async function connect() {
    await client.connect();
    console.log('myModel.js: connected to db')
}

async function getMostRegisteredCourses(order /*1: asc, -1: desc*/ , numCourse, time /*milliseconds*/ ) {

    const database = client.db('onlineAcademy');
    const collection = database.collection('course');


    // match current date - registered date <= 1 week
    let dateStage = {
        $match: {
            $expr: {
                $lte: [{ $subtract: ["$$NOW", "$register.registeredAt"] }, time]
            }
        }
    }
    if (!time) {
        console.log('not provide time')
        dateStage = { $match: {} }
    }

    const cursor = await collection.aggregate([

        // join accountCourse
        {
            $lookup: {
                from: "accountCourse",
                localField: "_id",
                foreignField: "courseId",
                as: "register"
            }
        },
        {
            $unwind: "$register"
        },
        // match current date - register date <= 1 week
        dateStage,


        // group by, count number of registrations
        {
            $group: {
                _id: "$_id",
                "countRegister": { $sum: 1 },
                "doc": { "$first": "$$ROOT" }
            }
        },
        {
            $replaceRoot: {
                newRoot: { $mergeObjects: [{ "countRegister": '$countRegister' }, '$doc'] }
            }
        },

        // sort
        { $sort: { "countRegister": order } },

        // limit
        { $limit: numCourse },

        // join category
        {
            $lookup: {
                from: "category",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },


        // join teacher
        {
            $lookup: {
                from: "account",
                localField: "teacherId",
                foreignField: "_id",
                as: "teacher"
            }
        },
        {
            $unwind: "$teacher"
        },
        {
            $project: { "teacher.password": 0, "register": 0 }
        },


        // join feedback to get rate point
        {
            $lookup: {
                from: "feedback",
                let: { course_id: "$_id" },
                as: "feedback",
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] },
                                    { $eq: ["$type", config.custom.database.feedback.type.rate] },
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "avgRatePoint": { $avg: "$ratePoint" },
                            "timesRate": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$feedback",
                "preserveNullAndEmptyArrays": true
            }
        },


        {
            $addFields: { "id": "$_id"}
        }

    ]);


    const allValues = await cursor.toArray();
    // console.log(JSON.stringify(allValues, null, 4));
    return allValues
}


async function getMostViewedCourses(order /*1: asc, -1: desc*/ , numCourse, time /*milliseconds*/ ) {

    const database = client.db('onlineAcademy');
    const collection = database.collection('course');


    // match current date - created date <= 1 week
    let dateStage = {
        $match: {
            $expr: {
                $lte: [{ $subtract: ["$$NOW", "$createdAt"] }, time]
            }
        }
    }
    if (!time) {
        console.log('not provide time')
        dateStage = { $match: {} }
    }

    const cursor = await collection.aggregate([


        dateStage,

        // sort
        { $sort: { "numView": order } },

        // limit
        { $limit: numCourse },

        // join accountCourse to get num registrations
        {
            $lookup: {
                from: "accountCourse",
                as: "register",
                let: { course_id: "$_id" },
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] }
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "count": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$register",
                "preserveNullAndEmptyArrays": true
            }
        },

        // join category
        {
            $lookup: {
                from: "category",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },


        // join teacher
        {
            $lookup: {
                from: "account",
                localField: "teacherId",
                foreignField: "_id",
                as: "teacher"
            }
        },
        {
            $unwind: "$teacher"
        },
        {
            $project: { "teacher.password": 0 }
        },


        // join feedback to get rate point
        {
            $lookup: {
                from: "feedback",
                let: { course_id: "$_id" },
                as: "feedback",
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] },
                                    { $eq: ["$type", config.custom.database.feedback.type.rate] },
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "avgRatePoint": { $avg: "$ratePoint" },
                            "timesRate": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$feedback",
                "preserveNullAndEmptyArrays": true
            }
        },


        {
            $addFields: { "id": "$_id"}
        }

    ]);


    const allValues = await cursor.toArray();
    // console.log(JSON.stringify(allValues, null, 4));
    return allValues
}

async function getNewestCourses(order /*1: asc, -1: desc*/ , numCourse) {

    const database = client.db('onlineAcademy');
    const collection = database.collection('course');


    const cursor = await collection.aggregate([


        // sort
        { $sort: { "createdAt": order } },

        // limit
        { $limit: numCourse },

        // join accountCourse to get num registrations
        {
            $lookup: {
                from: "accountCourse",
                as: "register",
                let: { course_id: "$_id" },
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] }
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "count": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$register",
                "preserveNullAndEmptyArrays": true
            }
        },

        // join category
        {
            $lookup: {
                from: "category",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },


        // join teacher
        {
            $lookup: {
                from: "account",
                localField: "teacherId",
                foreignField: "_id",
                as: "teacher"
            }
        },
        {
            $unwind: "$teacher"
        },
        {
            $project: { "teacher.password": 0 }
        },


        // join feedback to get rate point
        {
            $lookup: {
                from: "feedback",
                let: { course_id: "$_id" },
                as: "feedback",
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] },
                                    { $eq: ["$type", config.custom.database.feedback.type.rate] },
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "avgRatePoint": { $avg: "$ratePoint" },
                            "timesRate": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$feedback",
                "preserveNullAndEmptyArrays": true
            }
        },

        {
            $addFields: { "id": "$_id"}
        }


    ]);


    const allValues = await cursor.toArray();
    // console.log(JSON.stringify(allValues, null, 4));
    return allValues
}

async function getMostRegisteredCategories(order /*1: asc, -1: desc*/ , numCategory, time /*milliseconds*/ ) {

    const database = client.db('onlineAcademy');
    const collection = database.collection('category');


    // match current date - registered date <= 1 week
    let dateStage = {
        $match: {
            $expr: {
                $lte: [{ $subtract: ["$$NOW", "$register.registeredAt"] }, time]
            }
        }
    }
    if (!time) {
        console.log('not provide time')
        dateStage = { $match: {} }
    }

    const cursor = await collection.aggregate([

        // join Course
        {
            $lookup: {
                from: "course",
                localField: "_id",
                foreignField: "categoryId",
                as: "course"
            }
        },
        {
            $unwind: "$course"
        },

        // join accountCourse
        {
            $lookup: {
                from: "accountCourse",
                localField: "course._id",
                foreignField: "courseId",
                as: "register"
            }
        },
        {
            $unwind: "$register"
        },

        // match current date - register date <= 1 week
        dateStage,


        // group by, count number of registrations
        {
            $group: {
                _id: "$_id",
                "countRegister": { $sum: 1 },
                "doc": { "$first": "$$ROOT" }
            }
        },
        {
            $replaceRoot: {
                newRoot: { $mergeObjects: [{ "countRegister": '$countRegister' }, '$doc'] }
            }
        },

        // sort
        { $sort: { "countRegister": order } },

        // limit
        { $limit: numCategory },





        {
            $project: { "course": 0, "register": 0 }
        },



        {
            $addFields: { "id": "$_id"}
        }



    ]);


    const allValues = await cursor.toArray();
    // console.log(JSON.stringify(allValues, null, 4));
    return allValues
}

async function updateNumView(courseId, numToIncrease = 1) {

    const database = client.db('onlineAcademy');
    const collection = database.collection('course');

    let result = await collection.update({ "_id": new ObjectID(courseId) }, { $inc: { "numView": numToIncrease } })
    return result.result
}

// used internal
async function getCourseByCategory(query, numCourse, numSkip) {

    const database = client.db('onlineAcademy');
    const collection = database.collection('category');



    const cursor = await collection.aggregate([

        // match topic/name
        {
            $match: query
        },

        // join Course
        {
            $lookup: {
                from: "course",
                localField: "_id",
                foreignField: "categoryId",
                as: "course"
            }
        },
        {
            $unwind: "$course"
        },

        // limit, skip
        { $limit: numCourse },
        { $skip: numSkip },

        // keep only course info, discard category info, will retrieve it later
        {
            $replaceRoot: {
                newRoot: "$course"
            }
        },



        // related info

        // join accountCourse to get num registrations
        {
            $lookup: {
                from: "accountCourse",
                as: "register",
                let: { course_id: "$_id" },
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] }
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "count": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$register",
                "preserveNullAndEmptyArrays": true
            }
        },

        // join category
        {
            $lookup: {
                from: "category",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },


        // join teacher
        {
            $lookup: {
                from: "account",
                localField: "teacherId",
                foreignField: "_id",
                as: "teacher"
            }
        },
        {
            $unwind: "$teacher"
        },
        {
            $project: { "teacher.password": 0 }
        },


        // join feedback to get rate point
        {
            $lookup: {
                from: "feedback",
                let: { course_id: "$_id" },
                as: "feedback",
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] },
                                    { $eq: ["$type", config.custom.database.feedback.type.rate] },
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "avgRatePoint": { $avg: "$ratePoint" },
                            "timesRate": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$feedback",
                "preserveNullAndEmptyArrays": true
            }
        },
        {
            $addFields: { "id": "$_id"}
        }


    ]);


    const allValues = await cursor.toArray();
    return allValues
}

async function getCourseByCategoryTopic(topicName, numCourse, numSkip) {
    return await getCourseByCategory({ "topic": topicName }, numCourse, numSkip)
}

async function getCourseByCategoryId(idString, numCourse, numSkip) {
    return await getCourseByCategory({ "_id": new ObjectID(idString) }, numCourse, numSkip)
}

async function searchCourse(keySearch, listFieldsToSearchOn, numCourse, numSkip) {

    const database = client.db('onlineAcademy');
    const collection = database.collection('course');


    // split key search, 'how    are you today?' => ['how', 'are', 'you', 'today?']
    let listWords = keySearch.split(/\s+/);

    // build regex
    let keySearchRegex = ''
    listWords.forEach(function(word) {
        keySearchRegex += word + '|'
    })
    // delete last word -> 'how|are|you|today?'
    keySearchRegex = keySearchRegex.substring(0, keySearchRegex.length - 1)
    keySearchRegex = new RegExp(keySearchRegex, "i");



    // build query
    let listOrCondition = listFieldsToSearchOn.map(function(field) {
        let temp = {}
        temp[field] = keySearchRegex
        return temp
    })
    const query = {
        $or: listOrCondition
    }
    console.log(query)


    const cursor = await collection.aggregate([



        // join category
        {
            $lookup: {
                from: "category",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },

        // apply key search
        {
            $match: query
        },


        // limit, skip
        { $limit: numCourse },
        { $skip: numSkip },



        // join accountCourse to get num registrations
        {
            $lookup: {
                from: "accountCourse",
                as: "register",
                let: { course_id: "$_id" },
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] }
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "count": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$register",
                "preserveNullAndEmptyArrays": true
            }
        },


        // join teacher
        {
            $lookup: {
                from: "account",
                localField: "teacherId",
                foreignField: "_id",
                as: "teacher"
            }
        },
        {
            $unwind: "$teacher"
        },
        {
            $project: { "teacher.password": 0 }
        },


        // join feedback to get rate point
        {
            $lookup: {
                from: "feedback",
                let: { course_id: "$_id" },
                as: "feedback",
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] },
                                    { $eq: ["$type", config.custom.database.feedback.type.rate] },
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "avgRatePoint": { $avg: "$ratePoint" },
                            "timesRate": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$feedback",
                "preserveNullAndEmptyArrays": true
            }
        },

        {
            $addFields: { "id": "$_id"}
        }


    ]);


    const allValues = await cursor.toArray();
    // console.log(JSON.stringify(allValues, null, 4));
    return allValues

    // output list of course details
}

async function getCourseById(courseId) {

    const database = client.db('onlineAcademy');
    const collection = database.collection('course');


    const cursor = await collection.aggregate([


        {
            $match: { "_id": new ObjectID(courseId) }
        },


        // join accountCourse to get num registrations
        {
            $lookup: {
                from: "accountCourse",
                as: "register",
                let: { course_id: "$_id" },
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] }
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "count": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$register",
                "preserveNullAndEmptyArrays": true
            }
        },

        // join category
        {
            $lookup: {
                from: "category",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },


        // join teacher
        {
            $lookup: {
                from: "account",
                localField: "teacherId",
                foreignField: "_id",
                as: "teacher"
            }
        },
        {
            $unwind: "$teacher"
        },
        {
            $project: { "teacher.password": 0 }
        },


        // join feedback to get rate point
        {
            $lookup: {
                from: "feedback",
                let: { course_id: "$_id" },
                as: "feedback",
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] },
                                    { $eq: ["$type", config.custom.database.feedback.type.rate] },
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "avgRatePoint": { $avg: "$ratePoint" },
                            "timesRate": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$feedback",
                "preserveNullAndEmptyArrays": true
            }
        },

        {
            $addFields: { "id": "$_id"}
        }


    ]);


    const allValues = await cursor.toArray();
    if(!allValues || allValues.length < 1){
        return null
    }
    return allValues[0]

}

async function getRelatedCourses(categoryId, courseIdToExcept, numCourse, order) {

    const database = client.db('onlineAcademy');
    const collection = database.collection('category');



    const cursor = await collection.aggregate([

        // match topic/name
        {
            $match: { "_id": new ObjectID(categoryId) }
        },

        // join Course
        {
            $lookup: {
                from: "course",
                localField: "_id",
                foreignField: "categoryId",
                as: "course"
            }
        },
        {
            $unwind: "$course"
        },

        // != id of course excepted
        {
            $match: {
                "course._id": { $ne: new ObjectID(courseIdToExcept) }
            }
        },



        // keep only course info, discard category info, will retrieve it later
        {
            $replaceRoot: {
                newRoot: "$course"
            }
        },


        // join accountCourse to get num registrations
        {
            $lookup: {
                from: "accountCourse",
                as: "register",
                let: { course_id: "$_id" },
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] }
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "count": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$register",
                "preserveNullAndEmptyArrays": true
            }
        },

        // sort
        { $sort: { "register.count": order } },


        // limit
        { $limit: numCourse },



        // related info

        // join category
        {
            $lookup: {
                from: "category",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },


        // join teacher
        {
            $lookup: {
                from: "account",
                localField: "teacherId",
                foreignField: "_id",
                as: "teacher"
            }
        },
        {
            $unwind: "$teacher"
        },
        {
            $project: { "teacher.password": 0 }
        },


        // join feedback to get rate point
        {
            $lookup: {
                from: "feedback",
                let: { course_id: "$_id" },
                as: "feedback",
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$courseId", "$$course_id"] },
                                    { $eq: ["$type", config.custom.database.feedback.type.rate] },
                                ]
                            }

                        }
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            "avgRatePoint": { $avg: "$ratePoint" },
                            "timesRate": { $sum: 1 }
                        }
                    },
                ]
            }
        },
        {
            $unwind: {
                path: "$feedback",
                "preserveNullAndEmptyArrays": true
            }
        },

        {
            $addFields: { "id": "$_id"}
        }

    ]);


    const allValues = await cursor.toArray();
    return allValues
}


module.exports = {
    connect,
    getMostRegisteredCourses,
    getMostViewedCourses,
    getNewestCourses,
    getMostRegisteredCategories,
    updateNumView,
    getCourseByCategoryTopic,
    getCourseByCategoryId,
    searchCourse,
    getCourseById,
    getRelatedCourses,
}