import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

import RecipeList from './pages/recipeList/RecipeList';
import RecipeDescription from './pages/recipeList/RecipeDescription';
import NavBar from './pages/navBar/NavBar';

import { makeStyles, useTheme } from '@material-ui/core/styles';

function App() {
  const theme = useTheme();
  const useStyles = makeStyles({
    main: {
      marginTop: '6rem',
      [theme.breakpoints.up('md')]: {
        marginTop: '12rem',
      },
    },
  });

  const classes = useStyles();

  return (
    <Router>
      <Route path="/">
        <Redirect to="/dashboard"/>
      </Route>
      <Route path="/dashboard">
        <header>
          <NavBar/>
        </header>
        <main className={classes.main}>
          <RecipeList recipes={getRecipes()} />
        </main>
      </Route>
    </Router>
  );
}

function getRecipes() {
  let recipes = [];

  const recipe1 = new RecipeDescription("Titel1", "Labels", "Beschreibung", "123");
  recipes.push(recipe1);

  const recipe2 = new RecipeDescription("Titel2", "Labels", "Beschreibung", "2");
  recipes.push(recipe2);

  const recipe3 = new RecipeDescription("Titel3", "Labels", "Beschreibung", "3");
  recipes.push(recipe3);

  const recipe4 = new RecipeDescription("Titel4", "Labels", "Beschreibung", "5");
  recipes.push(recipe4);

  const recipe5 = new RecipeDescription("Titel1", "Labels", "Beschreibung", "32");
  recipes.push(recipe5);

  const recipe6 = new RecipeDescription("Titel2", "Labels", "Beschreibung", "22");
  recipes.push(recipe6);

  const recipe7 = new RecipeDescription("Titel3", "Labels", "Beschreibung", "11");
  recipes.push(recipe7);

  const recipe8 = new RecipeDescription("Titel4", "Labels", "Beschreibung", "9");
  recipes.push(recipe8);

  return recipes;
}

export default App;
