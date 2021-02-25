const mysql = require("mysql");
const dbConfig = require("../config/dbConfig.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
  port: dbConfig.PORT
});

  connection.connect(error => {
    if (error) console.log(error);
    console.log("Successfully connected to the database.");
  });



module.exports = connection;