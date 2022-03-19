import './TransactionList.css';

import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';

import Container from '../components/Container';
import Card from '../components/Card';
import Appbar from './Appbar';
import ChervonLeftIcon from '../components/icons/ChervonLeft';
import ChervonRightIcon from '../components/icons/ChervonRight';
import { Maybe, QueryGetTransactionsArgs } from '../graphql.generated';
import { useAuth } from '../utils/useAuth';
import { filtersSelector, transactionsSelector, useTransactionStore } from '../store/transaction';
import { deleteTransaction$, loadTransactions$ } from '../dataSource';
import { addErrorSelector, useAppStore } from '../store/app';

export default function TransactionList() {
  useAuth();

  const filters = useTransactionStore(filtersSelector);
  const transactions = useTransactionStore(transactionsSelector);

  const navigate = useNavigate();
  const addTransactions = useTransactionStore((state) => state.addTransactions);
  const addError = useAppStore(addErrorSelector);

  const fetchTransactions = (
    args?: Omit<QueryGetTransactionsArgs, 'fromDate' | 'toDate'> & {
      fromDate?: Maybe<Date>;
      toDate?: Maybe<Date>;
    }
  ) => {
    loadTransactions$({ ...filters, ...args }).subscribe({
      next: (transactions) => addTransactions(transactions),
      error: (e) => addError(e.message),
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <Appbar />
      <Container>
        <Virtuoso
          endReached={(i) => {
            fetchTransactions({ lastCursor: transactions[i]?.id ?? null });
          }}
          overscan={200}
          useWindowScroll
          data={transactions}
          itemContent={(_, transaction) => (
            <Card
              onDelete={() => {
                deleteTransaction$(transaction.id).subscribe();
              }}
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
                <h2>
                  {DateTime.fromJSDate(transaction.date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                </h2>
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
