const utils = require('../utils/utils.js')
utils.hash('admin')
    .then((hashed) => {
        console.log(hashed)
    })
    .catch((e) => { console.log(e) })