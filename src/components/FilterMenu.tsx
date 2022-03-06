import NumberFormat from 'react-number-format';
import { DateTime } from 'luxon';
import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';

import './FilterMenu.css';
import Input from './Input';
import useDate, { buildGroupData, DayNames, GroupExtend, MonthNames } from '../utils/useDate';
import { listenTo } from '../utils/window';

const WIDTH = 340;
const HEIGHT = 360;
const OVER_SCAN = 10;
const GAP = 18;

const FROM = 2000;
const TO = 2200;

export default function FilterMenu({ onClose }: { onClose: () => void }) {
  const { groups } = useDate({ from: FROM, to: TO });
  const [frontIndex, setFrontIndex] = useState(0);
  const [rearIndex, setRearIndex] = useState(OVER_SCAN);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pickerRef.current) return;

    const unsub = listenTo(pickerRef.current, 'scroll', function (event) {
      const currIndex = Math.floor(event.target.scrollLeft / WIDTH);

      setFrontIndex(currIndex - OVER_SCAN < 0 ? 0 : currIndex - OVER_SCAN);
      setRearIndex(currIndex + OVER_SCAN > groups.length ? groups.length - 1 : currIndex + OVER_SCAN);
    });

    const currYearIndex = (new Date().getFullYear() - FROM) * 12 - 1;

    pickerRef.current.scrollTo({ left: currYearIndex * WIDTH });

    return unsub;
  }, [pickerRef.current]);

  let dateString = '';
  if (dateRange[0]) {
    dateString = `${DateTime.fromJSDate(dateRange[0]).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}`;
    if (dateRange[1]) {
      dateString += ` - ${DateTime.fromJSDate(dateRange[1]).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}`;
    }
  }

  return (
    <div className="filter-pane">
      <h1>Filters</h1>
      <button className="button-icon button-close" onClick={onClose}>
        <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
      <div className="amount-input">
        <NumberFormat
          caption="min amount"
          customInput={Input}
          thousandSeparator={true}
          onValueChange={(values) => {
            const { value } = values;
          }}>
          <span style={{ position: 'absolute', top: 25, left: 22 }}>$</span>
        </NumberFormat>
        <div className="flex-center" style={{ fontWeight: 700, fontSize: 18, color: 'rgb(113,113,113)' }}>
          -
        </div>
        <NumberFormat
          caption="max amount"
          customInput={Input}
          thousandSeparator={true}
          onValueChange={(values) => {
            const { value } = values;
          }}>
          <span style={{ position: 'absolute', top: 25, left: 22 }}>$</span>
        </NumberFormat>
      </div>
      <div className="date-input">
        <div style={{ padding: '0px 18px 18px 18px' }}>
          <Input caption="from date - to date" value={dateString}>
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
                className="button-icon button-close"
                onClick={() => setDateRange([null, null])}
                style={{ color: '#1a2027', position: 'absolute', right: 4, left: 'initial', top: 15 }}>
                <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </button>
            )}
          </Input>
        </div>
        <div className="date-picker" ref={pickerRef} style={{ height: HEIGHT, width: '100%' }}>
          <div
            className="date-picker_slide"
            style={{ position: 'relative', height: '100%', width: groups.length * WIDTH + GAP * 2 }}>
            {groups.slice(frontIndex, rearIndex).map((g) => (
              <Group
                key={`${g.month}${g.year}`}
                group={buildGroupData(g)}
                fromDate={dateRange[0]}
                toDate={dateRange[1]}
                onSelect={(d) => {
                  const [from, to] = dateRange;

                  if (from === null) {
                    setDateRange([d, null]);
                  } else if (to === null) {
                    setDateRange(from > d ? [d, from] : [from, d]);
                  } else {
                    if (Math.abs(d - from) > Math.abs(d - to)) {
                      setDateRange(from < d ? [from, d] : [d, from]);
                    } else {
                      setDateRange(to < d ? [to, d] : [d, to]);
                    }
                  }
                }}
                style={{
                  background: g.index % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.03)',
                  position: 'absolute',
                  top: 0,
                  left: g.index * WIDTH + GAP,
                  width: WIDTH,
                  height: '100%',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Group({
  group,
  fromDate,
  toDate,
  style,
  onSelect,
}: {
  fromDate: Date | null;
  toDate: Date | null;
  style: React.CSSProperties;
  group: GroupExtend;
  onSelect: (d: Date) => void;
}) {
  return (
    <div style={style} className="group">
      <div style={{ gridColumn: '1 / 8' }}>{`${MonthNames[group.month]} ${group.year}`}</div>
      {DayNames.map((d) => (
        <div key={d}>{d}</div>
      ))}
      {group.dates.map((d, i) => (
        <button
          className={cx({
            dimmed: d.getMonth() !== group.month,
            selected:
              d.getMonth() === group.month &&
              (isSameDate(d, fromDate) || isSameDate(d, toDate) || (d > fromDate && d < toDate)),
          })}
          onClick={() => onSelect(d)}
          key={i}>
          {d.getDate()}
        </button>
      ))}
    </div>
  );
}

function isSameDate(d1: Date | null, d2: Date | null) {
  if (!d1 || !d2) return false;

  return (
    d1.getDate() === d2.getDate() && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
  );
}