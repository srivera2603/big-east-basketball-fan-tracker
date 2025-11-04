import GameCardPreview from './GameCardPreview';
import { useEffect, useRef, useState } from 'react';

interface DayCellProps {
  cell: { day: number; currentMonth: boolean };
  isToday: boolean;
  games: Array<{
    id: string;
    homeTeam: string;
    awayTeam: string;
    time: string;
  }>;
}

export default function DayCell({ cell, isToday, games }: DayCellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  useEffect(() => {
    const frame = containerRef.current;
    if (!frame) return;

    const updateFades = () => {
      const atTop = frame.scrollTop <= 0;
      const atBottom = frame.scrollHeight - frame.scrollTop <= frame.clientHeight + 1;

      setShowTopFade(!atTop);
      setShowBottomFade(!atBottom);
    };

    updateFades();
    frame.addEventListener('scroll', updateFades);
    return () => {
      frame.removeEventListener('scroll', updateFades);
    };
  }, []);

  return (
    <div className="border border-gray-300 bg-white flex flex-col p-2 relative h-[130px]">
      <div className="relative inline-flex items-center justify-center mb-1">
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
      </div>
      <div className="flex-grow overflow-auto scrollbar-hide relative" ref={containerRef}>
        {/* Top gradient */}
        <div className="sticky top-0 h-0 pointer-events-none z-10">
          <div
            className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent transition-opacity duration-300 ${
              showTopFade ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        {/* Games list */}
        <div className="space-y-2">
          {games.map((game) => (
            <GameCardPreview key={game.id} {...game} />
          ))}
        </div>
        {/* Bottom gradient */}
        <div className="sticky bottom-0 h-0 pointer-events-none z-10">
          <div
            className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent transition-opacity duration-300 ${
              showBottomFade ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
