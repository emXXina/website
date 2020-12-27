const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'www',
    password: 'LieberWeihnachtsmann20!',
    database: 'recipes_base'
})

connection.connect((err) => {
    if (err) {
        console.log("Not connected");
        throw err;
    } else {
        console.log("Connected");
    }
})

export default connection;