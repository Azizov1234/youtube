import Joi from "joi"

class Validations{
    
    registerSchema=Joi.object({
        username:Joi.string().alphanum().min(3).max(20).required(),
        password:Joi.string().pattern( new RegExp('^[a-zA-Z0-9]{6,30}$'))
    })
}
export default new Validations