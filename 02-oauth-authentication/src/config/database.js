// src/config/database.js

const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
