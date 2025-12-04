import { createSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { getGamesService } from '@/services/gameService';
import { PostgresError } from '@/errors';

export async function GET(req: Request) {
  try {
    const supabase = await createSupabaseClient();
    const url = new URL(req.url);
    const startDate = url.searchParams.get('startDate') ?? '2025-10-01T00:00:00Z';
    const endDate = url.searchParams.get('endDate') ?? '2026-04-01T00:00:00Z';

    const games = await getGamesService(startDate, endDate, supabase);

    return NextResponse.json(games);
  } catch (error) {
    if (error instanceof PostgresError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
