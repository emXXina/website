const basics = require('./basics.model');

// constructor
const Recipe = function(recipe) {
    this.name = recipe.name;
    this.description = recipe.description;
};

Recipe.create = (newRecipe, result) => {
    basics.create(result, "recipes", newRecipe);
};

Recipe.findById = (recipeId, result) => {
    basics.findByIdInTable(recipeId, result, "recipes");
};

Recipe.getAll = result => {
    basics.getAll(result, "recipes");
};

module.exports = Recipe;