const ldap = require('ldapjs');

const authenticateLDAP = (username, password) => {
    return new Promise((resolve, reject) => {
        const client = ldap.createClient({
            url: 'ldap://uj-ldap:389' // Uses the Docker service name
        });

        // The Distinguished Name (DN) we set up in the LDIF
        const dn = `uid=${username},ou=users,dc=uj,dc=ac,dc=za`;

        client.bind(dn, password, (err) => {
            if (err) {
                console.error("LDAP Auth Failed for:", username);
                client.unbind();
                return reject(false);
            }
            console.log("LDAP Auth Success:", username);
            client.unbind();
            resolve(true);
        });
    });
};

module.exports = authenticateLDAP;