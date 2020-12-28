const Recipe = require('../models/recipes.model');

// Create and save a new recipe
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log("req.body.name: ", req.body.name);
    console.log("req.body.description: ", req.body.description);

    // Create a recipe
    const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description
    });

    // Save recipe in the database
    Recipe.create(recipe, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating the recipe."
            });
        } else {
            res.send(data);
        }
    })
};

// Retrieve all recipes from the database
exports.findAll = (req, res) => {
    Recipe.getAll((err, data) => {
        if (err) {
            res.status(500).data({
                message: err.message || "Some error occured while retrieving recipes."
            });
        } else {
            res.send(data);
        }
    });
};

// Find a single recipe with recipeId
exports.findOne = (req, res) => {
    Recipe.findById(req.params.recipeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found recipe with id ${req.params.recipeId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving recipe with id ${req.params.recipeId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};