import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AttachMoneyRounded as DollarIcon } from '@mui/icons-material';

import { PageHeader } from '../components/PageHeader';
import { Pane, PaneCommand } from '../components/Pane';
import { Transaction } from '../graphql.generated';
import { useTransaction } from '../hooks/useTransaction';
import { AppState } from '../store';
import { popPane } from '../store/Pane/action';
import { requestReasons } from '../store/Reason/action';
import { PaneCommonProps } from '../types';
import { MoneyInput } from '../components/MoneyInput';

enum Mode {
  Create,
  Edit,
}

interface TransactionFormProps extends PaneCommonProps {}

type TransactionInput = Partial<Omit<Transaction, 'updatedAt'>>;

export function TransactionForm({ state }: TransactionFormProps) {
  const dispatch = useDispatch();
  const reasons = useSelector((state: AppState) => state.reason.data);
  const transaction = useTransaction(state?.id);
  const mode = transaction ? Mode.Edit : Mode.Create;

  const handlePaneCommand = (command: PaneCommand) => {
    switch (command) {
      case PaneCommand.Close:
        dispatch(popPane());
        break;
    }
  };

  const initialValues: TransactionInput =
    mode === Mode.Edit
      ? {
          id: transaction?.id,
          amount: transaction?.amount,
          date: new Date(transaction?.date),
          reason: transaction?.reason,
          description: transaction?.description,
        }
      : {};

  const handleValidate = (values: TransactionInput) => {
    const errorMessages: Record<string, string> = {};

    if (!values.amount) {
      errorMessages.amount = 'You must enter amount';
    }

    if (!values.date) {
      errorMessages.date = 'You must enter a date';
    }

    if (!values.reason) {
      errorMessages.reason = 'You must enter a reason to category you transaction';
    }

    console.log(values)
    return errorMessages;
  };

  useEffect(() => {
    if (!reasons.length) {
      dispatch(requestReasons());
    }
  }, [reasons, dispatch]);

  return (
    <Pane onCommand={handlePaneCommand} commands={[PaneCommand.Save, PaneCommand.Close]}>
      <PageHeader text={mode === Mode.Create ? 'Add Transaction' : 'Update Transaction'} />
      <Formik
        initialValues={initialValues}
        onSubmit={() => Promise.resolve()}
        validate={handleValidate}
      >
        {({ values, setFieldValue, errors }) => {
          return (
            <Box
              sx={{
                '& .MuiTextField-root': { mb: 1, width: '100%' },
                width: {
                  xs: '100%',
                  sm: '500px',
                },
              }}
            >
              <TextField
                label="Amount"
                variant="filled"
                sx={{
                  '& .MuiFilledInput-root': {
                    pr: '8px',
                  },
                }}
                InputProps={{
                  // @ts-ignore
                  inputComponent: MoneyInput,
                  endAdornment: (
                    <InputAdornment position="end">
                      <DollarIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.amount}
                helperText={errors.amount}
                inputProps={{ maxLength: 200 }}
                value={values.amount}
                onChange={(evt) => setFieldValue('amount', evt.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      variant="filled"
                      inputProps={{ ...props.inputProps, maxLength: 50 }}
                      error={!!errors.date}
                      helperText={errors.date}
                    />
                  )}
                  label="Date"
                  value={values.date}
                  onChange={(newValue) => {
                    setFieldValue('date', newValue);
                  }}
                />
              </LocalizationProvider>
              <Autocomplete
                freeSolo
                disableClearable
                options={reasons}
                getOptionLabel={(option) => option?.text ?? option}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Reason"
                      variant="filled"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                      inputProps={{
                        ...params.inputProps,
                        maxLength: 256,
                      }}
                      error={!!errors.reason}
                      helperText={errors.reason}
                    />
                  );
                }}
                value={values.reason}
                onChange={(evt, reason) => setFieldValue('reason', reason)}
              />
              <TextField
                multiline
                rows={3}
                label="Description"
                name="amount"
                variant="filled"
                color="primary"
                inputProps={{ maxLength: 512 }}
                value={values.description}
                onChange={(evt) => setFieldValue('description', evt.target.value)}
              />
            </Box>
          );
        }}
      </Formik>
    </Pane>
  );
}
