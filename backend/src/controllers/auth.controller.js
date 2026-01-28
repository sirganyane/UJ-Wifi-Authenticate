const ldapService = require('../services/ldap.service');
const networkService = require('../services/network.service');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    // Most WLCs append the user's MAC to the redirect URL
    // e.g., portal.uj.ac.za/login.html?client_mac=aa:bb:cc:dd
    const clientMac = req.query.client_mac || 'UNKNOWN_MAC';

    try {
        // 1. Validate Credentials via LDAP
        const authResult = await ldapService.authenticateWithLDAP(username, password);

        if (authResult.success) {
            // 2. Open the gate at the Network level
            await networkService.authorizeDevice(clientMac, authResult.user.role);

            // 3. Establish Local Session
            req.session.authenticated = true;
            req.session.user = authResult.user;

            return res.redirect('/success.html');
        } else {
            return res.redirect('/login.html?error=1');
        }
    } catch (error) {
        console.error("Network Auth Error:", error);
        res.status(500).send("Communication failure with UJ Network.");
    }
};