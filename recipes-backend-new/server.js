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
app.use(express.urlencoded({ extended: true }));    // helps tidying up the request object
app.use(express.json());                            // 'teaches' server to read json
app.use(express.static('public'));                  // makes 'public' folder accessible to the public


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
            console.log('Retrieved recipes');
        })
        .catch(error => console.log(error))
    })

    app.route('/backend/recipe')
        .post((request, response) => {
            recipes.insertOne(request.body)
            .then(result => {
                console.log(result);
            })
            .catch(error => console.error(error))
            response.redirect('/backend/');
        })
        .put((request, response) => {
            recipes.findOneAndUpdate(
                { name: 'Test' },   // filters the collection with key-value pairs
                {
                    $set: {
                        name: request.body.name,
                        description: request.body.description
                    }
                },
                {
                    upsert: true    // insert a document if no documents can be updated
                }
            )
            .then(result => {
                console.log(result);
                response.json('Success');
            })
            .catch(error => console.log(error))
        })
        .delete((request, response) => {
            recipes.deleteOne(
                { name: request.body.name },
            )
            .then(result => {
                if (result.deletedCount == 0) {
                    response.json('No recipe deleted.')
                } else {
                    response.json(`Deleted ${request.body.name} recipe.`);
                }
                console.log(result);
            })
            .catch(error => console.log(error))
        })
})