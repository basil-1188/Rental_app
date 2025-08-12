const express = require('express');
const { register, logins, logout } = require('../controller/authController');

const router = express.Router();

router.post('/register',register);
router.post('/login',logins);
router.get('/logout',logout);

module.exports = router