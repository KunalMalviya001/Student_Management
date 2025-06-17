// Import the mysql2 library for interacting with a MySQL database
import mysql from 'mysql2';

// Import and configure dotenv to load environment variables from a .env file
import dotenv from 'dotenv';
dotenv.config();

// Create a connection pool to manage multiple MySQL connections efficiently
const pool = mysql.createPool({
  host: process.env.DB_HOST,                    // Database host (e.g., localhost)
  port: Number(process.env.DB_PORT) || 3306,    // Database port, defaulting to 3306 if not set
  user: process.env.DB_USER,                    // Database username
  password: process.env.DB_PASSWORD,            // Database password
  database: process.env.DB_NAME,                // Name of the database to connect to
  waitForConnections: true,                     // Wait if no connections are available
  connectionLimit: 10,                          // Maximum number of connections in the pool
  connectTimeout: 10000                         // 10 seconds instead of default
});

// Promisify the pool to use async/await syntax
const db = pool.promise();

// Export the db object so it can be used in other parts of the application
export default db;
