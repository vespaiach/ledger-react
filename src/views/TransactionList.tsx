import { DateTime } from 'luxon';
import cx from 'classnames';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useNavigate } from 'react-router-dom';

import { fetchTransactionsAtom } from '../store/transaction';

import Container from '../components/Container';
import Card from '../components/Card';
import { listenTo } from '../utils/window';

export default function TransactionList() {
  const navigate = useNavigate();
  const [transactions, fetch] = useAtom(fetchTransactionsAtom);

  const appbarRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => void fetch({ lastCursor: null }), [fetch]);

  useEffect(
    () =>
      listenTo(window.document, 'scroll', function () {
        if (window.scrollY > 0) setScrolled(true);
        else setScrolled(false);
      }),
    []
  );

  return (
    <Container>
      <div className={cx('appbar', { 'appbar--float': scrolled })} ref={appbarRef}>
        <button className="search">
          <svg className="icon" fill="currentColor" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </button>
      </div>
      <Virtuoso
        endReached={(i) => {
          fetch({ lastCursor: transactions[i].id });
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
