import { useEffect, useState } from 'react';

export interface GroupExtend extends Group {
  dates: Date[];
}

export const DayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MonthNames = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface Group {
  index: number;
  month: number;
  year: number;
  startDate: Date;
}

export default function useDate({ from, to }: { from: number; to: number }) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const groupList: Group[] = [];
    let index = 0;

    for (let year = from; year <= to; year++) {
      for (let month = 0; month < 12; month++) {
        const startDate = new Date(year, month, 1);

        if (startDate.getDay() > 0) {
          startDate.setDate(startDate.getDate() - startDate.getDay());
        }

        groupList.push({ startDate, year, month, index });
        index++;
      }
    }

    setGroups(groupList);
    setLoading(false);
  }, [from, to]);

  return { loading, groups };
}

export function buildGroupData(group: Group) {
  const data: GroupExtend = { ...group, dates: [] };

  const startDate = new Date(group.startDate);
  data.dates.push(new Date(startDate));

  for (let i = 1; i < 7 * 6; i++) {
    startDate.setDate(startDate.getDate() + 1);
    data.dates.push(new Date(startDate));
  }

  return data;
}
