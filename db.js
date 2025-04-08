"use strict";
/** Database setup for jobly. */
require("dotenv").config();
const { Pool } = require("pg");

let db;

if (process.env.DATABASE_URL) {
  // Use DATABASE_URL (Render/Supabase)
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Use local .env config (for development)
  db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
}

module.exports = db;
