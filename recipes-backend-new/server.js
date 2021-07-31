/**
 * Create server
 */
const express = require('express');
const app = express();

/**
 * Set up view engine: EJS (Embedded JavaScript)
 * enables use of a template engine to generate HTML
 * using EJS because it's the easiest to start with
 * Must come before any app.use, app.get or app.post
 */
app.set('view engine', 'ejs');

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
 * Connect to MongoDB
 */
const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config/mongoDB');

MongoClient.connect(dbConfig.url, (error, client) => {
    if (error) {
        return console.error(error)
    };

    const database = client.db(dbConfig.database);
    const recipes = database.collection('recipes')
    console.log(`Successfully connected to MongoDB to database: ${dbConfig.database}.`);

    /**
     * Handle requests which require a database
     */
     app.get('/backend/', (request, response) => {
        recipes.find().toArray()
        .then(result => {
            response.render('index.ejs', {recipes: result});
            console.log(result);
        })
        .catch(error => console.log(error))
    })

    app.post('/backend/recipe', (request, response) => {
        recipes.insertOne(request.body).then(result => {
            console.log(result);
        }).catch(error => {
            console.error(error);
        });
        response.redirect('/backend/');
    })
})