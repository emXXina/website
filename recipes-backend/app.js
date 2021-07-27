var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const recipes = require('./controllers/recipe.controller.js');
app.post('/backend/recipes', recipes.create);
app.get('/backend/recipes', recipes.findAll);
app.get('/backend/recipes/:recipeId', recipes.findOne);

const ingredients = require('./controllers/ingredients.controller.js');
app.post('/backend/ingredients', ingredients.create);
app.get('/backend/ingredients/givenCategory/:categoryId', ingredients.findByCategoryId);

const ingredientCategories = require('./controllers/ingredient_categories.controller.js');
app.get('/backend/ingredient_categories/givenRecipe/:recipeId', ingredientCategories.findWithRecipeId);
app.get('/backend/ingredient_categories/:categoryId', ingredientCategories.findOne);
app.post('/backend/ingredient_categories', ingredientCategories.create);

const instructions = require('./controllers/instructions.controller.js');
app.post('/backend/instructions', instructions.create);
app.get('/backend/instructions/givenRecipe/:recipeId/givenPosition/:position', instructions.getByRecipeNPosition);
app.get('/backend/instructions/givenRecipe/:recipeId', instructions.getByRecipeId);

const fullRecipes = require('./controllers/fullRecipe.controller.js');
app.post('/backend/fullRecipe', fullRecipes.create);


// Since this is the last non-error-handling
// middleware use(), we assume 404, as nothing else
// responded.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("404 not found error");
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
