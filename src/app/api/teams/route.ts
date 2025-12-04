import { createSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { getTeamsService } from '@/services/teamService';

export async function GET(req: Request) {
  const supabase = await createSupabaseClient();

  const games = await getTeamsService(supabase);

  return NextResponse.json(games);
}
