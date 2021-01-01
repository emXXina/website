const IngredientCategory = require('../models/ingredient_categories.model');
const Recipe = require('../models/recipes.model');
const basics = require('./basics.controller');

exports.findOne = (req, res) => {
    IngredientCategory.findById(req.params.categoryId, basics.resultHandling(req, res,
        `Could not find ingredient_category with id ${req.params.categoryId}.`,
        `Error retrieving ingredient_category with id ${req.params.categoryId}.`));
};

exports.create = (req, res) => {
    basics.checkReqBody(req, res);

    // check if recipe id exists
    Recipe.findById(req.body.recipe_id, (err, data) => {
        if (err) {
            basics.errorHandling(req, res, err,
                `Recipe with id ${req.body.recipe_id} not found.`,
                `Error retrieving recipe with id ${req.body.recipe_id}.`);
        } else {
            const ingredientCategory = new IngredientCategory({
                name: req.body.name,
                recipe_id: req.body.recipe_id
            });
        
            IngredientCategory.create(ingredientCategory, basics.resultHandling(req, res,
                "Creating an ingredient_categoryshould not throw a 404 error.",
                "Some error occured while creating the ingredient category."));
        }
    })
}