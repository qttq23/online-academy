
var Ajv = require('ajv')

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

    }

}