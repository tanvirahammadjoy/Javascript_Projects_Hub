// src/app.js

// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();

// Connect to MongoDB
require("./config/database")();

// Passport configuration
require("./config/passport")(passport);

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body parser middleware to handle form submissions
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Express session middleware for session management
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use a strong secret in production
    resave: false, // Prevents session from being saved back to the store if unmodified
    saveUninitialized: false, // Don't create session until something stored
  })
);

// Initialize Passport and manage session
app.use(passport.initialize());
app.use(passport.session());

// Connect-flash middleware for flash messages
app.use(flash());

// Global variables for flash messages and user data
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg"); // Success messages
  res.locals.error_msg = req.flash("error_msg"); // Error messages
  res.locals.error = req.flash("error"); // Passport error messages
  res.locals.user = req.user || null; // Current user
  next();
});

// Define routes
app.use("/", require("./routes/index")); // Home and dashboard routes
app.use("/auth", require("./routes/auth")); // Authentication routes

// Define the server port
const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
