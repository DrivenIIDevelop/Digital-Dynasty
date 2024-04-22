const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 30
        },
        email: {
            type: String,
            required: true,
            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            match: /^[0-9]{10}$/
        }     
    }, 
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;