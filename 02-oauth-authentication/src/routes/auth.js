// src/routes/auth.js

const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import authentication controller
const authController = require("../controllers/authController");

// @route   GET /auth/register
// @desc    Render the registration form
router.get("/register", authController.getRegister);

// @route   POST /auth/register
// @desc    Handle user registration
router.post("/register", authController.postRegister);

// @route   GET /auth/login
// @desc    Render the login form
router.get("/login", authController.getLogin);

// @route   POST /auth/login
// @desc    Handle user login
router.post("/login", authController.postLogin);

// @route   GET /auth/logout
// @desc    Handle user logout
router.get("/logout", authController.logout);

// @route   GET /auth/google
// @desc    Initiate Google OAuth authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route   GET /auth/google/callback
// @desc    Handle callback from Google OAuth
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  (req, res) => {
    // Successful authentication, redirect to dashboard
    res.redirect("/dashboard");
  }
);


// @route   GET /auth/facebook
// @desc    Initiate Facebook OAuth authentication
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// @route   GET /auth/facebook/callback
// @desc    Handle callback from Facebook OAuth
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  (req, res) => {
    // Successful authentication, redirect to dashboard
    res.redirect("/dashboard");
  }
);

// @route   GET /auth/apple
// @desc    Initiate Apple OAuth authentication
router.get("/apple", passport.authenticate("apple"));

// @route   POST /auth/apple/callback
// @desc    Handle callback from Apple OAuth
router.post(
  "/apple/callback",
  passport.authenticate("apple", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  (req, res) => {
    // Successful authentication, redirect to dashboard
    res.redirect("/dashboard");
  }
);

module.exports = router;
