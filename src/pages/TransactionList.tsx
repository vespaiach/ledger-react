import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useAtom } from 'jotai';

import { fetchTransactionsAtom } from '../store/transaction';

let counter = 0;

export function TransactionList() {
  console.log(++counter);

  const [transactions, fetch] = useAtom(fetchTransactionsAtom);

  useEffect(() => void fetch(), [fetch]);

  return (
    <Container maxWidth="md" sx={{ marginTop: '78px' }} id="back-to-top-anchor">
      <Virtuoso
        endReached={(i) => {
          fetch({ lastCursor: transactions[i].id });
        }}
        overscan={200}
        useWindowScroll
        data={transactions}
        itemContent={(index, trans) => (
          <div>
            <h4>
              {trans.id} - {trans.amount}
            </h4>
            <div>{trans.date}</div>
          </div>
        )}
      />
    </Container>
  );
}
