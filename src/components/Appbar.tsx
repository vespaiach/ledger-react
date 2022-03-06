import './Appbar.css';

import { DateTime } from 'luxon';
import { ReactNode } from 'react';
import { Transition } from 'react-transition-group';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import { listenTo } from '../utils/window';
import FilterMenu from './FilterMenu';
import { filterTransactionAtom } from '../store/transaction';
import CloseButton from './CloseButton';
import { Maybe } from '../graphql/graphql.generated';

export default function Appbar() {
  const [filtering, setFiltering] = useAtom(filterTransactionAtom);

  const [openFilter, setOpenFilter] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleDelete = (name: 'amount' | 'date') => () => {
    if (name === 'amount') {
      setFiltering((filters) => ({ ...filters, toAmount: null, fromAmount: null }));
    } else {
      setFiltering((filters) => ({ ...filters, fromDate: null, toDate: null }));
    }
  };

  const handleOpen = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenFilter(false);
  }, []);

  useEffect(
    () =>
      listenTo(window.document, 'scroll', function () {
        if (window.scrollY > 0) setScrolled(true);
        else setScrolled(false);
      }),
    []
  );

  return (
    <>
      <Transition in={openFilter} timeout={300} unmountOnExit>
        {(state) => (
          <>
            <div className={cx('curtain', { 'curtain--in': state === 'entering' || state === 'entered' })} />
            <div
              className={cx('flex-column appbar_filter', {
                'appbar_filter--in': state === 'entering' || state === 'entered',
              })}
              ref={filterRef}>
              <div className="flex-item-stretch appbar_filter_content">
                <FilterMenu onClose={handleClose} />
              </div>
            </div>
          </>
        )}
      </Transition>
      <div className={cx('appbar', { 'appbar--float': scrolled })}>
        {!!filtering ? (
          <div className="flex-row filter-list">
            <AmountChip
              fromAmount={filtering.fromAmount}
              toAmount={filtering.toAmount}
              onDelete={handleDelete('amount')}
            />
            <DateChip
              fromDate={filtering.fromDate}
              toDate={filtering.toDate}
              onDelete={handleDelete('date')}
            />
          </div>
        ) : (
          <button className="button-icon" onClick={handleOpen}>
            <svg
              className="icon"
              fill="currentColor"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </button>
        )}
      </div>
    </>
  );
}

function FilterChip({ children, onDelete }: { onDelete?: () => void; children?: ReactNode | ReactNode[] }) {
  return (
    <div className="filter-chip">
      {children}
      <CloseButton
        onClick={onDelete}
        style={{ marginLeft: 'auto', position: 'static', height: 24, width: 24, padding: 0 }}
      />
    </div>
  );
}

function AmountChip({
  fromAmount,
  toAmount,
  onDelete,
}: {
  fromAmount?: Maybe<number>;
  toAmount?: Maybe<number>;
  onDelete?: () => void;
}) {
  const fromAmountValid = typeof fromAmount === 'number';
  const toAmountValid = typeof toAmount === 'number';

  if (!fromAmountValid && !toAmountValid) return null;

  return (
    <FilterChip onDelete={onDelete}>
      <span>$</span>
      {fromAmountValid && <span>{fromAmount}</span>}
      {toAmountValid && (
        <>
          {fromAmountValid ? <span>-</span> : null}
          <span>{toAmount}</span>
        </>
      )}
    </FilterChip>
  );
}

function DateChip({
  fromDate,
  toDate,
  onDelete,
}: {
  fromDate?: Maybe<Date>;
  toDate?: Maybe<Date>;
  onDelete?: () => void;
}) {
  const format = (dt: Date) => DateTime.fromJSDate(dt).toLocaleString(DateTime.DATE_SHORT);

  const fromDateValid = fromDate !== null && fromDate !== undefined;
  const toDateValid = toDate !== null && toDate !== undefined;

  if (!fromDateValid && !toDateValid) return null;

  return (
    <FilterChip onDelete={onDelete}>
      <span>$</span>
      {fromDateValid && <span>{format(fromDate)}</span>}
      {toDateValid && (
        <>
          {fromDateValid ? <span>-</span> : null}
          <span>{format(toDate)}</span>
        </>
      )}
    </FilterChip>
  );
}
