const Ingredient = require('../models/ingredients.model');
const IngredientCategory = require('../models/ingredient_categories.model');
const basics = require('./basics.controller');

exports.create = (req, res) => {
    basics.checkReqBody(req, res);

    // check if category_id exists
    IngredientCategory.findById(req.body.category_id, (err, data) => {
        if (err) {
            basics.errorHandling(req, res, err,
                `Ingredient category with id ${req.body.category_id} does not exist.`,
                `Error retrieving ingredient category with id ${req.body.category_id}.`)
        } else {
            const ingredient = new Ingredient({
                name: req.body.name,
                unit: req.body.unit,
                quantity: req.body.quantity,
                category_id: req.body.category_id
            });
        
            Ingredient.create(ingredient, basics.resultHandling(req, res,
                `Creating an ingredient should not throw an 404 error.`,
                `Some error occured while creating the ingredient.`));
        }
    })
};