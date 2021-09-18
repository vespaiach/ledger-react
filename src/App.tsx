import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { List } from './pages/Transaction';

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <List />
        </Route>
      </Switch>
    </Router>
  );
}
