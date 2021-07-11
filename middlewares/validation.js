const Joi = require('joi')
function validation(schema, data){
 
    return schema.validate(data);
}

module.exports = {validation};