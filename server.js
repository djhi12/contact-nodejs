const express = require('express');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const port = process.env.PORT || 3000;

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
    apis: ['./routes/contacts.js'], // Path to your API route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Define your other routes and middleware here

app.get('/', (req, res) => {
    res.send('Hello World');
});

// ... Define your other routes and middleware here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
