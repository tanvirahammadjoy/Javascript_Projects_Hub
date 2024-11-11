// src/utils/auth.js

// Middleware to ensure the user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, proceed to the next middleware/route handler
    return next();
  }
  // If not authenticated, redirect to the login page with an error message
  req.flash("error_msg", "Please log in to view that resource");
  res.redirect("/auth/login");
};
