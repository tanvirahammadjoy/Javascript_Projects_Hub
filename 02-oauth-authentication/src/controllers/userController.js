// src/controllers/userController.js

// Render the dashboard page for authenticated users
exports.getDashboard = (req, res) => {
  res.render("dashboard", {
    user: req.user, // Pass the authenticated user to the view
  });
};
