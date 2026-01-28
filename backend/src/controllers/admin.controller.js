const fs = require('fs');
const path = require('path');

exports.getLiveSessions = (req, res) => {
    const logPath = path.join(__dirname, '../../logs/access.log');
    
    // Read the last 20 lines of the access log
    fs.readFile(logPath, 'utf8', (err, data) => {
        if (err) {
            return res.json({ sessions: [] });
        }
        
        const sessions = data.trim().split('\n').map(line => {
            const [time, user, ip] = line.split(' - ');
            return { time, user: user?.split(': ')[1], ip: ip?.split(': ')[1] };
        }).reverse();

        res.json({ sessions });
    });
};