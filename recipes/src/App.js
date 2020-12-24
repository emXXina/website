import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import RecipeCard from './pages/recipeList/RecipeCard';

function App() {
  return (
    <Router>
      <Route path="/">
        <RecipeCard />
      </Route>
    </Router>
  );
}

export default App;
