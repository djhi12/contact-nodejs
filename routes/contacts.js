// const express = require('express');
// const router = express.Router();
// const Contact = require('../models/contact'); // Import the Contact model
// const path = require('path'); // Import the path module


// // GET all contacts
// router.get('/', async (req, res) => {
//     try {
//         const contacts = await Contact.find();
//         res.json(contacts);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // GET a contact by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const contact = await Contact.findById(req.params.id);
//         if (!contact) {
//             return res.status(404).json({ message: 'Contact not found' });
//         }
//         res.json(contact);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Contacts API',
//             version: '1.0.0',
//             description: 'API for managing contacts',
//         },
//     },
//     // Use absolute file paths using __dirname
//     apis: [
//         path.join(__dirname, './routes/contacts.js'),
//         path.join(__dirname, './routes/users.js')
//     ],
// };

// module.exports = router;


// // Import the necessary modules and models at the top of your contacts.js file
// const express = require('express');
// const router = express.Router();
// const Contact = require('../models/contact'); // Import the Contact model
// const path = require('path'); // Import the path module

// // ... (Existing code for GET routes) ...

// // POST route to create a new contact
// router.post('/', async (req, res) => {
//     try {
//         const newContact = new Contact(req.body);
//         await newContact.save();
//         res.status(201).json({ id: newContact._id });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // PUT route to update a contact by ID
// router.put('/:id', async (req, res) => {
//     try {
//         const contactId = req.params.id;
//         const updatedData = req.body;

//         // Ensure that the contact with the given ID exists
//         const existingContact = await Contact.findById(contactId);
//         if (!existingContact) {
//             return res.status(404).json({ message: 'Contact not found' });
//         }

//         // Update the contact with the new data
//         await Contact.findByIdAndUpdate(contactId, updatedData);

//         res.sendStatus(204); // Success status (No Content)
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // DELETE route to delete a contact by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const contactId = req.params.id;

//         // Ensure that the contact with the given ID exists
//         const existingContact = await Contact.findById(contactId);
//         if (!existingContact) {
//             return res.status(404).json({ message: 'Contact not found' });
//         }

//         // Delete the contact
//         await Contact.findByIdAndDelete(contactId);

//         res.sendStatus(204); // Success status (No Content)
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API endpoints for managing contacts
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: A list of contacts
 *       500:
 *         description: Internal server error
 */

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the contact
 *     responses:
 *       200:
 *         description: The contact with the specified ID
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       500:
 *         description: Internal server error
 */

router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ id: newContact._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       204:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */

router.put('/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        const updatedData = req.body;

        // Ensure that the contact with the given ID exists
        const existingContact = await Contact.findById(contactId);
        if (!existingContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Update the contact with the new data
        await Contact.findByIdAndUpdate(contactId, updatedData);

        res.sendStatus(204); // Success status (No Content)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the contact
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id', async (req, res) => {
    try {
        const contactId = req.params.id;

        // Ensure that the contact with the given ID exists
        const existingContact = await Contact.findById(contactId);
        if (!existingContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Delete the contact
        await Contact.findByIdAndDelete(contactId);

        res.sendStatus(204); // Success status (No Content)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
