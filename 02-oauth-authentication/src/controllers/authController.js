// src/controllers/authController.js
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

// Render the registration page
exports.getRegister = (req, res) => {
  res.render("register");
};


// Handle user registration
exports.postRegister = (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Basic form validation
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    // If there are validation errors, re-render the form with error messages
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Validation passed, proceed to check if user exists
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // User exists, prevent duplicate registration
        errors.push({ msg: "Email already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        // Create a new user instance
        const newUser = new User({
          name,
          email,
          password,
        });

        // Hash the user's password before saving
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set the hashed password
            newUser.password = hash;
            // Save the user to the database
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/auth/login");
              })
              .catch((err) => console.error(err));
          });
        });
      }
    });
  }
};


// Render the login page
exports.getLogin = (req, res) => {
  res.render("login");
};


// Handle user login
exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard", // Redirect to dashboard on success
    failureRedirect: "/auth/login", // Redirect back to login on failure
    failureFlash: true, // Enable flash messages
  })(req, res, next);
};


// Handle user logout
exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
      return next(err);
    }
    req.flash("success_msg", "You are logged out");
    res.redirect("/auth/login");
  });
};
