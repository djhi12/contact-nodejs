const mongoose = require('mongoose');

// Define the schema for the Contact model
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
    },
    phoneNumber: {
        type: String,
    },
    // Add more fields as needed
});

// Create the Contact model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
