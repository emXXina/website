import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

import RecipeList from './pages/recipeList/RecipeList';
import RecipeDescription from './pages/recipeList/RecipeDescription';

function App() {
  return (
    <Router>
      <Route path="/">
        <Redirect to="/dashboard"/>
      </Route>
      <Route path="/dashboard">
        <main>
          <RecipeList recipes={getRecipes()} />
        </main>
      </Route>
    </Router>
  );
}

function getRecipes() {
  let recipes = [];

  const recipe1 = new RecipeDescription("Titel1", "Labels", "Beschreibung");
  recipes.push(recipe1);

  const recipe2 = new RecipeDescription("Titel2", "Labels", "Beschreibung");
  recipes.push(recipe2);

  const recipe3 = new RecipeDescription("Titel3", "Labels", "Beschreibung");
  recipes.push(recipe3);

  const recipe4 = new RecipeDescription("Titel4", "Labels", "Beschreibung");
  recipes.push(recipe4);

  return recipes;
}

export default App;
