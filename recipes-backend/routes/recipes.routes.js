var express = require('express');
var router = express.Router();
const recipes = require('../controllers/recipe.controller.js');

// Create a new recipe
router.post('/', recipes.create);

// Retrieve all recipes
router.get('/', recipes.findAll);

// Retrieve a single recipe with recipeId
router.get('/:recipeId', recipes.findOne)

module.exports = router;
