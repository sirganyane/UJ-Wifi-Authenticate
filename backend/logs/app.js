const express = require('express');
const mysql = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const app = express();

// Database Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Persistent Session Store (No Expiry logic)
const sessionStore = new MySQLStore({}, pool);

app.use(session({
    key: 'uj_wifi_session',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 100 * 365 * 24 * 60 * 60 * 1000, // 100 Years
        httpOnly: true 
    }
}));

// Route to log metadata upon login
app.post('/auth/login', async (req, res) => {
    const { username } = req.body;
    const ip = req.ip.replace('::ffff:', '');
    
    // Simple User-Agent parsing for Make/Model
    const ua = req.headers['user-agent'];
    const os = ua.includes('Windows') ? 'Windows' : ua.includes('Android') ? 'Android' : 'iOS/MacOS';
    const model = ua.match(/\(([^)]+)\)/) ? ua.match(/\(([^)]+)\)/)[1].split(';')[0] : 'Generic Device';

    try {
        await pool.query(
            'INSERT INTO wifi_sessions (username, device_ip, os_name, device_model) VALUES (?, ?, ?, ?)',
            [username, ip, os, model]
        );
        req.session.isLoggedIn = true;
        req.session.username = username;
        res.redirect('/success.html');
    } catch (err) {
        res.status(500).send("Database connection error");
    }
});