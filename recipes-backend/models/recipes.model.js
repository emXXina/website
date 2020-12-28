const sql = require("./db.js");

// constructor
const Recipe = function(recipe) {
    this.name = recipe.name;
    this.description = recipe.description;
};

Recipe.create = (newRecipe, result) => {
    sql.query('INSERT INTO recipes SET ?', newRecipe, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created recipe: ", {id: res.insertId, ...newRecipe});
        result(null, {id: res.insertId, ...newRecipe});
    });
};

Recipe.findById = (recipeId, result) => {
    sql.query(`SELECT * FROM recipes WHERE id = ${recipeId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found recipe: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found recipe with the id
        result({ kind: "not_found"}, null);
    });
};

Recipe.getAll = result => {
    sql.query('SELECT * FROM recipes', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("recipes: ", res);
        result(null, res);
    });
};

module.exports = Recipe;