const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "porto"
});


db.getConnection(() => {
    console.log("Connection stablished");
});

module.exports = db;