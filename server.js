const express = require('express');
const { upload, uploadMultiple, saveFileInfo } = require('./utils/upload');
const path = require('path');
const db = require('./utils/database');

const app = express();
const PORT = 4000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve the uploads directory

// Route to handle single file upload
app.post('/upload-profile-pic', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.send('Error: File size is too large. Please upload files smaller than 5MB.');
            } else {
                res.send(err.message);
            }
        } else {
            if (req.file == undefined) {
                res.send('Error: No File Selected!');
            } else {
                saveFileInfo(req.file.originalname, `/uploads/${req.file.filename}`);
                res.send(`<div><h2>Here's the picture:</h2><img src="/uploads/${req.file.filename}" /></div>`);
            }
        }
    });
});

// Route to handle multiple file upload
app.post('/upload-cat-pics', (req, res) => {
    uploadMultiple(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.send('Error: One or more files are too large. Please upload files smaller than 5MB each.');
            } else {
                res.send(err.message);
            }
        } else {
            if (req.files == undefined || req.files.length === 0) {
                res.send('Error: No Files Selected!');
            } else {
                req.files.forEach(file => {
                    saveFileInfo(file.originalname, `/uploads/${file.filename}`);
                });
                const imageTags = req.files.map(file => `<img src="/uploads/${file.filename}" />`).join('');
                res.send(`<div><h2>Here are the pictures:</h2>${imageTags}</div>`);
            }
        }
    });
});

// Route to get all pictures
app.get('/get-pics', (req, res) => {
    const rows = db.prepare('SELECT * FROM pictures').all();
    let links = rows.map(row => `<a href="${row.path}" target="_blank">${row.name}</a>`).join('<br>');
    res.send(`<div><h2>Uploaded Pictures:</h2>${links}</div>`);
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
