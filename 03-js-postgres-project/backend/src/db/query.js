// File: query.js

const pool = require("./pool");

// Insert data into the "user" table
const insertUser = async (name, email, id) => {
  const query = 'INSERT INTO "users" (name, email, id) VALUES ($1, $2, $3) RETURNING *';

  try {
    const result = await pool.query(query, [name, email, id]);
    console.log("User added:", result.rows[0]); // Output the inserted user
  } catch (err) {
    console.error("Error inserting data:", err.message);
  }
};

// Example: Insert a user
// insertUser("John Doe12212", "john.doe121@example.com", "1");
// insertUser("John Doe12323", "john.doe1212@example.com", "2");

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
const updateUser = async (id, newName, newEmail) => {
  const query =
    'UPDATE "users" SET name = $1, email = $2 WHERE id = $3 RETURNING *';

  try {
    const result = await pool.query(query, [newName, newEmail, id]);
    console.log("Updated user:", result.rows[0]); // Output the updated user
  } catch (err) {
    console.error("Error updating data:", err.message);
  }
};

// Example: Update a user
// updateUser(1, "Jane Doe", "jane.doe@example.com");

// Deleting Data
// To delete a record, use a DELETE query with a WHERE clause.
const deleteUser = async (id) => {
  const query = 'DELETE FROM "users" WHERE id = $1 RETURNING *';

  try {
    const result = await pool.query(query, [id]);
    console.log("Deleted user:", result.rows[0]); // Output the deleted user
  } catch (err) {
    console.error("Error deleting data:", err.message);
  }
};

// Example: Delete a user
// deleteUser(1);

// Delete All Data
const deleteAllUsers = async () => {
  const query = 'DELETE FROM "users"';

  try {
    const result = await pool.query(query);
    console.log("All users have been deleted.");
  } catch (err) {
    console.error("Error deleting all users:", err.message);
  }
};

// Example: Delete all users
// deleteAllUsers();

// Alternative: If you're working in development and want to reset the table (remove all data and reset the primary key sequence), you can use the TRUNCATE command.
const truncateUsers = async () => {
  const query = 'TRUNCATE TABLE "users" RESTART IDENTITY';

  try {
    await pool.query(query);
    console.log("Users table has been truncated.");
  } catch (err) {
    console.error("Error truncating the users table:", err.message);
  }
};

// Example: Truncate the table
// truncateUsers();



// Close the pool when done
process.on("exit", () => {
  pool.end(() => {
    console.log("Pool has ended");
  });
});
