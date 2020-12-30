const IngredientCategory = require('../models/ingredient_categories.model');
const Recipe = require('../models/recipes.model');

exports.findOne = (req, res) => {
    IngredientCategory.findById(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ingredient_category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ingredient_category with id ${req.params.categoryId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // check if recipe id exists
    Recipe.findById(req.body.recipe_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Recipe with id ${req.body.recipe_id} does not exist.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving recipe with id ${req.body.recipe_id}.`
                });
            }
        } else {
            const ingredientCategory = new IngredientCategory({
                name: req.body.name,
                recipe_id: req.body.recipe_id
            });
        
            IngredientCategory.create(ingredientCategory, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occured while creating the ingredient category."
                    });
                } else {
                    res.send(data);
                }
            });
        }
    })
}