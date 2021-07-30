/**
 * Create server
 */
const express = require('express');
const app = express();

/**
 * Enable connection from browsers to server
 */
const port = process.env.PORT || '3001';
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})

/**
 * Use middleware
 */
// urlencoded helps tidying up the request object
app.use(express.urlencoded({ extended: true })); 

/**
 * Handle requests without database access
 */
app.get('/', (request, response) => {
    // sendFile tells express to serve the index.html file
    // __dirname is the current directory
    response.sendFile(__dirname + '/index.html');
})


/**
 * Connect to MongoDB
 */
const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config/mongoDB');

let database;

MongoClient.connect(dbConfig.url, (error, client) => {
    if (error) {
        return console.error(error)
    };

    database = client.db(dbConfig.database);
    console.log(`Successfully connected to MongoDB to database: ${dbConfig.database}.`);

    /**
     * Handle requests which require a database
     */
    app.post('/quotes', (request, response) => {
        response.send(request.body);
    })
})