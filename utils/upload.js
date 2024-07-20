const multer = require('multer');
const path = require('path');
const db = require('./database');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // Set file size limit to 5MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profile_pic');

const uploadMultiple = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // Set file size limit to 5MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array('cat_pics', 10);

// Function to save file info in the database
function saveFileInfo(filename, filepath) {
    const stmt = db.prepare('INSERT INTO pictures (name, path) VALUES (?, ?)');
    stmt.run(filename, filepath);
}

module.exports = { upload, uploadMultiple, saveFileInfo };
