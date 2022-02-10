import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import { Suspense, useState } from 'react';
import { Provider } from 'jotai';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Container, SwipeableDrawer } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { TransactionList } from './views/TransactionList';
import { SearchInput } from './views/SearchInput';
import { theme } from './theme';
import { ElevationScroll } from './components/ElevationScroll';

export function App() {
  const [searchPane, setSearchPane] = useState(false);

  return (
    <Provider>
      <Suspense fallback="Loading...">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <ElevationScroll>
              <AppBar>
                <Container disableGutters maxWidth="md">
                  <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="add" sx={{ mr: 2 }}>
                      <AddCircleIcon />
                    </IconButton>
                    <IconButton
                      size="large"
                      edge="end"
                      color="inherit"
                      aria-label="search"
                      sx={{ ml: 'auto' }}
                      onClick={() => setSearchPane(true)}>
                      <ManageSearchIcon />
                    </IconButton>
                  </Toolbar>
                </Container>
              </AppBar>
            </ElevationScroll>
            <Router>
              <Switch>
                <Route path="/" component={TransactionList} />
              </Switch>
            </Router>
            <SwipeableDrawer
              anchor="right"
              open={searchPane}
              onClose={() => setSearchPane(false)}
              onOpen={() => setSearchPane(true)}>
              <SearchInput onClose={() => setSearchPane(false)} />
            </SwipeableDrawer>
          </LocalizationProvider>
        </ThemeProvider>
      </Suspense>
    </Provider>
  );
}
