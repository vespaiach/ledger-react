import './FilterMenu.css';

import NumberFormat from 'react-number-format';
import { DateTime } from 'luxon';
import { useAtom } from 'jotai';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import DatePicker from './DatePicker';
import { ReasonMap, Maybe } from '../graphql.generated';
import { Input, TagInput } from './Input';
import { useTransactionStore } from '../store/transaction';
import { useReasonStore } from '../store/reason';

const noop = () => null;

export default function FilterMenu({ onClose }: { onClose: () => void }) {
  const filters = useTransactionStore((state) => state.filters);
  const setFilters = useTransactionStore((state) => state.setFilters);
  const reasons = useReasonStore((state) => state.reasons);
  const reasonsMap = useReasonStore((state) => state.reasonsMap);

  const [amountRange, setAmountRange] = useState([filters?.fromAmount, filters?.toAmount]);
  const [dateRange, setDateRange] = useState<[Maybe<Date>, Maybe<Date>]>([
    filters?.fromDate ?? null,
    filters?.toDate ?? null,
  ]);

  const handleChecked = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = evt.target;

    const id = Number(value);

    // if (checked) {
    //   reasonsMap[id] && setReasons([...reasons, reasonMap[id]]);
    // } else {
    //   setReasons(reasons.filter((r) => r.id !== id));
    // }
  };

  const handleApply = () => {
    const reasonIds = reasons.map((r) => r.id);
    // setFiltering({
    //   fromAmount: amountRange[0],
    //   toAmount: amountRange[1],
    //   fromDate: dateRange[0] ?? null,
    //   toDate: dateRange[1] ?? null,
    //   reasonIds: reasonIds.length ? reasonIds : null,
    // });
    // updateLastCursor({ cursor: null });
    onClose();
  };

  let dateString = '';
  if (dateRange[0]) {
    dateString = `${DateTime.fromJSDate(dateRange[0]).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}`;
    if (dateRange[1]) {
      dateString += ` - ${DateTime.fromJSDate(dateRange[1]).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}`;
    }
  }

  return (
    <aside className="filter-pane">
      <h1>Filters</h1>
      <button className="button button-close" onClick={onClose}>
        <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
      <div className="body">
        <div className="amount-input">
          <NumberFormat
            value={amountRange[0]}
            caption="min amount"
            customInput={Input}
            thousandSeparator={true}
            onValueChange={(values) => {
              const { value } = values;
              setAmountRange([Number(value), amountRange[1]]);
            }}>
            <span style={{ position: 'absolute', top: 25, left: 22 }}>$</span>
          </NumberFormat>
          <div className="flex-center" style={{ fontWeight: 700, fontSize: 18, color: 'rgb(113,113,113)' }}>
            -
          </div>
          <NumberFormat
            value={amountRange[1]}
            caption="max amount"
            customInput={Input}
            thousandSeparator={true}
            onValueChange={(values) => {
              const { value } = values;
              setAmountRange([amountRange[0], Number(value)]);
            }}>
            <span style={{ position: 'absolute', top: 25, left: 22 }}>$</span>
          </NumberFormat>
        </div>
        <div className="date-input">
          <div style={{ padding: '0px 18px 4px 18px' }}>
            <Input caption="from date - to date" value={dateString} onChange={noop}>
              <svg
                className="icon"
                style={{
                  position: 'absolute',
                  top: 23,
                  left: 14,
                  width: 22,
                  height: 22,
                  color: 'rgb(113, 113, 113, 0.8)',
                }}
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24">
                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"></path>
              </svg>
              {dateRange[0] && (
                <button
                  className="button button-close"
                  onClick={() => setDateRange([null, null])}
                  style={{
                    color: 'rgb(113, 113, 113, 0.8)',
                    position: 'absolute',
                    right: 4,
                    left: 'initial',
                    top: 15,
                  }}>
                  <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                  </svg>
                </button>
              )}
            </Input>
          </div>
          <DatePicker allowRange fromDate={dateRange[0]} toDate={dateRange[1]} onChange={setDateRange} />
        </div>
        <div style={{ margin: '8px 16px 24px 16px' }}>
          {/* <TagInput
            style={{ marginBottom: 4 }}
            caption="reasons"
            tags={reasons}
            onDelete={(tag) => {
              const reason = tag as ReasonMap;
              setReasons(reasons.filter((r) => r.id !== reason.id));
            }}
          />
          <div className="checkboxes">
            {reasonList.map((reason) => (
              <label key={reason.id}>
                <input
                  type="checkbox"
                  checked={reasons.findIndex((r: ReasonMap) => r.id === reason.id) > -1}
                  value={reason.id}
                  onChange={handleChecked}></input>
                <span>{reason.text}</span>
              </label>
            ))}
          </div> */}
        </div>
      </div>
      <footer className="form-footer">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setAmountRange([null, null]);
            setDateRange([null, null]);
            setReasons([]);
          }}>
          Clear All
        </a>
        <button onClick={handleApply}>Apply Filter</button>
      </footer>
    </aside>
  );
}
