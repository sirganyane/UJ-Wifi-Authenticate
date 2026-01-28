const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Secure this route: in production, check for 'staff' role in session
router.get('/sessions', adminController.getLiveSessions);

module.exports = router;