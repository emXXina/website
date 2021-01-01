const Recipe = require('../models/recipes.model');
const basics = require('./basics.controller');

// Create and save a new recipe
exports.create = (req, res) => {
    basics.checkReqBody(req, res);

    // Create
    const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description
    });

    // Save
    Recipe.create(recipe, basics.resultHandling(req, res,
        `Creating a recipe should not throw a 404 error.`,
        `Some error occured while creating the recipe.`));
};


exports.findAll = (req, res) => {
    Recipe.getAll(basics.resultHandling(req, res,
        `Getting all recipes should not throw an 404 error.`,
        `Some error occured while retrieving all recipes.`));
};


exports.findOne = (req, res) => {
    Recipe.findById(req.params.recipeId, basics.resultHandling(req, res,
        `Recipe with id ${req.params.recipeId} not found.`,
        `Error retrieving recipe with id ${req.params.recipeId}.`));
};