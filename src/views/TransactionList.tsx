import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { fetchTransactionsAtom } from '../store/transaction';
import { useNavigate } from 'react-router-dom';

let counter = 0;

export default function TransactionList() {
  console.log(++counter);

  const navigate = useNavigate();
  const [transactions, fetch] = useAtom(fetchTransactionsAtom);

  useEffect(() => void fetch({ lastCursor: null }), [fetch]);

  return (
    <Container maxWidth="md" id="back-to-top-anchor" sx={{ mt: 3, mb: 8 }}>
      <Virtuoso
        endReached={(i) => {
          fetch({ lastCursor: transactions[i].id });
        }}
        overscan={200}
        useWindowScroll
        data={transactions}
        itemContent={(_, trans) => (
          <Card sx={{ minWidth: 320, mb: 2 }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="body2"
                component="p"
                sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
                {DateTime.fromISO(trans.date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
              </Typography>
              <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
                $ {trans.amount}
              </Typography>
              <Typography gutterBottom variant="body2" color="text.secondary">
                {trans.note}
              </Typography>
              <Typography
                variant="caption"
                component="p"
                color="text.secondary"
                sx={{ textTransform: 'capitalize' }}>
                {trans.reason.text}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
              <Button size="small">Remove</Button>
            </CardActions>
          </Card>
        )}
      />

      {transactions.length === 0 && (
        <>
          <Typography>No Transactions.</Typography>
          <Button disableFocusRipple variant="text" onClick={() => navigate('/filter')}>
            Apply different filterings
          </Button>
        </>
      )}
    </Container>
  );
}
