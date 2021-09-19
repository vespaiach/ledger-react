import { useRef } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Skeleton } from '../components/Skeleton';
import { CommandFunc, AppCommand } from '../types';
import { Edit as TransactionForm } from './Transaction/Edit';

interface MasterProps {
  children: React.ReactNode;
}

export function Master({ children }: MasterProps) {
  const history = useRef(createMemoryHistory()).current;

  const handleCommand: CommandFunc = (command, data) => {
    if (command === AppCommand.AddTransaction) {
      history.push('/transaction/add');
    }
  };

  const handleClosePane = () => {
    history.goBack();
  };

  return (
    <>
      <Skeleton onCommand={handleCommand}>{children}</Skeleton>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/transaction/add"
            render={() => <TransactionForm onClose={handleClosePane} history={history} />}
          />
        </Switch>
      </Router>
    </>
  );
}
