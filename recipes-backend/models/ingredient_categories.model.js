const sql = require('./db.js');

const IngredientCategory = function(category) {
    this.name = category.name;
    this.recipe_id = category.recipe_id;
}

IngredientCategory.create = (newIngredientCategory, result) => {
    sql.query('INSERT INTO ingredient_categories SET ?', newIngredientCategory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created ingredient_category: ", {id: res.insertId, ...newIngredientCategory});
        result(null, {id: res.insertId, ...newIngredientCategory});
    });
};

IngredientCategory.findById = (categoryId, result) => {
    sql.query(`SELECT * FROM ingredient_categories WHERE id = ${categoryId}`, (err, res) => {
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

module.exports = IngredientCategory;