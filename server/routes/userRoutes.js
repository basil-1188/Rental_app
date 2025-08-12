const express = require('express');
const { test, updateProfile, deleteUser, } = require('../controller/userController');
const { verifyToken } = require('../utils/verifyUser');
const router = express.Router();

router.get('/test', test);
router.delete('/:id', verifyToken, deleteUser);
module.exports = router;
