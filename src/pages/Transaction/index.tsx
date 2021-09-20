import { Switch, Route, MemoryRouter } from 'react-router-dom';

import { Edit as TransactionForm } from './Edit';
import { TransactionList } from './List';
import { TransactionDetail } from './Detail';

export default function Master() {
  return (
    <MemoryRouter>
      <TransactionList />
      <Switch>
        <Route path="/transaction/detail/:id" component={TransactionDetail} />
        <Route path="/transaction/add" component={TransactionForm} />
      </Switch>
    </MemoryRouter>
  );
}
