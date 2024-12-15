// File: useEnvPool.js

const pool = require("./poolEnv");

async function fetchData() {
  try {
    const res = await pool.query("SELECT * FROM users");
    console.log(res.rows);
  } catch (err) {
    console.error("Error:", err.stack);
  }
}

fetchData();
