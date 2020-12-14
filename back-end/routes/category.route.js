const router = require('express').Router()
const categoryDao = require('../dao/category.dao.js')
const validation = require('../middlewares/validation.mdw.js')


module.exports = router

router.get('/', async function(req, res) {

    const list = await categoryDao.getAll()
    console.log(list)

    res.status(200).json({
        list
    })

})

router.get('/:id', async function(req, res) {

    const list = await categoryDao.getById(req.params.id)
    console.log(list)

    res.status(200).json({
        list
    })

})

// POST 
// {
//     "name": "xyz",
//     "topic": "abc"
// }
router.post('/', validation.validate(categoryDao.schemaCreate), async function(req, res) {

    console.log(req.body)

    let item = req.body
    const result = await categoryDao.create(item)
    console.log(result)

    res.status(201).json({
        result
    })

})

// PUT
// {
//     id: "",
//     item: {x: 1, y: "dskf"}
// }
router.put('/:id', validation.validate(categoryDao.schemaUpdate), async function(req, res) {

    console.log(req.params.id)
    console.log(req.body)

    let id = req.params.id
    let item = req.body
    const result = await categoryDao.update(id, item)
    console.log(result)

    res.status(200).json({
        result
    })

})


router.delete('/:id', async function(req, res) {

    console.log(req.params.id)

    let id = req.params.id
    const result = await categoryDao.remove(id)
    console.log(result)

    res.status(200).json({
        result
    })
})

