import { createSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { getTeamsService } from '@/services/teamService';
import { PostgresError } from '@/errors';

export async function GET(req: Request) {
  try {
    const supabase = await createSupabaseClient();

    const games = await getTeamsService(supabase);

    return NextResponse.json(games);
  } catch (error) {
    if (error instanceof PostgresError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
