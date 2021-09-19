import { useRef } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Skeleton } from '../components/Skeleton';
import { CommandFunc, AppCommand } from '../types';
import { Edit as TransactionForm } from './Transaction/Edit';
import { PaneHistory } from '../contexts/paneHistory';

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

  return (
    <PaneHistory.Provider value={history}>
      <Skeleton onCommand={handleCommand}>{children}</Skeleton>
      <Router history={history}>
        <Switch>
          <Route exact path="/transaction/add" render={() => <TransactionForm />} />
        </Switch>
      </Router>
    </PaneHistory.Provider>
  );
}
