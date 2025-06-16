const Database = require('better-sqlite3');
const db = new Database('budget.sqlite');

db.prepare(`
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        recurring BOOLEAN NOT NULL
    );
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL
    );
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        target_amount REAL NOT NULL,
        current_amount REAL NOT NULL DEFAULT 0
    );
`).run();

const incomeCount = db.prepare('SELECT COUNT(*) AS count FROM income').get().count;
if (incomeCount === 0) {
    db.prepare('INSERT INTO income (amount) VALUES (0)').run();
}

module.exports = db;