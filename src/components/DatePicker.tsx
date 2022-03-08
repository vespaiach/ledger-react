import { useRef, useEffect, useState } from 'react';
import cx from 'classnames';

import useDate, { buildGroupData, DayNames, GroupExtend, MonthNames } from '../utils/useDate';
import { listenTo } from '../utils/window';
import { Maybe } from 'graphql/jsutils/Maybe';

const WIDTH = 340;
const HEIGHT = 360;
const OVER_SCAN = 10;
const GAP = 18;

const FROM = 2000;
const TO = 2200;

export default function DatePicker({
  fromDate,
  toDate,
  allowRange = false,
  onChange,
}: {
  allowRange?: boolean;
  fromDate?: Maybe<Date>;
  toDate?: Maybe<Date>;
  onChange: (values: [Maybe<Date>, Maybe<Date>]) => void;
}) {
  const pickerRef = useRef<HTMLDivElement>(null);

  const [frontIndex, setFrontIndex] = useState(0);
  const [rearIndex, setRearIndex] = useState(OVER_SCAN);
  const { groups } = useDate({ from: FROM, to: TO });

  useEffect(() => {
    if (!pickerRef.current) return;

    const unsub = listenTo(pickerRef.current, 'scroll', function (event) {
      if (!event.target) return;

      const currIndex = Math.floor((event.target as HTMLDivElement).scrollLeft / WIDTH);

      setFrontIndex(currIndex - OVER_SCAN < 0 ? 0 : currIndex - OVER_SCAN);
      setRearIndex(currIndex + OVER_SCAN > groups.length ? groups.length - 1 : currIndex + OVER_SCAN);
    });

    const currYearIndex = (new Date().getFullYear() - FROM) * 12 - 1;

    pickerRef.current.scrollTo({ left: currYearIndex * WIDTH });

    return unsub;
  }, [pickerRef.current]);

  return (
    <div className="date-picker" ref={pickerRef} style={{ height: HEIGHT, width: '100%' }}>
      <div
        className="date-picker_slide"
        style={{ position: 'relative', height: '100%', width: groups.length * WIDTH + GAP * 2 }}>
        {groups.slice(frontIndex, rearIndex).map((g) => (
          <Group
            key={`${g.month}${g.year}`}
            group={buildGroupData(g)}
            fromDate={fromDate}
            toDate={toDate}
            onSelect={(d) => {
              if (!allowRange) {
                onChange([d, null]);
                return;
              }

              if (fromDate === null || fromDate === undefined) {
                onChange?.([d, null]);
              } else if (toDate === null || toDate === undefined) {
                onChange?.(fromDate > d ? [d, fromDate] : [fromDate, d]);
              } else {
                if (Math.abs(d.getTime() - fromDate.getTime()) > Math.abs(d.getTime() - toDate.getTime())) {
                  onChange?.(fromDate < d ? [fromDate, d] : [d, fromDate]);
                } else {
                  onChange?.(toDate < d ? [toDate, d] : [d, toDate]);
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
  );
}

function Group({
  group,
  fromDate,
  toDate,
  style,
  onSelect,
}: {
  fromDate?: Date | null;
  toDate?: Date | null;
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
              (isSameDate(d, fromDate) ||
                isSameDate(d, toDate) ||
                (fromDate && toDate && d > fromDate && d < toDate)),
          })}
          onClick={() => onSelect(d)}
          key={i}>
          {d.getDate()}
        </button>
      ))}
    </div>
  );
}

function isSameDate(d1: Maybe<Date>, d2: Maybe<Date>) {
  if (!d1 || !d2) return false;

  return (
    d1.getDate() === d2.getDate() && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
  );
}
