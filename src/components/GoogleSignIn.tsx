'use client';
import { supabase } from '@/lib/supabase/client';
import { usePathname } from 'next/navigation';

export default function GoogleSignIn() {
  const pathname = usePathname();

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/api/auth/callback?redirect_to=${encodeURIComponent(pathname)}`,
      },
    });
  };

  return (
    <button
      className="absolute bg-gray-200 text-blue-400 px-2 py-1 right-4 rounded"
      onClick={signIn}
    >
      Sign in
    </button>
  );
}
