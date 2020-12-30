const Ingredient = require('../models/ingredients.model');
const IngredientCategory = require('../models/ingredient_categories.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // check if category_id exists
    IngredientCategory.findById(req.body.category_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Ingredient category with id ${req.body.category_id} does not exist.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ingredient category with id ${req.body.category_id}.`
                });
            }
        } else {
            const ingredient = new Ingredient({
                name: req.body.name,
                unit: req.body.unit,
                quantity: req.body.quantity,
                category_id: req.body.category_id
            });
        
            Ingredient.create(ingredient, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occured while creating the ingredient."
                    });
                } else {
                    res.send(data);
                }
            })
        }
    })
};