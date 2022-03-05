import { useCallback, useState } from 'react';

interface DateData {
  day: number;
  date: number;
}

interface MonthData {
  month: number;
  year: number;
  dates: DateData;
}

export default function useDate() {
  const [months, setMonths] = useState<MonthData[]>([]);

  const next = useCallback(() => {
    const last = months[months.length - 1];

    const curr = new Date(last.year, last.month, 1);

    for (let i = 1; i <= 12; i++) {}
  }, []);

  return {
    months,
  };
}
