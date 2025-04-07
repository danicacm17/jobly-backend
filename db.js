"use strict";
/** Database setup for jobly. */
require("dotenv").config();
const { Pool } = require("pg");

// Create a new Pool instance
const pool = new Pool({
  user: process.env.DB_USER,         // The user for the PostgreSQL database
  password: process.env.DB_PASSWORD, // The password for the database user
  host: process.env.DB_HOST,         // Database host (e.g., 'localhost')
  port: process.env.DB_PORT,         // Database port (default: 5432)
  database: process.env.DB_NAME,     // Database name (e.g., 'jobly')
});


// Export the pool so other parts of the application can use it
module.exports = pool;
