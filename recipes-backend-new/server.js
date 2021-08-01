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
 * Create HTTPS server
 */
var https = require('https');
var fs = require('fs');
var server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/archive/finnupa.de/privkey5.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/archive/finnupa.de/fullchain5.pem')
}, app);


/**
 * Enable connection from browsers to server
 */
const port = process.env.PORT || '3001';
server.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})


/**
 * Use middleware
 */
app.use(express.urlencoded({ extended: true }));    // helps tidying up the request object
app.use(express.json());                            // 'teaches' server to read json
app.use(express.static('public'));                  // makes 'public' folder accessible to the public
var cors = require('cors');
app.use(cors({                                      // configures CORS and enables it for all routes
    // configures the Access-Control-Allow-Origin CORS header
    // will accept any request from these origins
    origin: ['http://finnupa.de:3000', 'https://finnupa.de'],
    // success status added to handle some legacy browsers (IE11, various Smart TVs) as they don't loke 204
    optionsSuccessStatus: 200
}));
  


/**
 * Connect to MongoDB
 */
const { MongoClient, ObjectId} = require('mongodb');
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
        .get((request, response) => {
            recipes.find().toArray()
            .then(result => {
                response.json(result);
            })
            .catch(error => console.log(error))
        })
        .post((request, response) => {
            recipes.insertOne(request.body)
            .then(result => {
                const id = result.insertedId.toHexString();
                response.json({ id: id });
                console.log(result);
            })
            .catch(error => console.error(error))
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

    app.route('/backend/recipe/:id')
        .get((request, response) => {
            const id = request.params.id;
            console.log(`Retrieving information about recipe with id = ${id}...`);

            const object_id = new ObjectId(id);
            recipes.find({ _id: object_id }).toArray()
            .then(result => {
                console.log(result[0]);
                response.json(result[0]);
            })
            .catch(error => console.log(error))
        })
        .put((request, response) => {
            recipes.findOneAndUpdate(
                { _id: new ObjectId(request.params.id) },
                {
                    $set: {
                        name: request.body.name,
                        description: request.body.description,
                        ingredientsInCategories: request.body.ingredientsInCategories,
                        instructions: request.body.instructions
                    }
                }
            )
            .then(result => {
                console.log(result);
                response.json(result);
            })
            .catch(error => console.log(error))
        })
})