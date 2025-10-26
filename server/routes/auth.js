const express = require('express');
const { register, login, getUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getUser); // ← This is the correct route

module.exports = router;