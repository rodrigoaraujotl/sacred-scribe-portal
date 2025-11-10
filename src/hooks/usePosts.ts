import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/supabase';

export function usePosts() {
  const queryClient = useQueryClient();

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:users(*),
          approved_by_user:users!posts_approved_by_fkey(*),
          comments:comments(
            *,
            author:users(*)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as (Tables['posts'] & {
        author: Tables['users'] | null;
        approved_by_user: Tables['users'] | null;
        comments: (Tables['comments'] & {
          author: Tables['users'];
        })[];
      })[];
    },
  });

  const createPost = useMutation({
    mutationFn: async (newPost: Omit<Tables['posts'], 'id' | 'created_at' | 'updated_at' | 'approved' | 'approved_by'>) => {
      const { data, error } = await supabase
        .from('posts')
        .insert([newPost])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Tables['posts']> & { id: number }) => {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const approvePost = useMutation({
    mutationFn: async ({ id, approved_by }: { id: number; approved_by: number }) => {
      const { data, error } = await supabase
        .from('posts')
        .update({ approved: true, approved_by })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const addComment = useMutation({
    mutationFn: async (newComment: Omit<Tables['comments'], 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('comments')
        .insert([newComment])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    posts,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
    approvePost,
    addComment,
    deleteComment,
  };
} 