const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// This tells Express that the 'public' folder is one level UP from 'backend'
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

// Route for the main entry point
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'admin_login.html'));
});

app.listen(PORT, () => {
    console.log(`
    ============================================
    UJ WIFI COMMAND CENTER IS ONLINE
    URL: http://localhost:${PORT}
    Serving files from: ${publicPath}
    ============================================
    `);
});