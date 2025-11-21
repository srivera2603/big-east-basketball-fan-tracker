interface MonthNavProps {
  visibleMonth: number;
  visibleYear: number;
  onPrev: () => void;
  onNext: () => void;
  minMonth?: number; // Boundaries to keep people in season
  maxMonth?: number;
}

const months = [
  'January',
  'February',
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

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function MonthNav({
  visibleMonth,
  visibleYear,
  onPrev,
  onNext,
  minMonth = 9, // October
  maxMonth = 3, // April
}: MonthNavProps) {
  const prevDisabled = visibleMonth === minMonth;
  const nextDisabled = visibleMonth === maxMonth;

  return (
    <div className="bg-blue-900 shadow-md rounded-t-lg px-4 py-0 mt-8 flex flex-col items-center w-full max-w-5xl">
      {/* Month/Year and buttons*/}
      <div className="flex items-center justify-between w-full max-w-5xl px-4 mt-6 mb-4">
        <button
          onClick={onPrev}
          className={`px-2 py-1 rounded ${prevDisabled ? 'bg-gray-100 opacity-50 cursor-not-allowed' : 'text-white bg-blue-700'}`}
          disabled={prevDisabled}
        >
          Prev
        </button>
        <h2 className="text-gray-200 text-2xl font-bold">
          {months[visibleMonth]} {visibleYear}
        </h2>
        <button
          onClick={onNext}
          className={`px-2 py-1 rounded ${nextDisabled ? 'bg-gray-100 opacity-50 cursor-not-allowed' : 'text-white bg-blue-700'}`}
          disabled={nextDisabled}
        >
          Next
        </button>
      </div>
      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-3 w-full max-w-5xl">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-semibold text-gray-200">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
