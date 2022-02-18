import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateAtom } from 'jotai/utils';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

import AppPanel from '../components/AppPanel';
import { fetchReasonsAtom } from '../store/reason';
import {
  fetchTransactionsAtom,
  fromAmountAtom,
  fromDateAtom,
  reasonIdAtom,
  toAmountAtom,
  toDateAtom,
} from '../store/transaction';

const allowAmount = ({ floatValue }: NumberFormatValues) =>
  floatValue === undefined || (floatValue >= -1000000000 && floatValue <= 1000000000);

export default function FilterInput() {
  const navigate = useNavigate();

  const [fromAmount, setFromAmount] = useAtom(fromAmountAtom);
  const [toAmount, setToAmount] = useAtom(toAmountAtom);

  const [fromDate, setFromDate] = useAtom(fromDateAtom);
  const [toDate, setToDate] = useAtom(toDateAtom);

  const [reasonId, setReason] = useAtom(reasonIdAtom);
  const [reasons, fetch] = useAtom(fetchReasonsAtom);

  const fetchTransactionFromAtom = useUpdateAtom(fetchTransactionsAtom);

  useEffect(() => void fetch(), [fetch]);

  const handleClose = () => {
    fetchTransactionFromAtom({ lastCursor: null, fromDate, toDate, reasonId, fromAmount, toAmount });
    navigate('/');
  };

  return (
    <AppPanel>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mb: 2 },
          maxWidth: 390,
        }}
        noValidate
        autoComplete="off">
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          Filter Transaction
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <NumberFormat
            label="From Amount"
            value={fromAmount}
            customInput={TextField}
            thousandSeparator={true}
            prefix={'$'}
            isAllowed={allowAmount}
            onValueChange={(values) => {
              const { value } = values;
              setFromAmount(Number(value));
            }}
          />
          <NumberFormat
            label="To Amount"
            value={toAmount}
            customInput={TextField}
            thousandSeparator={true}
            prefix={'$'}
            isAllowed={allowAmount}
            onValueChange={(values) => {
              const { value } = values;
              setToAmount(Number(value));
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <DatePicker
            clearable
            label="From Date"
            value={fromDate}
            onChange={setFromDate}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
          <DatePicker
            clearable
            label="To Date"
            value={toDate}
            onChange={setToDate}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </Box>
        <Select
          value={reasonId || ''}
          label="Reason"
          placeholder="Reason"
          sx={{ width: '100%' }}
          onChange={(e) => setReason(Number(e.target.value))}>
          <MenuItem value="">All</MenuItem>
          {reasons?.map((reason) => (
            <MenuItem key={reason.id} value={reason.id}>
              {reason.text}
            </MenuItem>
          ))}
        </Select>

        <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setFromAmount(null);
              setToAmount(null);
              setFromDate(null);
              setToDate(null);
              setReason(null);
            }}>
            Clear
          </Button>
          <Button fullWidth variant="text" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </AppPanel>
  );
}
