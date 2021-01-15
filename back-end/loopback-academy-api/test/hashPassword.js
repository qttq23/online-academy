const utils = require('../server/utils/utils.js')
utils.hash('thang')
    .then((hashed) => {
        console.log(hashed)
    })
    .catch((e) => { console.log(e) })