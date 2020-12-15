const router = require('express').Router()
const userDao = require('../dao/user.dao.js')
const validation = require('../middlewares/validation.mdw.js')
const auth = require('../middlewares/auth.mdw.js')
const config = require('../startup.js').config

module.exports = router

// admin
router.get('/',
    [
        auth.authenticate,
        auth.authorize(config.database.user.type.admin)
    ],
    async function(req, res) {

        const list = await userDao.getAll()
        console.log(list)

        res.status(200).json({
            list
        })

    })

// everyone
router.get('/:id', validation.checkId, async function(req, res) {

    const list = await userDao.getById(req.params.id)
    console.log(list)

    res.status(200).json({
        list
    })

})


// admin
// POST 
// email
// password
// name
// description
// type
router.post('/', [
    auth.authenticate,
    auth.authorize(config.database.user.type.admin),
    validation.validate(userDao.schemaCreate)
], async function(req, res) {

    console.log(req.body)

    let item = req.body
    const result = await userDao.create(item)
    console.log(result)

    res.status(201).json({
        result
    })

})

// authenticated...
// PUT
// {
//     id: "",
//     item: {x: 1, y: "dskf"}
// }
router.put('/:id', [validation.checkId, validation.validate(userDao.schemaUpdate)], async function(req, res) {

    console.log(req.params.id)
    console.log(req.body)

    let id = req.params.id
    let item = req.body
    const result = await userDao.update(id, item)
    console.log(result)

    res.status(200).json({
        result
    })

})

// admin...
router.delete('/:id', validation.checkId, async function(req, res) {

    console.log(req.params.id)

    let id = req.params.id
    const result = await userDao.remove(id)
    console.log(result)

    res.status(200).json({
        result
    })
})