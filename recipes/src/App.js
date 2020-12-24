import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import Clock from './pages/Clock/clock';
import CurrencyCalculator from './pages/CurrencyCalculator/CurrencyCalculator';
import MagicTable from './pages/MagicTable/MagicTable';

function App() {
  return (
    <Router>
      <Route path='/'>
        {42 == 41 ? <Redirect to="/CurrencyCalculator/USD/EURO"/> : <Clock/>}
      </Route>
      <Route path={['/CurrencyCalculator/', '/CurrencyCalculator/:currency1/:currency2']} exact component={CurrencyCalculator} />
      <Route path={['/MagicTable', '/Table']} component={MagicTable} />
    </Router>
  );
}

export default App;
