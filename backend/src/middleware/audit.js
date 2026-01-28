const fs = require('fs');
const path = require('path');

const auditLogger = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') {
        const logEntry = `${new Date().toISOString()} - User: ${req.body.username} - IP: ${req.ip}\n`;
        fs.appendFileSync(path.join(__dirname, '../../logs/access.log'), logEntry);
    }
    next();
};

module.exports = auditLogger;