const Recipe = require('../models/recipes.model');
const IngredientCategory = require('../models/ingredient_categories.model');
const Ingredient = require('../models/ingredients.model');
const Instruction = require('../models/instructions.model');
const basics = require('./basics.controller');

exports.create = (req, res) => {
    basics.checkReqBody(req, res);

    // Create recipe model
    const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description
    });

    // Save recipe 
    Recipe.create(recipe, (err, data) => {
        if (err) {
            basics.errorHandling(req, res, err,
                `Creating a recipe should not lead to a 404 error.`,
                `Some error occured while creating the recipe.`);
        } else {
            console.log("Instructions received: ", req.body.instruction);
            const recipe_id = data.id;
            createCategoriesAndIngredients(recipe_id, req.body.categories, req.body.ingredients);
            createInstructions(recipe_id, req.body.instructions);
            res.send(data);
        }
    });
}

function createCategoriesAndIngredients(recipe_id, categories, ingredients) {
    categories.map((category) => {
        // create category model
        const categoryModel = new IngredientCategory({
            name: category,
            recipe_id: recipe_id
        });

        // save category
        IngredientCategory.create(categoryModel, (err, data) => {
            if (err) {
                throw err;
            } else {
                // handle result of category creation
                const category_id = data.id;
                const ingredientsOfCategory = ingredients.filter((i) => {return i.category_name === category});
                ingredientsOfCategory.map((ingredient) => {
                    // create ingredient model
                    const ingredientModel =  new Ingredient({
                        name: ingredient.name,
                        unit: ingredient.unit,
                        quantity: ingredient.quantity,
                        category_id: category_id
                    });

                    // save ingredient
                    Ingredient.create(ingredientModel, (err, data) => {
                        if (err) throw err;
                    });
                });
            }
        });
    });
}

function createInstructions(recipe_id, instructions) {
    instructions.map((instruction, idx) => {
        // Create instruction model
        const instructionModel = new Instruction({
            text: instruction,
            position: idx +1,
            recipe_id: recipe_id
        });

        // Save instruction
        Instruction.create(instructionModel, (err, data) => {
            if (err) {
                throw err;
            }
        });
    });
}