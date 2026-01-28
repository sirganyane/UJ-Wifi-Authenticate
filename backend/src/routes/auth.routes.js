const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Matches: POST /auth/login
router.post('/login', authController.login);

// Matches: GET /auth/logout
router.get('/logout', authController.logout);

module.exports = router;