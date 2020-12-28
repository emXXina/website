import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import RecipeList from './components/recipeList/RecipeList';
import NavBar from './components/navBar/NavBar';
import Recipe from './components/recipes/Recipe';

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
      <header>
        <NavBar/>
      </header>
      <main className={classes.main}>
        <Switch>
          <Route path="/rezept/:id">
            <Recipe/>
          </Route>
          <Route path="/" exact>
            <RecipeList/>
          </Route>
          <Route path="/">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
