import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/supabase';

export function useCells() {
  const queryClient = useQueryClient();

  const { data: cells, isLoading, error } = useQuery({
    queryKey: ['cells'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cells')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Tables['cells'][];
    },
  });

  const createCell = useMutation({
    mutationFn: async (newCell: Omit<Tables['cells'], 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('cells')
        .insert([newCell])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cells'] });
    },
  });

  const updateCell = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Tables['cells']> & { id: string }) => {
      const { data, error } = await supabase
        .from('cells')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cells'] });
    },
  });

  const deleteCell = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('cells')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cells'] });
    },
  });

  return {
    cells,
    isLoading,
    error,
    createCell,
    updateCell,
    deleteCell,
  };
} 