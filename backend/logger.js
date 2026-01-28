const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'backend', 'logs', 'access.log');

// Ensure directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

/**
 * Appends a new session entry to the access.log
 */
const logAccess = (data) => {
    const entry = {
        time: new Date().toISOString(),
        username: data.username || 'Anonymous',
        ip: data.ip || '0.0.0.0',
        deviceModel: data.deviceModel || 'Unknown Device',
        os: data.os || 'Unknown OS',
        status: data.status || 'Success'
    };

    // Append as a new line in JSON format
    fs.appendFile(logFilePath, JSON.stringify(entry) + '\n', (err) => {
        if (err) console.error('Failed to write to access.log:', err);
    });
};

module.exports = { logAccess };