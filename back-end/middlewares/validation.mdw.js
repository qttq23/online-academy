
var Ajv = require('ajv')
// const config = require('../config.json')
const config = require('../startup.js').config

module.exports = {


    validate: (schema)=>{
        
        console.log(schema)

        return (req, res, next)=>{

            let item = req.body
            
            var ajv = new Ajv({ format: 'full'});
            var valid = ajv.validate(schema, item);
            if (!valid){
                console.log(ajv.errors);
                return res.status(400).json({error: ajv.errors[0].message})

            }
            next()
        }

    },

    checkId: (req, res, next) => {

        let id = req.params.id
        if (id && id.length != config.database.idLength) {
            return res.status(401).json({
                error: `id must be ${config.database.idLength} in length`
            })
        }

        next()
    },

    checkEnoughCredential: (req, res, next) =>{
        let email = req.body.email
        let password = req.body.password

        if(!email || !password){
            return res.status(401).json({
                error: `missing email or password field`
            })
        }

        next()
    }

}