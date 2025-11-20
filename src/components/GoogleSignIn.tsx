'use client';
import { supabase } from '@/lib/supabase/client';
import { usePathname } from 'next/navigation';

export default function GoogleSignIn() {
  const pathname = usePathname();

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?redirect_to=${encodeURIComponent(pathname)}`,
      },
    });
  };

  return <button onClick={signIn}>Sign in with Google</button>;
}
