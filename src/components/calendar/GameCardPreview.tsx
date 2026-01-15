interface GameCardProps {
  id: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
}

export default function GameCard({ id, homeTeam, awayTeam, time }: GameCardProps) {
  return (
    <div className="bg-blue-100 rounded-md text-center text-xs p-1 truncate">
      {awayTeam} @ {homeTeam}
    </div>
  );
}
