import { Autocomplete, Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DatePicker } from '@mui/lab';
import { Link } from 'react-router-dom';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import { fetchReasonsAtom, reasonLoadingAtom } from '../store/reason';
import { Maybe, Reason } from '../graphql/graphql.generated';
import { createTransactionsAtom, transactionCreatingAtom } from '../store/transaction';
import { flashMessageAtom } from '../store/app';

type Field = 'amount' | 'date' | 'reason' | 'note';

export default function CreateTransaction() {
  const showFlashMessage = useUpdateAtom(flashMessageAtom);

  const reasonLoading = useAtomValue(reasonLoadingAtom);
  const [reasons, fetchReasons] = useAtom(fetchReasonsAtom);
  const transactionCreating = useAtomValue(transactionCreatingAtom);
  const createTransaction = useUpdateAtom(createTransactionsAtom);

  const [openReason, setOpenReason] = useState(false);
  const [amount, setAmount] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [reasonText, setReasonText] = useState('');
  const [note, setNote] = useState<Maybe<string>>('');
  const [errors, setErrors] = useState<Record<Field, string> | null>(null);

  const clearForm = () => {
    setDate(null);
    setReasonText('');
    setAmount(0);
    setNote('');
  };

  const set = (name: Field) => (val: string | Date | number | null) => {
    setErrors(null);

    switch (true) {
      case name === 'amount':
        setAmount(val as string);
        break;
      case name === 'date':
        setDate(val as Date);
        break;
      case name === 'reason':
        setReasonText(val as string);
        break;
      case name === 'note':
        setNote(val as string);
        break;
    }
  };

  useEffect(() => {
    if (!reasons.length) {
      fetchReasons();
    }
  }, []);

  const submit: React.ReactEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const errors = {} as Record<Field, string>;

    const isdigit = /\d+/gi;
    if (!amount || !isdigit.test(amount)) {
      errors['amount'] = 'please enter an amount >= 1B & amount <= 1B';
    }

    if (!date) {
      errors['date'] = 'please enter a valid date';
    }

    if (!reasonText) {
      errors['reason'] = 'please use reason to categorize transactions';
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    const reason = reasons.find((r) => r.text === reasonText);

    await createTransaction({
      date: date as Date,
      amount: Number(amount),
      reasonId: reason?.id,
      reasonText,
      note: note || null,
    });

    showFlashMessage({ message: 'Created a new transaction.', type: 'success' });

    clearForm();
  };

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Link to="/" title="go back">
          <ArrowBackIcon />
        </Link>
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
          Create Transaction
        </Typography>
      </Box>

      <Container component="form" onSubmit={submit} maxWidth="md" sx={{ mt: 3, mb: 8 }}>
        <Box sx={{ maxWidth: 420, display: 'grid', gridGap: 18 }}>
          <NumberFormat
            error={Boolean(errors && errors['amount'])}
            label="Amount"
            value={amount}
            helperText={errors ? errors['amount'] : ''}
            customInput={TextField}
            thousandSeparator={true}
            prefix={'$'}
            isAllowed={({ floatValue }: NumberFormatValues) =>
              floatValue === undefined || (floatValue >= -1000000000 && floatValue <= 1000000000)
            }
            onValueChange={(values) => {
              const { value } = values;
              set('amount')(Number(value));
            }}
          />
          <DatePicker
            inputFormat={'cccc, LLL dd, yyyy'}
            clearable
            label="Date"
            value={date}
            onChange={set('date')}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={errors ? errors['date'] : ''}
                fullWidth
                error={Boolean(errors && errors['date'])}
              />
            )}
          />
          <Autocomplete
            open={openReason}
            freeSolo
            inputValue={reasonText}
            onOpen={() => {
              setOpenReason(true);
            }}
            onClose={() => {
              setOpenReason(false);
            }}
            onChange={(e, value, why) => {
              if (why === 'selectOption') {
                const reason = value as Reason;
                set('reason')(reason.text);
              } else if (why === 'clear') {
                set('reason')('');
              }
            }}
            onInputChange={(e, value, why) => {
              if (why === 'input') {
                set('reason')(value);
              } else {
                set('reason')('');
              }
            }}
            isOptionEqualToValue={(reason, value) => reason.text === value.text}
            getOptionLabel={(reason) => reason.text}
            options={reasons}
            loading={reasonLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={Boolean(errors && errors['reason'])}
                helperText={errors ? errors['reason'] : ''}
                label="Reason"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {reasonLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <TextField
            error={Boolean(errors && errors['note'])}
            value={note}
            label="Note"
            placeholder="Note"
            multiline
            rows={3}
            onChange={(e) => set('note')(e.target.value)}
          />
          <Box sx={{ mt: 1, display: 'grid', grid: 'auto-flow / 1fr 1fr', gridGap: 18 }}>
            <Button size="large" variant="contained" type="submit" disabled={transactionCreating}>
              Save
            </Button>
            <Button size="large" variant="text" disabled={transactionCreating} onClick={clearForm}>
              CLEAR
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
