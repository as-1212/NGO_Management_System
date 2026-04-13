const mysql = require('mysql2');
require('dotenv').config({ path: './.env' });

console.log("ENV CHECK:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
const db = mysql.createConnection({
    host:  "localhost",
    user:  "root",
   password:   "pass",
    database:   "ngo_management"
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log("Database Connected Successfully");
});

module.exports = db;
