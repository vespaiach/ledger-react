import './FilterMenu.css';

import NumberFormat from 'react-number-format';
import { DateTime } from 'luxon';
import { ChangeEvent, useState } from 'react';

import DatePicker from '../components/DatePicker';
import { ReasonMap, Maybe, FilterArgs } from '../graphql.generated';
import { Input, TagInput } from '../components/Input';
import CalendarIcon from '../components/icons/Calendar';
import CloseIcon from '../components/icons/Close';
import { Button } from '../components/Button';

const noop = () => null;

interface FilterMenuProps {
  onClose: (filters?: FilterArgs | null) => void;
  filters: Maybe<FilterArgs>;
  reasons: ReasonMap[];
  reasonsMap?: Maybe<Map<number, ReasonMap>>;
}

export default function FilterMenu({ onClose, filters, reasons: reasonList, reasonsMap }: FilterMenuProps) {
  const [reasons, setReasons] = useState<ReasonMap[]>([]);
  const [amountRange, setAmountRange] = useState([filters?.fromAmount, filters?.toAmount]);
  const [dateRange, setDateRange] = useState<[Maybe<Date>, Maybe<Date>]>([
    filters?.fromDate ?? null,
    filters?.toDate ?? null,
  ]);

  const handleChecked = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = evt.target;

    const id = Number(value);

    if (checked) {
      reasonsMap?.has(id) && setReasons([...reasons, reasonsMap.get(id) as ReasonMap]);
    } else {
      setReasons(reasons.filter((r) => r.id !== id));
    }
  };

  const handleApply = () => {
    const reasonTexts = reasons.map((r) => r.text);
    onClose({
      fromAmount: amountRange[0],
      toAmount: amountRange[1],
      fromDate: dateRange[0] ?? null,
      toDate: dateRange[1] ?? null,
      reasons: reasonTexts,
    });
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
      <Button className="close" boxLess onClick={() => onClose()}>
        <CloseIcon />
      </Button>
      <div className="body">
        <div className="amount-input">
          <NumberFormat
            maxLength={21}
            value={amountRange[0]}
            caption="min amount"
            customInput={Input}
            addIns={<span>$</span>}
            thousandSeparator={true}
            onValueChange={(values) => {
              const { value } = values;
              setAmountRange([Number(value), amountRange[1]]);
            }}
          />
          <div className="flex-center">-</div>
          <NumberFormat
            maxLength={21}
            addIns={<span>$</span>}
            value={amountRange[1]}
            caption="max amount"
            customInput={Input}
            thousandSeparator={true}
            onValueChange={(values) => {
              const { value } = values;
              setAmountRange([amountRange[0], Number(value)]);
            }}
          />
        </div>
        <div className="date-input">
          <div style={{ padding: '0px 18px 4px 18px' }}>
            <Input
              caption="from date - to date"
              value={dateString}
              onChange={noop}
              addIns={<CalendarIcon />}
              subIns={
                dateRange[0] && (
                  <Button boxLess onClick={() => setDateRange([null, null])}>
                    <CloseIcon />
                  </Button>
                )
              }
            />
          </div>
          <DatePicker allowRange fromDate={dateRange[0]} toDate={dateRange[1]} onChange={setDateRange} />
        </div>
        <div style={{ margin: '8px 16px 24px 16px' }}>
          <TagInput
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
                  onChange={handleChecked}
                />
                <span>{reason.text}</span>
              </label>
            ))}
          </div>
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
