// File: query.js

const pool = require("./pool");

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
// insertUser("John Doe1", "john.doe1@example.com");
// insertUser("John Doe12", "john.doe12@example.com");

// Fetching All Data
// To get all data from the users table, you can use a SELECT query.
const getAllUsers = async () => {
  const query = 'SELECT * FROM "users"';

  try {
    const result = await pool.query(query);
    console.log("All users:", result.rows); // Output all users
  } catch (err) {
    console.error("Error fetching data:", err.message);
  }
};

// Example: Fetch all users
getAllUsers();

// Updating Data
// To update a record in the users table, use an UPDATE query with a WHERE clause to specify the record.

// Close the pool when done
process.on("exit", () => {
  pool.end(() => {
    console.log("Pool has ended");
  });
});
