import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { TransactionList } from './pages/TransactionList';
import { theme } from './theme';
import { Panes } from './panes';
import { AppState } from './store';
import { updateField } from './store/Shared/action';
import { useEffect, useState } from 'react';

export function App() {
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const shared = useSelector((state: AppState) => state.shared);

  useEffect(() => {
    if (shared.error) {
      setShowError(true);
    }
  }, [shared]);

  const clearError = () => dispatch(updateField('error', ''));

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
          open={showError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={4000}
          TransitionProps={{ onExited: clearError }}
          onClose={() => setShowError(false)}>
          <Alert
            severity="error"
            variant="filled"
            sx={{ minWidth: '200px' }}
            onClose={() => setShowError(false)}>
            {shared.error}
          </Alert>
        </Snackbar>
      </Router>
    </ThemeProvider>
  );
}
