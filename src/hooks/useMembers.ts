import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/supabase';

export function useMembers() {
  const queryClient = useQueryClient();

  const { data: members, isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('members')
        .select(`
          *,
          teams:member_teams(
            team:cell_teams(*)
          )
        `)
        .order('join_date', { ascending: false });

      if (error) throw error;
      return data as (Tables['members'] & {
        teams: {
          team: Tables['cell_teams'];
        }[];
      })[];
    },
  });

  const createMember = useMutation({
    mutationFn: async (newMember: Omit<Tables['members'], 'id'>) => {
      const { data, error } = await supabase
        .from('members')
        .insert([newMember])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });

  const updateMember = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Tables['members']> & { id: number }) => {
      const { data, error } = await supabase
        .from('members')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });

  const deleteMember = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });

  const addMemberToTeam = useMutation({
    mutationFn: async ({ member_id, team_id }: { member_id: number; team_id: number }) => {
      const { data, error } = await supabase
        .from('member_teams')
        .insert([{ member_id, team_id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });

  const removeMemberFromTeam = useMutation({
    mutationFn: async ({ member_id, team_id }: { member_id: number; team_id: number }) => {
      const { error } = await supabase
        .from('member_teams')
        .delete()
        .match({ member_id, team_id });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });

  return {
    members,
    isLoading,
    error,
    createMember,
    updateMember,
    deleteMember,
    addMemberToTeam,
    removeMemberFromTeam,
  };
} 