import './TransactionList.css';

import { DateTime } from 'luxon';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';

import Container from '../components/Container';
import Card from '../components/Card';
import Appbar from '../components/Appbar';
import { transactionsAtom, writeLastCursorAtom } from '../store/transaction';
import ChervonLeftIcon from '../components/icons/ChervonLeft';
import ChervonRightIcon from '../components/icons/ChervonRight';

export default function TransactionList() {
  const updateLastCursor = useUpdateAtom(writeLastCursorAtom);
  const transactions = useAtomValue(transactionsAtom);

  useEffect(() => void updateLastCursor({ cursor: null }), [updateLastCursor]);

  return (
    <>
      <Appbar />
      <Container>
        <Virtuoso
          endReached={(i) => {
            updateLastCursor({ cursor: transactions[i]?.id ?? null });
          }}
          overscan={200}
          useWindowScroll
          data={transactions}
          itemContent={(_, trans) => (
            <Card
              onClick={(e) => {
                if (e.currentTarget.classList.contains('card-pane--open')) {
                  e.currentTarget.classList.remove('card-pane--open');
                } else {
                  e.currentTarget.classList.add('card-pane--open');
                }
              }}>
              <div className="headline">
                <h1>${trans.amount}</h1>
                <h2>{DateTime.fromISO(trans.date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
                <button className="chervon-button">
                  <ChervonLeftIcon className="chervon-left" />
                  <ChervonRightIcon className="chervon-right" />
                </button>
              </div>
              <p className="reason">{trans.reason.text}</p>
              <p className="note">{trans.note}</p>
            </Card>
          )}
        />
      </Container>
    </>
  );
}
