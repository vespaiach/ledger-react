import { useState } from 'react';

interface DateData {
  day: number;
  date: number;
}

interface MonthData {
  month: number;
  year: number;
  dates: DateData;
}

export default function Datepicker() {
  const [months, setMonths] = useState<MonthData[]>([]);

  kk
}
