import { createSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const supabase = await createSupabaseClient();
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const redirect_to = url.searchParams.get('redirect_to') ?? '/';

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const absoluteRedirectURL = new URL(redirect_to, url.origin);

  return NextResponse.redirect(absoluteRedirectURL.toString());
}
