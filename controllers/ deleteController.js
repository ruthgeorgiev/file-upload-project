const fs = require('fs');
const path = require('path');
const db = require('../utils/database');

const deletePic = (req, res) => {
    const pic_id = req.params.id;
    const row = db.prepare('SELECT * FROM pictures WHERE pic_id = ?').get(pic_id);
    if (row) {
        const filePath = path.join(__dirname, '..', row.path);
        fs.unlink(filePath, (err) => {
            if (err) {
                res.send('Error: Could not delete file');
            } else {
                db.prepare('DELETE FROM pictures WHERE pic_id = ?').run(pic_id);
                res.send('Success');
            }
        });
    } else {
        res.send('Error: File not found');
    }
};

module.exports = {
    deletePic
};
