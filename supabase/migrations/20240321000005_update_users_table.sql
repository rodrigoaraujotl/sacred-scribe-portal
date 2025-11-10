-- Adiciona a coluna role_id na tabela users
ALTER TABLE users
ADD COLUMN role_id INTEGER REFERENCES roles(id);

-- Atualiza os usuários existentes para ter o papel de membro
UPDATE users
SET role_id = 3  -- ID do papel de member
WHERE role_id IS NULL;

-- Torna a coluna role_id obrigatória
ALTER TABLE users
ALTER COLUMN role_id SET NOT NULL;

-- Atualiza as políticas de segurança
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;

CREATE POLICY "Users can view their own data"
ON users
FOR SELECT
USING (supabase_user_id = auth.uid());

CREATE POLICY "Users can update their own data"
ON users
FOR UPDATE
USING (supabase_user_id = auth.uid());

CREATE POLICY "Enable insert for registration"
ON users
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all users"
ON users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id = 1  -- ID do papel de admin
  )
);

CREATE POLICY "Admins can update all users"
ON users
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id = 1  -- ID do papel de admin
  )
); 