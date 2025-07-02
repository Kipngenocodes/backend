import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');

// Execute a simple query to create a table for users
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)
`);

// Execute a simple query to create a table for todos
db.exec(`
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    task TEXT ,
    completed BOOLEAN  DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
`);

export default db;