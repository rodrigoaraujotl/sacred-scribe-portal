import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/supabase';

export function useCellTeams() {
  const queryClient = useQueryClient();

  const { data: teams, isLoading, error } = useQuery({
    queryKey: ['cell_teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cell_teams')
        .select(`
          *,
          leader:members!cell_teams_leader_id_fkey(*),
          meetings:cell_meetings(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as (Tables['cell_teams'] & {
        leader: Tables['members'] | null;
        meetings: Tables['cell_meetings'][];
      })[];
    },
  });

  const createTeam = useMutation({
    mutationFn: async (newTeam: Omit<Tables['cell_teams'], 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('cell_teams')
        .insert([newTeam])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cell_teams'] });
    },
  });

  const updateTeam = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Tables['cell_teams']> & { id: number }) => {
      const { data, error } = await supabase
        .from('cell_teams')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cell_teams'] });
    },
  });

  const deleteTeam = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('cell_teams')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cell_teams'] });
    },
  });

  return {
    teams,
    isLoading,
    error,
    createTeam,
    updateTeam,
    deleteTeam,
  };
} 