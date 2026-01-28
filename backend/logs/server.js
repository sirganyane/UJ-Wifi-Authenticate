const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const ldap = require('ldapjs');
const useragent = require('express-useragent');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection (uj_audit_db)
const dbConfig = {
    host: 'uj-db',
    user: 'root',
    password: 'uj_admin_2026',
    database: 'uj_wifi_db'
};

// LDAP Authentication Function
async function authenticate(username, password) {
    return new Promise((resolve, reject) => {
        const client = ldap.createClient({ url: 'ldap://uj-ldap:389' });
        const userDN = `uid=${username},ou=users,dc=uj,dc=ac,dc=za`;

        client.bind(userDN, password, (err) => {
            client.unbind();
            if (err) return reject(err);
            resolve(true);
        });
    });
}

// Main Login Route
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const ip = req.ip.replace('::ffff:', '');
    const device = `${req.useragent.platform} ${req.useragent.os}`;

    try {
        // 1. Check LDAP
        await authenticate(username, password);

        // 2. Success: Log to MySQL Audit Table
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(
            'INSERT INTO wifi_sessions (username, ip_address, device_model, status) VALUES (?, ?, ?, ?)',
            [username, ip, device, 'Active']
        );
        await connection.end();

        // 3. Redirect to Success Page
        res.redirect(`/success.html?user=${username}&ip=${ip}&dev=${device}`);
    } catch (err) {
        console.error('Login Failed:', err.message);
        res.redirect('/login.html?error=Invalid Credentials');
    }
});

// Admin Route: Get Audit Logs for Dashboard
app.get('/api/logs', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM wifi_sessions ORDER BY connection_time DESC LIMIT 50');
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database unreachable' });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('UJ Portal Live: http://localhost:3000');
});
// This tells the server to serve files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// This forces the home page to load landing.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});