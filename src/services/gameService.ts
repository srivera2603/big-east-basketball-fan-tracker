import { SupabaseClient } from '@supabase/supabase-js';
import { Game } from '@/types';
import { PostgresError } from '@/errors';

export async function getGamesService(
  startDate: string,
  endDate: string,
  supabase: SupabaseClient,
): Promise<Game[]> {
  const { data, error } = await supabase
    .from('YearSchedule')
    .select()
    .gte('utc_start_time', startDate)
    .lte('utc_start_time', endDate);
  if (error) {
    throw new PostgresError(error.message);
  }
  return data;
}
