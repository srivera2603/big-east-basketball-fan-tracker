import Link from 'next/link';
import GoogleSignIn from '@/components/GoogleSignIn';
import { createSupabaseClient } from '@/lib/supabase/server-actions';
import { LoggedInProfile } from './LoggedInProfile';

export default async function NavBar() {
  const supabase = await createSupabaseClient();
  const { data: session } = await supabase.auth.getSession();
  return (
    <header className="bg-blue-900 text-gray-200 py-6 mt-auto font-heading flex justify-center items-center space-x-8">
      <Link href="/">Home</Link>
      <Link href="/news">News</Link>
      <Link href="/calendar">Calendar</Link>
      <Link href="/standings">Standings</Link>
      <Link href="/rosters">Rosters</Link>
      {session.session ? <LoggedInProfile session={session.session} /> : <GoogleSignIn />}
    </header>
  );
}
