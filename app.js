const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
require('./data/database');

// Swagger API documentation setup
// ... (your existing Swagger setup code)

// Define a root route
app.get('/', (req, res) => {
    res.send('Hello, World!'); // Replace with your desired response
});

// Include routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
