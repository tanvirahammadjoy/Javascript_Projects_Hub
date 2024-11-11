// src/routes/index.js

const express = require("express");
const router = express.Router();

// Import user controller
const userController = require("../controllers/userController");

// Middleware to ensure the user is authenticated
const { ensureAuthenticated } = require("../utils/auth");


// @route   GET /
// @desc    Render the home page

router.get("/", (req, res) => {
  res.render("index");
});


// @route   GET /dashboard
// @desc    Render the dashboard for authenticated users
// @access  Private

router.get("/dashboard", ensureAuthenticated, userController.getDashboard);

module.exports = router;
