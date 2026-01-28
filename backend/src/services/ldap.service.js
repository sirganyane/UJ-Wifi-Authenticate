const ldap = require('ldapjs');

/**
 * Connects to UJ Active Directory and attempts to bind (login)
 * @param {string} username - Student/Staff ID (e.g., 219000000)
 * @param {string} password - UJ Password
 */
const authenticateWithLDAP = (username, password) => {
    return new Promise((resolve, reject) => {
        // 1. Create the LDAP Client (Points to UJ's AD Server)
        const client = ldap.createClient({
            url: process.env.LDAP_URL || 'ldap://ad.uj.ac.za:389',
            timeout: 5000,
            connectTimeout: 10000
        });

        // 2. Construct the Distinguished Name (DN)
        // Usually looks like: CN=219000000,OU=Students,DC=uj,DC=ac,DC=za
        const userDn = `CN=${username},OU=Users,DC=uj,DC=ac,DC=za`;

        // 3. Attempt the "Bind" (The actual login)
        client.bind(userDn, password, (err) => {
            if (err) {
                console.error(`LDAP Auth Failed for ${username}:`, err.message);
                client.unbind();
                return resolve({ success: false, message: 'Invalid Credentials' });
            }

            // 4. If successful, search for user details (Email, Name, Role)
            const opts = {
                filter: `(cn=${username})`,
                scope: 'sub',
                attributes: ['displayName', 'mail', 'employeeType'] // employeeType often identifies Student vs Staff
            };

            client.search('DC=uj,DC=ac,DC=za', opts, (err, res) => {
                let userData = { username };

                res.on('searchEntry', (entry) => {
                    userData = {
                        username: username,
                        name: entry.object.displayName,
                        email: entry.object.mail,
                        role: entry.object.employeeType || 'student'
                    };
                });

                res.on('error', (err) => {
                    client.unbind();
                    resolve({ success: false, message: 'Directory Search Error' });
                });

                res.on('end', () => {
                    client.unbind();
                    resolve({ success: true, user: userData });
                });
            });
        });
    });
};

module.exports = { authenticateWithLDAP };