import './Appbar.css';

import { DateTime } from 'luxon';
import { ReactNode } from 'react';
import { Transition } from 'react-transition-group';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import NumberFormat from 'react-number-format';

import { listenTo } from '../utils/window';
import FilterMenu from './FilterMenu';
import { filterTransactionAtom, writeFilterTransactionAtom } from '../store/transaction';
import CloseButton from './CloseButton';
import { Maybe } from '../graphql/graphql.generated';
import { fetchReasonsAtom, reasonsAtom, reasonsMapAtom } from '../store/reason';
import MagnifyIcon from './icons/Magnify';

export default function Appbar() {
  const filtering = useAtomValue(filterTransactionAtom);
  const setFiltering = useUpdateAtom(writeFilterTransactionAtom);
  const fetchReason = useUpdateAtom(fetchReasonsAtom);
  const reasonList = useAtomValue(reasonsAtom);

  const [openFilter, setOpenFilter] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleDelete = (name: 'amount' | 'date' | 'reason') => (id?: number) => {
    if (name === 'amount') {
      setFiltering({ toAmount: null, fromAmount: null });
    } else if (name === 'date') {
      setFiltering({ fromDate: null, toDate: null });
    } else {
      const reasonIds = filtering?.reasonIds?.filter((r) => r !== id);
      setFiltering({ reasonIds: !reasonIds?.length ? null : reasonIds });
    }
  };

  const handleOpen = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenFilter(false);
  }, []);

  useEffect(() => {
    if (!reasonList.length) {
      fetchReason();
    }
  }, [reasonList]);

  useEffect(
    () =>
      listenTo(window.document, 'scroll', function () {
        if (window.scrollY > 0) setScrolled(true);
        else setScrolled(false);
      }),
    []
  );

  const hasFilters = filtering && Object.values(filtering).some(Boolean);

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
      <div className={cx('appbar', { 'appbar--float': scrolled, 'appbar--scrollable': hasFilters })}>
        <button className={cx('button-icon')} onClick={handleOpen}>
          <MagnifyIcon />
        </button>
        {hasFilters && (
          <div className="appbar_chips">
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
            <ReasonChip reasons={filtering.reasonIds} onDelete={handleDelete('reason')} />
          </div>
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
      {fromAmountValid && <NumberFormat customInput={Span} value={fromAmount} />}
      {toAmountValid && (
        <>
          {fromAmountValid ? <span style={{ margin: '0 4px' }}>-</span> : null}
          <NumberFormat thousandSeparator customInput={Span} value={toAmount} />
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
          {fromDateValid ? <span style={{ margin: '0 4px' }}>-</span> : null}
          <span>{format(toDate)}</span>
        </>
      )}
    </FilterChip>
  );
}

function ReasonChip({
  reasons,
  onDelete,
}: {
  reasons?: Maybe<number[]>;
  onDelete?: (reasonId: number) => void;
}) {
  const reasonsMap = useAtomValue(reasonsMapAtom);

  if (!reasons?.length) return null;

  return (
    <>
      {reasons?.map((r) => {
        const reason = reasonsMap[r];
        if (!reason) return null;

        return (
          <FilterChip key={r} onDelete={() => onDelete?.(r)}>
            {reason.text}
          </FilterChip>
        );
      })}
    </>
  );
}

function Span({ value }: { value?: string }) {
  return <span>{value}</span>;
}
