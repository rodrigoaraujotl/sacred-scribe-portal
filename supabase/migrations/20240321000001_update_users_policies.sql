-- Habilita RLS na tabela users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Remove políticas existentes
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;

-- Cria novas políticas
CREATE POLICY "Users can view their own data"
ON users
FOR SELECT
USING (supabase_user_id = auth.uid());

CREATE POLICY "Users can update their own data"
ON users
FOR UPDATE
USING (supabase_user_id = auth.uid());

-- Política para permitir inserção durante o registro
CREATE POLICY "Enable insert for registration"
ON users
FOR INSERT
WITH CHECK (true);

-- Política para permitir que administradores vejam todos os usuários
CREATE POLICY "Admins can view all users"
ON users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id = 1  -- Assumindo que 1 é o ID do papel de administrador
  )
);

-- Política para permitir que administradores atualizem todos os usuários
CREATE POLICY "Admins can update all users"
ON users
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id = 1  -- Assumindo que 1 é o ID do papel de administrador
  )
); 