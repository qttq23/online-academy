const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
var cors = require('cors')

const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/category', require('./routes/category.route.js'))


// client error 404
app.use(function(req, res, next) {
    res.status(404).send('resouce not found')
})

// catch all
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})



app.listen(3000, () => {
    console.log(`updated app listening at http://localhost:${port}`)
})



//--------


// // connect to database
// const db = require('./db/db.js')
// db.connect()
//     .then(function(client) {
//         console.log('connect ok')

//         app.listen(3000, () => {
//             console.log(`Example app listening at http://localhost:${port}`)
//         })
//     })
//     .catch(function(err) {
//         console.log('connect failed', err)
//         db.close()
//     })