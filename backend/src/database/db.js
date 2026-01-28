const Datastore = require('nedb-promises');
const path = require('path');

// This creates a simple file-based DB that doesn't need C++ compilers
const db = Datastore.create({
    filename: path.join(__dirname, '../../uj_wifi.db'),
    autoload: true
});

module.exports = {
    // We create a wrapper to match the 'better-sqlite3' syntax we used before
    prepare: (query) => {
        return {
            run: async (username, role) => {
                return await db.insert({ username, role, timestamp: new Date() });
            },
            all: async () => {
                return await db.find({}).sort({ timestamp: -1 });
            }
        };
    }
};