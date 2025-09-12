-- Primeiro, vamos remover a política de inserção existente
DROP POLICY IF EXISTS "Usuários podem se registrar" ON users;

-- Agora vamos criar uma nova política de inserção que não causa recursão
CREATE POLICY "Usuários podem se registrar"
ON users
FOR INSERT
WITH CHECK (
  -- Permite inserção se o supabase_user_id corresponder ao usuário autenticado
  supabase_user_id = auth.uid()
  -- E se o role_id for o de membro (role padrão)
  AND role_id = (SELECT id FROM roles WHERE name = 'member')
);

-- Vamos também adicionar uma política para permitir que admins criem usuários
CREATE POLICY "Admins podem criar usuários"
ON users
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users u
    WHERE u.supabase_user_id = auth.uid()
    AND u.role_id = (SELECT id FROM roles WHERE name = 'admin')
  )
); 