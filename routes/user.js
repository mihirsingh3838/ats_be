const express = require('express');

// controller functions
const { loginUser, signupUser, requestPasswordReset, resetPassword } = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// request password reset route
router.post('/request-password-reset', requestPasswordReset);

// reset password route
router.put('/reset-password/:token', resetPassword);

module.exports = router;
