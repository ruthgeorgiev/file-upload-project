const fs = require('fs');
const path = require('path');
const db = require('../utils/database');

// Directory where uploaded files are stored
const uploadsDir = path.join(__dirname, '../uploads');

// Read all files in the uploads directory
fs.readdir(uploadsDir, (err, files) => {
    if (err) {
        console.error('Unable to read uploads directory:', err);
        process.exit(1);
    }

    files.forEach(file => {
        // Check if the file is already in the database
        const row = db.prepare('SELECT * FROM pictures WHERE name = ?').get(file);
        if (!row) {
            // If not, insert the file into the database
            db.prepare('INSERT INTO pictures (name, path) VALUES (?, ?)').run(file, `/uploads/${file}`);
            console.log(`Inserted ${file} into the database.`);
        }
    });

    console.log('Sync complete.');
});
