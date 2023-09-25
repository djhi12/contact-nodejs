const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const contactId = req.params.id;

    try {
        const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(updatedContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const contactId = req.params.id;

    try {
        const deletedContact = await Contact.findByIdAndDelete(contactId);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
