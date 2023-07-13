const mongoose = require('mongoose');
const Joi = require('joi')

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Role"
        }]
    })


const User = mongoose.model('User', userSchema);

const UserValidationSchema = Joi.object({
    name: Joi.string().min(2).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    isAdmin:Joi.bool()
});

module.exports = {User, UserValidationSchema};
