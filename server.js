const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const uploadRoute = require('./routes/uploadRoute');
const getPicsRoute = require('./routes/getPicsRoute');
const deleteRoute = require('./routes/deleteRoute');

app.use(uploadRoute);
app.use(getPicsRoute);
app.use(deleteRoute);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
