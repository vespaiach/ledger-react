import './TransactionList.css';

import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import Container from '../components/Container';
import Card from '../components/Card';
import Appbar from './Appbar';
import ChervonLeftIcon from '../components/icons/ChervonLeft';
import ChervonRightIcon from '../components/icons/ChervonRight';
import { useAuth } from '../utils/useAuth';
import {
  filtersSelector,
  totalSelector,
  transactionsSelector,
  useFiltersStore,
  useTransactionStore,
} from '../store/transaction';
import { deleteTransaction$, loadTransactions$ } from '../dataSource';

const take = 50;

export default function TransactionList() {
  useAuth();

  const [loading, setLoading] = useState(false);
  const filters = useFiltersStore(filtersSelector);
  const transactions = useTransactionStore(transactionsSelector);
  const total = useTransactionStore(totalSelector);

  const navigate = useNavigate();
  const addTransactions = useTransactionStore((state) => state.addTransactions);
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const setTotal = useTransactionStore((state) => state.setTotal);

  const load = (skip: number, take: number, loadMore = false) => {
    setLoading(true);
    loadTransactions$({ ...filters, skip, take }).subscribe({
      next: (dt) => {
        if (loadMore) {
          addTransactions(dt.transactions);
        } else {
          setTransactions(dt.transactions);
        }
        setTotal(dt.total);
      },
      complete: () => void setLoading(false),
      error: () => void setLoading(false),
    });
  };

  useEffect(() => {
    load(0, take);
  }, [filters]);

  return (
    <div>
      <Appbar />
      <Container>
        <Virtuoso
          endReached={() => {
            if (loading || transactions.length >= total) return;
            load(transactions.length, take, true);
          }}
          overscan={200}
          useWindowScroll
          data={transactions}
          itemContent={(_, transaction) => (
            <Card
              onDelete={() => {
                deleteTransaction$(transaction.id).subscribe();
              }}
              onEdit={() => navigate(`/mutate/${transaction.id}`)}
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
              <p className="reason">{transaction.reasons.map((r) => r.text).join(', ')}</p>
              <p className="note">{transaction.note}</p>
            </Card>
          )}
        />
      </Container>
    </div>
  );
}
