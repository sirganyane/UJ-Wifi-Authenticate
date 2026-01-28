const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./uj_wifi.db');

db.serialize(() => {
  // Table for Guest Vouchers
  db.run(`CREATE TABLE IF NOT EXISTS vouchers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    expiry DATETIME,
    is_used INTEGER DEFAULT 0
  )`);

  // Table for Connection Logs (Compliance/Audit)
  db.run(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    mac_address TEXT,
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'uj_wifi_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();