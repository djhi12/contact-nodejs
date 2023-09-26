const express = require('express');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');

// Load environment variables from .env file
dotenv.config(); // Load .env variables

// Define Swagger options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contacts API',
            version: '1.0.0',
            description: 'API for managing contacts',
        },
    },
    apis: ['../routes/contacts.js'], // Path to your API route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Establish MongoDB connection
const { MONGODB_URI } = process.env;

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');

        // Define your other routes and middleware here

        app.get('/', (req, res) => {
            res.send('Hello World');
        });

        // ... Define your other routes and middleware here

        // Start your Express server after the MongoDB connection is established
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Use the routers
app.use('./contacts', contactsRouter);
app.use('./users', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

