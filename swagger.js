const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger options
const options = {
    swaggerDefinition: {
        info: {
            title: 'Contact API',
            version: '1.0.0',
            description: 'API for storing and retrieving contacts',
        },
    },
    apis: ['./routes/*.js'], // Replace with the path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
