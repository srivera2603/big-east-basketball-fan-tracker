'use client';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import MonthNav from '@/components/calendar/MonthNav';
import { useState } from 'react';

export default function Calendar() {
  const today = new Date();
  const [visibleMonth, setVisibleMonth] = useState(today.getMonth());
  const [visibleYear, setVisibleYear] = useState(today.getFullYear());

  const goPrevMonth = () => {
    if (visibleMonth === 0) {
      setVisibleMonth(11);
      setVisibleYear(visibleYear - 1);
    } else {
      setVisibleMonth(visibleMonth - 1);
    }
  };

  const goNextMonth = () => {
    if (visibleMonth === 11) {
      setVisibleMonth(0);
      setVisibleYear(visibleYear + 1);
    } else {
      setVisibleMonth(visibleMonth + 1);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-blue-50">
      <div className="flex flex-col items-center justify-center">
        <MonthNav
          visibleMonth={visibleMonth}
          visibleYear={visibleYear}
          onPrev={goPrevMonth}
          onNext={goNextMonth}
        />
        <CalendarGrid visibleMonth={visibleMonth} visibleYear={visibleYear} today={today} />
      </div>
    </main>
  );
}
