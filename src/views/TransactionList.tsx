import './TransactionList.css';

import { DateTime } from 'luxon';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';

import Container from '../components/Container';
import Card from '../components/Card';
import Appbar from '../components/Appbar';
import { deleteTransactionAtom, transactionsAtom, writeLastCursorAtom } from '../store/transaction';
import ChervonLeftIcon from '../components/icons/ChervonLeft';
import ChervonRightIcon from '../components/icons/ChervonRight';
import { Transaction } from '../graphql/graphql.generated';

export default function TransactionList() {
  const navigate = useNavigate();

  const updateLastCursor = useUpdateAtom(writeLastCursorAtom);
  const deleteTransaction = useUpdateAtom(deleteTransactionAtom);
  const transactions = useAtomValue(transactionsAtom);

  const handleDelete = (transaction: Transaction) => {
    deleteTransaction({ id: transaction.id });
  };

  useEffect(() => void updateLastCursor({ cursor: null }), [updateLastCursor]);

  return (
    <div>
      <Appbar />
      <Container>
        <Virtuoso
          endReached={(i) => {
            updateLastCursor({ cursor: transactions[i]?.id ?? null });
          }}
          overscan={200}
          useWindowScroll
          data={transactions}
          itemContent={(_, transaction) => (
            <Card
              onDelete={() => handleDelete(transaction)}
              onEdit={() => navigate(`/${transaction.id}`)}
              onClick={(e) => {
                if (e.currentTarget.classList.contains('card-pane--open')) {
                  e.currentTarget.classList.remove('card-pane--open');
                } else {
                  e.currentTarget.classList.add('card-pane--open');
                }
              }}>
              <div className="headline">
                <h1>${transaction.amount}</h1>
                <h2>{DateTime.fromISO(transaction.date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
                <button className="chervon-button">
                  <ChervonLeftIcon className="chervon-left" />
                  <ChervonRightIcon className="chervon-right" />
                </button>
              </div>
              <p className="reason">{transaction.reason.text}</p>
              <p className="note">{transaction.note}</p>
            </Card>
          )}
        />
      </Container>
    </div>
  );
}
