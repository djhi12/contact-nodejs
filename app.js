const express = require('express');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Swagger API Documentation
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Contact API',
            description: 'API for storing and retrieving contacts',
            version: '1.0.0',
        },
    },
    apis: ['path/to/contact.js'], // Specify the path to your API routes file
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Middleware to parse JSON requests
app.use(express.json());

// API routes
const contactRoutes = require('./routes/contact');
app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
