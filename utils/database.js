const Database = require('better-sqlite3');
const db = new Database('./uploads.db', { verbose: console.log });

db.exec(`CREATE TABLE IF NOT EXISTS pictures (
    pic_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    path TEXT
)`);

function saveFileInfo(filename, filepath) {
    const stmt = db.prepare('INSERT INTO pictures (name, path) VALUES (?, ?)');
    stmt.run(filename, filepath);
}

module.exports = db;
