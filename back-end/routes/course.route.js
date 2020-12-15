const router = require('express').Router()
const courseDao = require('../dao/course.dao.js')
const validation = require('../middlewares/validation.mdw.js')


module.exports = router

router.get('/', async function(req, res) {

    const list = await courseDao.getAll()
    console.log(list)

    res.status(200).json({
        list
    })

})

router.get('/:id', validation.checkId, async function(req, res) {

    const list = await courseDao.getById(req.params.id)
    console.log(list)

    res.status(200).json({
        list
    })

})

// POST
// {
//     "name": "xyz",
//     "categoryId": "abc3435",....
// }
router.post('/', validation.validate(courseDao.schemaCreate), async function(req, res) {

    console.log(req.body)

    let item = req.body
    const result = await courseDao.create(item)
    console.log(result)

    res.status(201).json({
        result
    })

})

// PUT /id
// {
//     x: 1, 
//     y: "dskf"
// }
router.put(
    '/:id',
    [validation.checkId, validation.validate(courseDao.schemaUpdate)],
    async function(req, res) {

        console.log(req.params.id)
        console.log(req.body)

        let id = req.params.id
        let item = req.body
        const result = await courseDao.update(id, item)
        console.log(result)

        res.status(200).json({
            result
        })

    }
)


router.delete('/:id', validation.checkId, async function(req, res) {

    console.log(req.params.id)

    let id = req.params.id
    const result = await courseDao.remove(id)
    console.log(result)

    res.status(200).json({
        result
    })
})