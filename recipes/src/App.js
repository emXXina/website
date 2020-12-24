import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import Clock from './pages/Clock/clock';
import CurrencyCalculator from './pages/CurrencyCalculator/CurrencyCalculator';
import MagicTable from './pages/MagicTable/MagicTable';

function App() {
  return (
    <Router>
      <Route path='/' exact  component={Clock} />
      <Route path='/CurrencyCalculator' component={CurrencyCalculator} />
      <Route path={['/MagicTable', '/Table']} component={MagicTable} />
    </Router>
  );
}

export default App;
