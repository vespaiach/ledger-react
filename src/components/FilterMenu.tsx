import './FilterMenu.css';
import '@vespaiach/horizontal-calendar/dist/calendar.css';
import '@vespaiach/horizontal-calendar/dist/defaultTheme.css';

import NumberFormat from 'react-number-format';
import { DateTime } from 'luxon';
import { ChangeEvent, useState } from 'react';
import Calendar from '@vespaiach/horizontal-calendar';

import { Maybe, FilterArgs } from '../graphql.generated';
import { Input, TagInput } from '../components/Input';
import CalendarIcon from '../components/icons/Calendar';
import CloseIcon from '../components/icons/Close';
import { Button } from '../components/Button';

const noop = () => null;

interface FilterMenuProps {
  onClose: (filters?: FilterArgs | null) => void;
  filters: Maybe<FilterArgs>;
  reasons: Tag[];
}

export default function FilterMenu({ onClose, filters, reasons: reasonList }: FilterMenuProps) {
  const [reasons, setReasons] = useState<Tag[]>([]);
  const [amountRange, setAmountRange] = useState([filters?.fromAmount, filters?.toAmount]);
  const [dateRange, setDateRange] = useState<[Date, Date | null] | null>(null);

  const handleChecked = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = evt.target;

    if (checked) {
      if (reasons.every((r) => r.text !== value)) {
        setReasons([...reasons, { text: value }]);
      }
    } else {
      setReasons(reasons.filter((r) => r.text !== value));
    }
  };

  const handleApply = () => {
    const reasonTexts = reasons.map((r) => r.text);
    onClose({
      fromAmount: amountRange[0],
      toAmount: amountRange[1],
      fromDate: Array.isArray(dateRange) ? dateRange[0] : null,
      toDate: Array.isArray(dateRange) ? dateRange[1] : null,
      reasons: reasonTexts,
    });
  };

  let dateString = '';
  if (Array.isArray(dateRange) && dateRange[1]) {
    dateString = `${DateTime.fromJSDate(dateRange[0]).toLocaleString(
      DateTime.DATE_MED_WITH_WEEKDAY
    )} - ${DateTime.fromJSDate(dateRange[1]).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}`;
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
                dateRange && (
                  <Button boxLess onClick={() => setDateRange(null)}>
                    <CloseIcon />
                  </Button>
                )
              }
            />
          </div>
          <Calendar rangeSelection selection={dateRange} onChange={setDateRange} />
        </div>
        <div style={{ margin: '8px 16px 24px 16px' }}>
          <TagInput
            caption="reasons"
            tags={reasons}
            onDelete={(tag) => {
              setReasons(reasons.filter((r) => r.text !== tag.text));
            }}
          />
          <div className="checkboxes">
            {reasonList.map((reason) => (
              <label key={reason.text}>
                <input
                  type="checkbox"
                  checked={reasons.findIndex((r) => r.text === reason.text) > -1}
                  value={reason.text}
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
            setDateRange(null);
            setReasons([]);
          }}>
          Clear All
        </a>
        <button onClick={handleApply}>Apply Filter</button>
      </footer>
    </aside>
  );
}
