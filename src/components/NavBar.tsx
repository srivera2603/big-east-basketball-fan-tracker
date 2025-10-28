import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="bg-blue-900 text-gray-200 py-6 mt-auto font-heading flex justify-center space-x-8">
      <Link href="/">Home</Link>
      <Link href="/news">News</Link>
      <Link href="/calendar">Calendar</Link>
      <Link href="/standings">Standings</Link>
      <Link href="/rosters">Rosters</Link>
    </header>
  );
}
