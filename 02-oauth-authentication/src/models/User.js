// src/models/User.js

const mongoose = require("mongoose");

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Ensure unique emails
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  appleId: {
    type: String,
  },
  role: {
    type: String,
    enum: ["User", "Admin"], // Define possible roles
    default: "User", // Default role
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

module.exports = mongoose.model("User", UserSchema);
