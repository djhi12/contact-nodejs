// data/database.js
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost/contacts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const contactSchema = new mongoose.Schema({
    // ... (rest of your schema)
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
