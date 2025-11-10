import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: session, isLoading } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
  });

  const { data: user } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    },
    enabled: !!session,
  });

  const signUp = useMutation({
    mutationFn: async ({ email, password, userData }: { 
      email: string; 
      password: string;
      userData: {
        first_name: string;
        last_name: string;
        phone_number?: string;
        address?: string;
        visitor_origin?: string;
      };
    }) => {
      // 1. Criar o usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Erro ao criar usuário');

      // 2. Criar o membro no banco de dados
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .insert([{
          first_name: userData.first_name,
          last_name: userData.last_name,
          email,
          phone_number: userData.phone_number,
          address: userData.address,
          visitor_origin: userData.visitor_origin,
        }])
        .select()
        .single();

      if (memberError) throw memberError;

      // 3. Criar o usuário no banco de dados
      const { error: userError } = await supabase
        .from('users')
        .insert([{
          username: email.split('@')[0],
          password: '', // A senha é gerenciada pelo Supabase Auth
          role_id: 3, // ID do papel de membro (você precisa ajustar isso)
          member_id: memberData.id,
          supabase_user_id: authData.user.id,
        }]);

      if (userError) throw userError;

      return authData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success('Conta criada com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao criar conta: ' + error.message);
    },
  });

  const signIn = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success('Login realizado com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao fazer login: ' + error.message);
    },
  });

  const signOut = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success('Logout realizado com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao fazer logout: ' + error.message);
    },
  });

  const resetPassword = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Email de recuperação enviado!');
    },
    onError: (error) => {
      toast.error('Erro ao enviar email de recuperação: ' + error.message);
    },
  });

  return {
    session,
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };
} 