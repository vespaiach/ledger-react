import { Switch, Route, MemoryRouter } from 'react-router-dom';

import { Edit as TransactionForm } from './Edit';
import { TransactionList } from './List';

export default function Master() {
  return (
    <MemoryRouter>
      <TransactionList />
      <Switch>
        <Route exact path="/transaction/add" component={TransactionForm} />
      </Switch>
    </MemoryRouter>
  );
}
