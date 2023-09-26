const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model
const path = require('path'); // Import the path module

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET a contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contacts API',
            version: '1.0.0',
            description: 'API for managing contacts',
        },
    },
    // Use absolute file paths using __dirname
    apis: [
        path.join(__dirname, './routes/contacts.js'),
        path.join(__dirname, './routes/users.js')
    ],
};

module.exports = router;
