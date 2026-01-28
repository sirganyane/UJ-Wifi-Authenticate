const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create/Open the database file
const dbPath = path.join(__dirname, 'uj_wifi.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("🛠  Initializing UJ WiFi Database...");

    // 1. Create Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        full_name TEXT,
        role TEXT
    )`);

    // 2. Clear existing test data to avoid duplicates
    db.run(`DELETE FROM users`);

    // 3. Insert Test Student & Staff Accounts
    const stmt = db.prepare(`INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)`);
    
    // Test Account 1: Student
    stmt.run("202400123", "uj_pass1", "Thabo Mbeki", "student");
    // Test Account 2: Staff
    stmt.run("staff_admin", "admin_pass", "Sarah Smith", "staff");
    // Test Account 3: Graduate
    stmt.run("202199887", "orange_carpet", "Leila Naidoo", "student");

    stmt.finalize();

    console.log("✅ Database seeded successfully!");
    console.log("--- Test Credentials ---");
    console.log("User: 202400123 | Pass: uj_pass1");
    console.log("User: staff_admin | Pass: admin_pass");
    console.log("------------------------");
    
    db.close();
});