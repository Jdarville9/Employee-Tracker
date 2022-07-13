const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "CrazyFish33!",
    database: "employees",
  },
  console.log("You are now connected to the employee db!")
);

module.exports = db;
