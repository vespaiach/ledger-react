import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Backdrop, CircularProgress, IconButton, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Close as CloseIcon } from '@mui/icons-material';

import { TransactionList } from './pages/TransactionList';
import { theme } from './theme';
import { Panes } from './panes';
import { AppState } from './store';
import { updateField } from './store/Shared/action';

export function App() {
  const dispatch = useDispatch();
  const shared = useSelector((state: AppState) => state.shared);

  const handleCloseError = () => dispatch(updateField('error', ''));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/">
            <TransactionList />
          </Route>
        </Switch>
        <Panes />
        {shared.loading && (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Snackbar
          open={Boolean(shared.error)}
          autoHideDuration={4000}
          onClose={handleCloseError}
          TransitionProps={{ onExited: handleCloseError }}
          message={shared.error}
          action={
            <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleCloseError}>
              <CloseIcon />
            </IconButton>
          }
        />
      </Router>
    </ThemeProvider>
  );
}
