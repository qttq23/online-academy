const utils = require('../utils/utils')
const config = require('../startup.js').config


module.exports = {
    authenticate: async (req, res, next) => {

        let decoded
        try {
            const token = req.get(config.headerForAccessToken)
            decoded = await utils.verifyJWT(token, config.secretKey)
        } catch (err) {
            console.log(err)
            return res.status(401).json({ error: err.message })
        }

        req.custom = {jwtDecoded: decoded}
        next()
    },

    authorize: function(requiredType) {

        return function(req, res, next) {

            if(!req.custom || !req.custom.jwtDecoded){
                return res.status(401).json({ error: 'you are not authenticated' })
            }

            if (req.custom.jwtDecoded.userType !== requiredType) {
                return res.status(401).json({ error: 'you are not authorized to access this' })
            }

            next()
        }
    }
}