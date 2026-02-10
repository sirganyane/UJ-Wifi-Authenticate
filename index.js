const express = require('express');
const app = express();
const path = require('path');
const port = 3070;

// Serve static files (CSS, Images) from the current folder
app.use(express.static('.'));

// The Main Student Login Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Simple API to check if portal is up
app.get('/health', (req, res) => {
    res.json({ status: "UJ Portal Online" });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`UJ WiFi Portal running on http://localhost:${port}`);
});