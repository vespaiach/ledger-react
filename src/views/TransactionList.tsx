import { DateTime } from 'luxon';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';

import Container from '../components/Container';
import Card from '../components/Card';
import Appbar from '../components/Appbar';
import { transactionsAtom, writeLastCursorAtom } from '../store/transaction';

export default function TransactionList() {
  const updateLastCursor = useUpdateAtom(writeLastCursorAtom);
  const transactions = useAtomValue(transactionsAtom);

  useEffect(() => void updateLastCursor({ cursor: null }), [updateLastCursor]);

  return (
    <Container>
      <Appbar />
      <Virtuoso
        endReached={(i) => {
          updateLastCursor({ cursor: transactions[i]?.id ?? null });
        }}
        overscan={200}
        useWindowScroll
        data={transactions}
        itemContent={(_, trans) => (
          <Card>
            <div className="headline">
              <h1>${trans.amount}</h1>
              <h2>{DateTime.fromISO(trans.date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
              <svg
                className="icon"
                focusable="false"
                aria-hidden="true"
                height={24}
                width={24}
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6z"></path>
                <path d="m11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"></path>
              </svg>
            </div>
            <p className="reason">{trans.reason.text}</p>
            <p className="note">{trans.note}</p>
          </Card>
        )}
      />
    </Container>
  );
}
