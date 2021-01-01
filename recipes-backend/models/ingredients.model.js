const sql = require('./db.js');
const basics = require('./basics.model');

// constructor
const Ingredient = function(ingredient) {
    this.name = ingredient.name;
    this.unit = ingredient.unit;
    this.quantity = ingredient.quantity;
    this.category_id = ingredient.category_id;
};

Ingredient.create = (newIngredient, result) => {
    basics.create(result, "ingredients", newIngredient);
};

Ingredient.findByCategoryId = (category_id, result) => {
    basics.getAllWhere(result, "ingredients", `category_id = ${category_id}`);
};

module.exports = Ingredient;