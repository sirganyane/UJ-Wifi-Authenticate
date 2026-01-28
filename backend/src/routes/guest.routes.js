const express = require('express');
const router = express.Router();

// Matches: GET /onboard/guest
router.get('/guest', (req, res) => {
    // We could generate a temporary guest ID here
    req.session.authenticated = true;
    req.session.user = { role: 'guest', id: 'GUEST-' + Date.now() };
    
    // Redirect to success page or a guest-specific landing
    res.redirect('/success.html');
});

module.exports = router;