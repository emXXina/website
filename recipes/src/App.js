import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import RecipeList from './pages/RecipeList/RecipeList';

function App() {
  return (
    <Router>
      <Route path='/'>
        <main>
          <RecipeList/>
        </main>
      </Route>
    </Router>
  );
}

export default App;
