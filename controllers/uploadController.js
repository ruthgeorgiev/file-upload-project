const db = require('../utils/database');

const handleSingleUpload = (req, res) => {
    if (req.file) {
        db.prepare('INSERT INTO pictures (name, path) VALUES (?, ?)').run(req.file.originalname, `/uploads/${req.file.filename}`);
        res.send(`<div><h2>Here's the picture:</h2><img src="/uploads/${req.file.filename}" /></div>`);
    } else {
        res.send('Error: No File Selected!');
    }
};

const handleMultipleUpload = (req, res) => {
    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            db.prepare('INSERT INTO pictures (name, path) VALUES (?, ?)').run(file.originalname, `/uploads/${file.filename}`);
        });
        const imageTags = req.files.map(file => `<img src="/uploads/${file.filename}" />`).join('');
        res.send(`<div><h2>Here are the pictures:</h2>${imageTags}</div>`);
    } else {
        res.send('Error: No Files Selected!');
    }
};

module.exports = {
    handleSingleUpload,
    handleMultipleUpload
};
