// controllers/users.js

const Contact = require('../data/database');

// GET all contacts
exports.getAllContacts = (req, res) => {
    Contact.find({}, (err, contacts) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(contacts);
    });
};

// POST a new contact
exports.createContact = (req, res) => {
    const contact = new Contact(req.body);
    contact.save((err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json(contact);
    });
};

// GET a contact by ID
exports.getContactById = (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(contact);
    });
};

// PUT (update) a contact by ID
exports.updateContactById = (req, res) => {
    Contact.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, contact) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(contact);
    });
};

// DELETE a contact by ID
exports.deleteContactById = (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.sendStatus(204);
    });
};
