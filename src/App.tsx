import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import { Suspense } from 'react';
import { Provider } from 'jotai';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { TransactionList } from './pages/TransactionList';
import { theme } from './theme';

export function App() {
  return (
    <Provider>
      <Suspense fallback="Loading...">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path="/">
                <TransactionList />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </Suspense>
    </Provider>
  );
}
