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



// connect database, get configurations
const startup = require('./startup.js')
startup.start()
    .then(function(configuration) {

        console.log(configuration)


        app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        app.use('/api/category', require('./routes/category.route.js'))
        app.use('/api/course', require('./routes/course.route.js'))
        app.use('/api/user', require('./routes/user.route.js'))
        app.use('/api/auth', require('./routes/auth.route.js'))

        // client error 404
        app.use(function(req, res, next) {
            res.status(404).send('resouce not found')
        })

        // catch all
        app.use(function(err, req, res, next) {
            console.error(err.stack)
            res.status(500).send('Something broke!')
        })

        // start server
        app.listen(3000, () => {
            console.log(`updated app listening at http://localhost:${port}`)
        })

    })
    .catch(function(e) {
    	console.log(e)
        console.log('startup failed')
    })