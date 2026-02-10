require('dotenv').config();

module.exports = {
    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'uj_wifi_db',
        port: process.env.DB_PORT || 3306
    },
    port: process.env.PORT || 3000
};