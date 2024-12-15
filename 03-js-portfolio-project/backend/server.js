const { Pool } = require("pg");

// PostgreSQL connection configuration
const pool = new Pool({
  user: "postgres", // Replace with your PostgreSQL username
  host: "localhost", // PostgreSQL host (e.g., Docker IP or localhost)
  database: "postgres1", // Replace with your database name
  password: "iamthevest", // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// Insert data into the "user" table
const insertUser = async (name, email) => {
  const query = 'INSERT INTO "users" (name, email) VALUES ($1, $2) RETURNING *';

  try {
    const result = await pool.query(query, [name, email]);
    console.log("User added:", result.rows[0]); // Output the inserted user
  } catch (err) {
    console.error("Error inserting data:", err.message);
  }
};

// Example: Insert a user
insertUser("John Doe123", "john.doe123@example.com");

// Close the pool when done
process.on("exit", () => {
  pool.end(() => {
    console.log("Pool has ended");
  });
});
