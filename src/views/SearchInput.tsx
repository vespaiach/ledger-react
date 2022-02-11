import { DatePicker } from '@mui/lab';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';

import { GetTransactionsQueryVariables, TransactionType } from '../graphql/graphql.generated';
import { fetchReasonsAtom } from '../store/reason';

import {
  fetchTransactionsAtom,
  fromAmountAtom,
  fromDateAtom,
  reasonIdAtom,
  toAmountAtom,
  toDateAtom,
  transactionTypeAtom,
} from '../store/transaction';

export function SearchInput({ onClose }: { onClose: () => void }) {
  const fromAmount = useAtomValue(fromAmountAtom);
  const toAmount = useAtomValue(toAmountAtom);
  const fromDate = useAtomValue(fromDateAtom);
  const toDate = useAtomValue(toDateAtom);
  const reason = useAtomValue(reasonIdAtom);
  const transactionType = useAtomValue(transactionTypeAtom);
  const [reasons, fetch] = useAtom(fetchReasonsAtom);

  const fetchTransactionFromAtom = useUpdateAtom(fetchTransactionsAtom);

  const fetchTransaction = (args: GetTransactionsQueryVariables) => {
    fetchTransactionFromAtom({ ...args, lastCursor: null });
  };

  useEffect(() => void fetch(), [fetch]);

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { mb: 2 },
        width: 280,
        p: 2,
      }}
      noValidate
      autoComplete="off">
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        Filter Transaction
      </Typography>
      <TextField
        fullWidth
        label="From Amount"
        size="small"
        value={fromAmount}
        onChange={(e) => fetchTransaction({ fromAmount: Number(e.target.value) })}
      />
      <TextField
        fullWidth
        label="To Amount"
        value={toAmount}
        size="small"
        onChange={(e) => fetchTransaction({ toAmount: Number(e.target.value) })}
      />
      <DatePicker
        label="From Date"
        value={fromDate}
        onChange={(newValue) => void fetchTransaction({ fromDate: newValue })}
        renderInput={(params) => <TextField fullWidth size="small" {...params} />}
      />
      <DatePicker
        label="To Date"
        value={toDate}
        onChange={(newValue) => void fetchTransaction({ toDate: newValue })}
        renderInput={(params) => <TextField fullWidth size="small" {...params} />}
      />
      <Select
        value={reason || ''}
        label="Reason"
        size="small"
        sx={{ width: '100%' }}
        onChange={(e) => fetchTransaction({ reasonId: Number(e.target.value) })}>
        <MenuItem value=""></MenuItem>
        {reasons?.map((reason) => (
          <MenuItem key={reason.id} value={reason.id}>
            {reason.text}
          </MenuItem>
        ))}
      </Select>
      <ToggleButtonGroup
        fullWidth
        size="small"
        sx={{ mt: 2, mb: 3 }}
        value={
          transactionType === null ? [TransactionType.Expense, TransactionType.Income] : [transactionType]
        }
        onChange={(_, values) => {
          if (values.length === 2 || values.length === 0) {
            fetchTransaction({ transactionType: null });
            return;
          }

          fetchTransaction({ transactionType: values[0] });
        }}
        aria-label="transaction type">
        <ToggleButton value={TransactionType.Expense} aria-label="expense">
          Expense
        </ToggleButton>
        <ToggleButton value={TransactionType.Income} aria-label="income">
          Income
        </ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ display: 'flex' }}>
        <Button
          variant="contained"
          onClick={() =>
            void fetchTransaction({
              lastCursor: null,
              toAmount: null,
              fromAmount: null,
              toDate: null,
              fromDate: null,
              reasonId: null,
              transactionType: null,
            })
          }>
          Clear
        </Button>
        <Button variant="text" sx={{ ml: 'auto' }} onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
}
