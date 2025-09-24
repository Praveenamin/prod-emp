const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post("/login", login);

// @route   POST /api/auth/register
// @desc    Register new user (for testing/future use)
// ⚠️ You might disable this in production if only admins can create users
router.post("/register", register);

module.exports = router;

