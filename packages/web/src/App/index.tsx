import { Container, makeStyles } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NotFound from '../routes/Errors/NotFound';
import Reports from '../routes/Reports';
import Transactions from '../routes/Transactions';
import DialogPanel from '../components/DialogPanel';
import Signin from '../routes/Signin';
import TopNav from './TopNav';
import { AppRootState } from '../types.d';
import { closeSigninAction, userSignoutAction } from '../actions/auth';
import { transactionRequestAction } from '../actions/trans';
import Alert from './Alert';

const useStyles = makeStyles((theme) => ({
  successSnackbar: {
    '& .MuiSnackbarContent-root': {
      background: theme.palette.success.main,
    },
  },
  botGap: {
    height: theme.spacing(5),
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const showSigninDialog = useSelector<AppRootState, boolean>(
    (state) => state.wholeApp.showSigninDialog
  );
  const year = useSelector<AppRootState, number>((state) => state.transaction.year);

  const handleSignOut = () => dispatch(userSignoutAction());
  const handleRefesh = () => dispatch(transactionRequestAction(year));

  return (
    <>
      <TopNav onRefesh={handleRefesh} onSignout={handleSignOut} />
      <Switch>
        <Route exact path="/transactions">
          <Transactions />
        </Route>
        <Route exact path="/reports">
          <Reports />
        </Route>
        <Route exact path="/">
          <Redirect to="/transactions" />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <DialogPanel
        open={showSigninDialog}
        title="Sign In"
        onClose={() => dispatch(closeSigninAction())}>
        <Container maxWidth="xs">
          <Signin />
        </Container>
      </DialogPanel>
      <Alert />
      <div className={classes.botGap} />
    </>
  );
}

export default App;
