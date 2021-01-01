const sql = require('./db.js');
const basics = require('./basics.model');

const IngredientCategory = function(category) {
    this.name = category.name;
    this.recipe_id = category.recipe_id;
}

IngredientCategory.create = (newIngredientCategory, result) => {
    basics.create(result, "ingredient_categories", newIngredientCategory);
};

IngredientCategory.findById = (categoryId, result) => {
    basics.findByIdInTable(categoryId, result, "ingredient_categories");
};

module.exports = IngredientCategory;