import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

const originalQuery = db.query;
db.query = function (...args) {
  const [sql, params, callback] = args;
  console.log("SQL:", sql);
  if (typeof params === 'function') {
    // (sql, callback)
    return originalQuery.call(this, sql, (err, results) => {
      console.log("RESULTS:", results);
      params(err, results);
    });
  } else {
    // (sql, params, callback)
    console.log("PARAMS:", params);
    return originalQuery.call(this, sql, params, (err, results) => {
      console.log("RESULTS:", results);
      callback(err, results);
    });
  }
};

export default db;
