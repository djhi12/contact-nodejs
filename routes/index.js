const express = require('express');
const app = express();

// Import your route files
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');

// Use your routes
app.use('/routes/contacts', contactsRouter);
app.use('/routes/users', usersRouter);

// ...

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
