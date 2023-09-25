const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { specs, swaggerUi } = require('./swagger'); // Replace with the correct path to your swagger.js file


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// Create a Contact model
const Contact = mongoose.model('Contact', {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
});

// Middleware
app.use(bodyParser.json());

// Create a POST route to create a new contact
app.post('/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ id: newContact._id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create contact' });
    }
});

// Create a PUT route to update a contact
app.put('/contacts/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update contact' });
    }
});

// Create a DELETE route to delete a contact
app.delete('/contacts/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
