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
 * Handle requests
 */
app.get('/', (request, response) => {
    // sendFile tells express to serve the index.html file
    // __dirname is the current directory
    response.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (request, response) => {
    console.log(request.body);
})