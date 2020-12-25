import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

import RecipeCard from './pages/recipeList/RecipeCard';

function App() {
  return (
    <Router>
      <Route path="/">
        <Redirect to="/dashboard"/>
      </Route>
      <Route path="/dashboard">
        <main>
          <RecipeCard/>
        </main>
      </Route>
    </Router>
  );
}

export default App;
