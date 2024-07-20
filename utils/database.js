const Database = require('better-sqlite3');
const db = new Database('./uploads.db', { verbose: console.log });

db.exec(`CREATE TABLE IF NOT EXISTS pictures (
    pic_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    path TEXT
)`);

module.exports = db;

