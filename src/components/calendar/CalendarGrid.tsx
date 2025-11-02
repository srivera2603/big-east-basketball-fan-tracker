import { useMemo } from 'react';
import DayCell from './DayCell';

interface CalendarGridProps {
  visibleMonth: number;
  visibleYear: number;
  today: Date;
}

export default function CalendarGrid({ visibleMonth, visibleYear, today }: CalendarGridProps) {
  //Months are zero-indexed: 0 = January, 1 = February, ..., 9 = October, ..., 11 = December
  const currDay = today.getDate();
  const currMonth = today.getMonth();
  const currYear = today.getFullYear();

  const daysArray = useMemo(() => {
    const firstDay = new Date(visibleYear, visibleMonth, 1).getDay();
    const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate(); //Really weird quirk of JS Date API
    const daysInPrevMonth = new Date(visibleYear, visibleMonth, 0).getDate();
    const totalCells = firstDay + daysInMonth < 35 ? 35 : 42;
    const array = [];
    /// Previous month
    for (let i = 0; i < firstDay; i++) {
      array.push({ day: daysInPrevMonth - firstDay + 1 + i, currentMonth: false });
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      array.push({ day, currentMonth: true });
    }

    // Next month
    for (let i = 0; i < totalCells - firstDay - daysInMonth; i++) {
      array.push({ day: i + 1, currentMonth: false });
    }
    return array;
  }, [visibleMonth, visibleYear]);

  const fake_games = [
    { id: '1', homeTeam: 'XAVIER', awayTeam: 'BUTLER', time: '7:00 PM' },
    { id: '2', homeTeam: 'CONN', awayTeam: 'BUT', time: '8:00 PM' },
    { id: '3', homeTeam: 'XAVIER', awayTeam: 'BUTLER', time: '8:00 PM' },
    { id: '4', homeTeam: 'CONN', awayTeam: 'BUT', time: '9:00 PM' },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-5x1 mb-8">
      {/* Day Grid */}
      <div className="grid grid-cols-7 w-[80%] w-full max-w-5xl style={{ gridTemplateRows: `repeat(${numRows}` }}">
        {/* Example days */}
        {daysArray.map((cell, i) => {
          const isoKey = `${visibleYear}-${String(visibleMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
          const isToday =
            cell.day === currDay &&
            visibleMonth === currMonth &&
            visibleYear === currYear &&
            cell.currentMonth;
          return <DayCell key={isoKey} cell={cell} isToday={isToday} games={fake_games} />;
        })}
      </div>
    </div>
  );
}
