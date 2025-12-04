import { SupabaseClient } from '@supabase/supabase-js';
import { Team } from '@/types';
import { PostgresError } from '@/errors';

export async function getTeamsService(supabase: SupabaseClient): Promise<Team[]> {
  const { data, error } = await supabase.from('BigEastTeams').select();
  if (error) {
    throw new PostgresError(error.message);
  }
  return data;
}
