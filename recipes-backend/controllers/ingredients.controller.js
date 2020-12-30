const Ingredient = require('../models/ingredients.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log("req.body.name: ", req.body.name);
    console.log("req.body.unit: ", req.body.unit);
    console.log("req.body.quantity: ", req.body.quantity);
    console.log("req.body.category_id: ", req.body.category_id);

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
};