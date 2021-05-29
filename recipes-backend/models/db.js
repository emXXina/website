const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

// const connection = mysql.createConnection(dbConfig);

// open the MySQL connection
// connection.connect(error => {
//     if (error) {
//         console.log("ERROR 1234: ");
//         throw error;
//     }
//     console.log("Successfully connected to database.");
// });


function establishConnection() {
    // Recreate the connection since the old one cannot be reused.
    connection = mysql.createConnection(dbConfig); 

    // The server is either down or restarting which could take a while.
    connection.connect(function(error) {
        if (error) {
            console.log("Error while reconnecting to database: ", error);
            setTimeout(establishConnection, 2000);
        } else {
            console.log("Successfully connected to database.");
        }
    });

    connection.on("error", function(error) {
        console.log("Connection to database lost: ", error);
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
            establishConnection();
        } else {
            throw error;
        }
    })
}

var connection;
establishConnection();

module.exports = () => connection;