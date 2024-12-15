// File: pool.js

const { Pool } = require("pg");

// PostgreSQL connection pool configuration
const pool = new Pool({
  host: "localhost",
  port: 5431,
  user: "tanvir",
  password: "iamthevest",
  database: "root",
});

// Export the pool for use in other modules
module.exports = pool;
