import './Appbar.css';

import { DateTime } from 'luxon';
import { ReactNode } from 'react';
import { Transition } from 'react-transition-group';
import { useCallback, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import NumberFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom';

import { listenTo } from '../utils/window';
import MagnifyIcon from '../components/icons/Magnify';
import PlusOneIcon from '../components/icons/PlusOne';
import { FilterArgs, Maybe } from '../graphql.generated';
import ExitIcon from '../components/icons/Exit';
import { Button } from '../components/Button';
import { remove } from '../utils/auth';
import { signout$ } from '../dataSource';
import { useAuthStore } from '../store/auth';
import { reasonsSelector, useReasonStore } from '../store/reason';
import CloseIcon from '../components/icons/Close';
import {
  clearFiltersSelector,
  filtersSelector,
  setFiltersSelector,
  useFiltersStore,
} from '../store/transaction';
import FilterMenu from '../components/FilterMenu';

export default function Appbar() {
  const navigate = useNavigate();

  const filters = useFiltersStore(filtersSelector);
  const setFilters = useFiltersStore(setFiltersSelector);
  const clearFilters = useFiltersStore(clearFiltersSelector);
  const reasons = useReasonStore(reasonsSelector);

  const { setAuth } = useAuthStore();

  const [openFilter, setOpenFilter] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const signout = () => {
    const complete = () => {
      setAuth(null);
      remove();
      navigate('/signin');
    };

    signout$().subscribe({
      error: complete,
      complete,
    });
  };

  const handleDelete = (name: 'amount' | 'date' | 'reason') => (idOrText?: number | string) => {
    if (name === 'amount') {
      setFilters({ toAmount: null, fromAmount: null });
    } else if (name === 'date') {
      setFilters({ fromDate: null, toDate: null });
    } else {
      const reasons = filters?.reasons?.filter((r) => r !== idOrText);
      setFilters({ reasons: !reasons?.length ? null : reasons });
    }
  };

  const handleOpen = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleClose = (args?: FilterArgs | null) => {
    setOpenFilter(false);
    if (args === undefined) return;

    if (args === null) clearFilters();
    else setFilters(args);
  };

  useEffect(
    () =>
      listenTo(window.document, 'scroll', function () {
        if (window.scrollY > 0) setScrolled(true);
        else setScrolled(false);
      }),
    []
  );

  const hasFilters = filters && Object.values(filters).some(Boolean);

  return (
    <>
      <Transition in={openFilter} timeout={300} unmountOnExit>
        {(state) => (
          <>
            <div
              className={cx('curtain', { 'curtain--in': state === 'entering' || state === 'entered' })}
              onClick={() => handleClose()}
            />
            <div
              className={cx('flex-column appbar_filter', {
                'appbar_filter--in': state === 'entering' || state === 'entered',
              })}
              ref={filterRef}>
              <div className="flex-item-stretch appbar_filter_content">
                <FilterMenu onClose={handleClose} filters={filters} reasons={reasons} />
              </div>
            </div>
          </>
        )}
      </Transition>
      <div className={cx('appbar', { 'appbar--float': scrolled, 'appbar--scrollable': hasFilters })}>
        <div className="button-group">
          <Button title="Add" onClick={() => navigate('/mutate/new')}>
            <PlusOneIcon />
          </Button>
          <Button title="Search" onClick={handleOpen}>
            <MagnifyIcon />
          </Button>
          <Button
            title="Exit"
            className="exit"
            onClick={async () => {
              await signout();
              remove();
              navigate('/email');
            }}>
            <ExitIcon />
          </Button>
        </div>
        {hasFilters && (
          <div className="appbar_chips">
            <AmountChip
              fromAmount={filters.fromAmount}
              toAmount={filters.toAmount}
              onDelete={handleDelete('amount')}
            />
            <DateChip fromDate={filters.fromDate} toDate={filters.toDate} onDelete={handleDelete('date')} />
            <ReasonChip reasons={filters.reasons} onDelete={handleDelete('reason')} />
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
      <Button boxLess onClick={onDelete}>
        <CloseIcon />
      </Button>
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
      {fromAmountValid && <NumberFormat thousandSeparator prefix="$" customInput={Span} value={fromAmount} />}
      {toAmountValid && (
        <>
          {fromAmountValid ? <span style={{ margin: '0 4px' }}>-</span> : null}
          <NumberFormat thousandSeparator prefix="$" customInput={Span} value={toAmount} />
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
  reasons?: Maybe<string[]>;
  onDelete?: (reasonText: string) => void;
}) {
  if (!reasons?.length) return null;

  return (
    <>
      {reasons?.map((r) => {
        return (
          <FilterChip key={r} onDelete={() => onDelete?.(r)}>
            {r}
          </FilterChip>
        );
      })}
    </>
  );
}

function Span({ value }: { value?: string }) {
  return <span>{value}</span>;
}
