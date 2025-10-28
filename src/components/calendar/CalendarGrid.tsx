import { useMemo } from 'react';

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

  return (
    <div className="flex flex-col items-center w-full max-w-5x1 mb-8">
      {/* Day Grid */}
      <div className="grid grid-cols-7 w-[80%] h-[85vh] w-full max-w-5xl">
        {/* Example days */}
        {daysArray.map((cell, i) => {
          const isToday =
            cell.day === currDay && visibleMonth === currMonth && visibleYear === currYear;
          return (
            <div
              key={i}
              className="border border-gray-300 bg-white flex items-start justify-start p-2 relative"
            >
              <span className="relative inline-flex items-center justify-center">
                {isToday && <span className="absolute w-6 h-6 bg-red-500 rounded-full"></span>}
                <span
                  className={`text-sm ${
                    isToday
                      ? 'text-white font-bold'
                      : cell.currentMonth
                        ? 'text-gray-800 font-bold'
                        : 'text-gray-400'
                  } relative`}
                >
                  {cell.day}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
