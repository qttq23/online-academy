const utils = require('../server/utils/utils.js')
utils.hash('leloi')
    .then((hashed) => {
        console.log(hashed)
    })
    .catch((e) => { console.log(e) })