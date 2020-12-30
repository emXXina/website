const IngredientCategory = require('../models/ingredient_categories.model');

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