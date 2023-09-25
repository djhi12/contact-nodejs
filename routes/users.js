// routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// Define user-specific routes and their handlers here

// GET all contacts
router.get('/', usersController.getAllContacts);

// POST a new contact
router.post('/', usersController.createContact);

// GET a contact by ID
router.get('/:id', usersController.getContactById);

// PUT (update) a contact by ID
router.put('/:id', usersController.updateContactById);

// DELETE a contact by ID
router.delete('/:id', usersController.deleteContactById);

module.exports = router;
