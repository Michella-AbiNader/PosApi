const Joi = require("joi")

const validator = schema =>(req, res, next)=>{
    const {error} = schema.validate(req.body, {abortEarly: false});
    if(error){
        var message = "";
        for(let key in error.details){
            var detail = error.details[key];
            message += detail.message + "\n";
        }
        return res.status(400).json({
            message: message
        });
    }
    next();
};

const ProductSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.number().required(),
});

const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    admin: Joi.number().required()
})

module.exports = {
    ValidateProducts: validator(ProductSchema),
    ValidateUser: validator(UserSchema)
}