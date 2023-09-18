const express = require('express');
const router = express.Router();
const Contact = require('./models/Contact'); // Adjust the path as needed

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
    const contactId = req.params.id;

    try {
        const contact = await Contact.findById(contactId);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (err) {
        console.error('Error fetching contact by ID:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
