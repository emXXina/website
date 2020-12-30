const sql = require('./db.js');

// constructor
const Ingredient = function(ingredient) {
    this.name = ingredient.name;
    this.unit = ingredient.unit;
    this.quantity = ingredient.quantity;
    this.category_id = ingredient.category_id;
};

Ingredient.create = (newIngredient, result) => {
    sql.query('INSERT INTO ingredients SET ?', newIngredient, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created ingredient: ", {id: res.insertId, ...newIngredient});
        result(null, {id: res.insertId, ...newIngredient});
    });
};

module.exports = Ingredient;