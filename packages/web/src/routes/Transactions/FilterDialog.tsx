/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import {
  InputAdornment,
  Container,
  Grid,
  Checkbox,
  Box,
  Typography,
  Divider,
  TextField,
  Switch,
} from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  AttachMoneyRounded as AttachMoneyRoundedIcon,
  CalendarTodayRounded as CalendarTodayRoundedIcon,
} from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, Theme } from '@material-ui/core/styles';

import DialogPanel from '../../components/DialogPanel';
import { Action } from '../../types';
import {
  amountFilterEnableRequest,
  amountFromFilterRequest,
  amountToFilterRequest,
  dateFilterEnableRequest,
  dateFromFilterRequest,
  dateToFilterRequest,
  expenseFilterAction,
  incomeFilterAction,
} from '../../actions/trans';

const useStyles = makeStyles<Theme, { [key: string]: boolean }>((theme) => ({
  checkboxTypo: {
    flexGrow: 1,
  },
  boxIncome: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
  boxExpense: {
    marginBottom: theme.spacing(1),
  },
  subTextAmount: {
    marginBottom: theme.spacing(3),
    color: (props) =>
      props.allowAmountFilter === false ? theme.palette.text.disabled : theme.palette.text.primary,
  },
  subTextDate: {
    marginBottom: theme.spacing(3),
    color: (props) =>
      props.allowDateFilter === false ? theme.palette.text.disabled : theme.palette.text.primary,
  },
  textAmount: {
    color: (props) =>
      props.allowAmountFilter === false ? theme.palette.text.disabled : theme.palette.text.primary,
  },
  textDate: {
    color: (props) =>
      props.allowDateFilter === false ? theme.palette.text.disabled : theme.palette.text.primary,
  },
  boxSlider: {
    marginBottom: theme.spacing(2),
  },
  boxMinMax: {
    '& > div + div': {
      marginLeft: theme.spacing(2),
    },
    marginBottom: theme.spacing(2),
  },
  boxDate: {
    '& .MuiTextField-root + .MuiTextField-root': {
      marginTop: theme.spacing(3),
    },
  },
}));

function parseNumber(val: string) {
  try {
    const num = parseFloat(val);
    if (num > 0) {
      return num;
    }
  } catch (e) {
    console.error(e);
  }
  return 0;
}

interface FilterDialogProps {
  open: boolean;
  dateFrom: Date | null;
  dateTo: Date | null;
  amountFrom: number | null;
  amountTo: number | null;
  showIncome: boolean;
  showExpense: boolean;
  allowDateFilter: boolean;
  allowAmountFilter: boolean;
  dispatch: (a: Action | Omit<Action, 'payload'>) => Action | Omit<Action, 'payload'>;
  onClose: () => void;
  onReset: () => void;
}

export default function FilterDialog({
  open,
  dateFrom,
  dateTo,
  amountFrom,
  amountTo,
  showIncome,
  showExpense,
  allowDateFilter,
  allowAmountFilter,
  dispatch,
  onClose,
  onReset,
}: FilterDialogProps) {
  const classes = useStyles({
    allowAmountFilter,
    allowDateFilter,
  });

  return (
    <DialogPanel title="Filters" open={open} onClose={onClose} onReset={onReset}>
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" className={classes.boxIncome}>
              <Box flexGrow="1">
                <Typography variant="h6">Income</Typography>
                <Typography variant="body2">Show income transactions</Typography>
              </Box>
              <Checkbox
                inputProps={{ 'aria-label': 'primary checkbox' }}
                checked={showIncome}
                value={showIncome}
                onChange={(evt) => {
                  dispatch(incomeFilterAction(evt.target.checked));
                }}
              />
            </Box>
            <Box display="flex" alignItems="center" className={classes.boxExpense}>
              <Box flexGrow="1">
                <Typography variant="h6">Expense</Typography>
                <Typography variant="body2">Show expense transactions</Typography>
              </Box>
              <Checkbox
                inputProps={{ 'aria-label': 'primary checkbox' }}
                checked={showExpense}
                value={showExpense}
                onChange={(evt) => {
                  dispatch(expenseFilterAction(evt.target.checked));
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex">
              <Box flexGrow="1" marginRight={4}>
                <Typography variant="h6" classes={{ root: classes.textAmount }}>
                  Amount
                </Typography>
                <Typography variant="body2" classes={{ root: classes.subTextAmount }}>
                  Filter transactions by amount range
                </Typography>
              </Box>
              <Switch
                checked={allowAmountFilter}
                edge="end"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                onChange={(evt) => dispatch(amountFilterEnableRequest(evt.target.checked))}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              className={classes.boxMinMax}>
              <TextField
                disabled={!allowAmountFilter}
                value={amountFrom}
                label="Min amount"
                size="small"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyRoundedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(evt) => {
                  dispatch(amountFromFilterRequest(parseNumber(evt.target.value)));
                }}
              />
              <div> - </div>
              <TextField
                disabled={!allowAmountFilter}
                value={amountTo}
                label="Max amount"
                type="number"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyRoundedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(evt) => {
                  dispatch(amountToFilterRequest(parseNumber(evt.target.value)));
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex">
              <Box flexGrow="1" marginRight={4}>
                <Typography variant="h6" classes={{ root: classes.textDate }}>
                  Date
                </Typography>
                <Typography variant="body2" classes={{ root: classes.subTextDate }}>
                  Filter transactions by date range
                </Typography>
              </Box>
              <Switch
                edge="end"
                checked={allowDateFilter}
                onChange={(evt) => dispatch(dateFilterEnableRequest(evt.target.checked))}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Box>
            <div className={classes.boxDate}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  disabled={!allowDateFilter}
                  clearable
                  size="small"
                  label="From date"
                  format="MMM do, yyyy HH:mm"
                  value={dateFrom}
                  onChange={(value) => dispatch(dateFromFilterRequest(value))}
                  fullWidth
                  inputVariant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  disabled={!allowDateFilter}
                  clearable
                  size="small"
                  label="To date"
                  format="MMM do, yyyy HH:mm"
                  value={dateTo}
                  onChange={(value) => dispatch(dateToFilterRequest(value))}
                  fullWidth
                  inputVariant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </Grid>
        </Grid>
      </Container>
    </DialogPanel>
  );
}
