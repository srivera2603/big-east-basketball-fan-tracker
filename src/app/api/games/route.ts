import { createSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { getGamesService } from '@/services/gameService';

export async function GET(req: Request) {
  const supabase = await createSupabaseClient();
  const url = new URL(req.url);
  const startDate = url.searchParams.get('startDate') ?? '2025-10-01T00:00:00Z';
  const endDate = url.searchParams.get('endDate') ?? '2026-04-01T00:00:00Z';

  const games = await getGamesService(startDate, endDate, supabase);

  return NextResponse.json(games);
}
