const mongoose = require('mongoose');

// Define the client schema
const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    }
}, { timestamps: true });

// Create the Client model
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
