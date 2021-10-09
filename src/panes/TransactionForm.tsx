import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AttachMoneyRounded as DollarIcon } from '@mui/icons-material';
import { useFormik } from 'formik';

import { PageHeader } from '../components/PageHeader';
import { Pane, PaneCommand } from '../components/Pane';
import { useTransaction } from '../hooks/useTransaction';
import { AppState } from '../store';
import { popPane } from '../store/Pane/action';
import { requestReasons } from '../store/Reason/action';
import { PaneCommonProps } from '../types';
import { MoneyInput } from '../components/MoneyInput';
import { saveTransaction } from '../store/Transaction/action';
import { TransactionInput } from '../store/types';

enum Mode {
  Create,
  Edit,
}

interface TransactionFormProps extends PaneCommonProps {}

export function TransactionForm({ state, index }: TransactionFormProps) {
  const dispatch = useDispatch();
  const reasons = useSelector((state: AppState) => state.reason.data.map((r) => r.text));
  const transaction = useTransaction(state?.id);
  const mode = transaction ? Mode.Edit : Mode.Create;

  // MUI requires 'undefined' for initial value, otherwise components will be uncontrolled
  const { errors, setFieldValue, values, submitForm } = useFormik<TransactionInput>({
    initialValues: {
      id: transaction?.id,
      amount: transaction?.amount,
      date: transaction ? new Date(transaction.date) : null,
      reason: transaction?.reason.text,
      description: transaction?.description || undefined,
    },
    onSubmit: (submitingData) => {
      dispatch(saveTransaction(submitingData, index));
    },
    validate: (submitingData) => {
      const errorMessages: Record<string, string> = {};

      if (!submitingData.amount) {
        errorMessages.amount = 'You must enter amount';
      }

      if (!submitingData.date) {
        errorMessages.date = 'You must enter a date';
      }

      if (!submitingData.reason) {
        errorMessages.reason = 'You must enter a reason to category you transaction';
      }

      return errorMessages;
    },
  });

  const handlePaneCommand = (command: PaneCommand) => {
    switch (command) {
      case PaneCommand.Close:
      case PaneCommand.Cancel:
        dispatch(popPane(index));
        break;
      case PaneCommand.Save:
        submitForm();
        break;
    }
  };

  useEffect(() => {
    if (!reasons.length) {
      dispatch(requestReasons());
    }
  }, [reasons.length, dispatch]);

  return (
    <Pane
      index={index}
      onCommand={handlePaneCommand}
      commands={
        mode === Mode.Edit ? [PaneCommand.Save, PaneCommand.Cancel] : [PaneCommand.Save, PaneCommand.Close]
      }>
      <PageHeader text={mode === Mode.Create ? 'Add Transaction' : 'Update Transaction'} />
      <Box
        sx={{
          '& .MuiTextField-root': { mb: 1, width: '100%' },
          width: {
            xs: '100%',
            sm: '500px',
          },
        }}>
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
            disableMaskedInput
            renderInput={(props) => {
              return (
                <TextField
                  {...props}
                  variant="filled"
                  inputProps={{ ...props.inputProps, maxLength: 50, onChange: () => null }}
                  error={!!errors.date}
                  helperText={errors.date}
                />
              );
            }}
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
          getOptionLabel={(option) => option}
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
          value={values.reason || ''}
          onInputChange={(_, value) => {
            setFieldValue('reason', value);
          }}
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
    </Pane>
  );
}
