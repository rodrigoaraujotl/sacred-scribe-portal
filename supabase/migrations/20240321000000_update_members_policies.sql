-- Habilita RLS na tabela members
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Remove políticas existentes
DROP POLICY IF EXISTS "Users can view their own member data" ON members;
DROP POLICY IF EXISTS "Users can update their own member data" ON members;
DROP POLICY IF EXISTS "Users can insert their own member data" ON members;

-- Cria novas políticas
CREATE POLICY "Users can view their own member data"
ON members
FOR SELECT
USING (
  id IN (
    SELECT member_id 
    FROM users 
    WHERE supabase_user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own member data"
ON members
FOR UPDATE
USING (
  id IN (
    SELECT member_id 
    FROM users 
    WHERE supabase_user_id = auth.uid()
  )
);

-- Política para permitir inserção durante o registro
CREATE POLICY "Enable insert for registration"
ON members
FOR INSERT
WITH CHECK (true);

-- Política para permitir que administradores vejam todos os membros
CREATE POLICY "Admins can view all members"
ON members
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id = 1  -- Assumindo que 1 é o ID do papel de administrador
  )
);

-- Política para permitir que administradores atualizem todos os membros
CREATE POLICY "Admins can update all members"
ON members
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id = 1  -- Assumindo que 1 é o ID do papel de administrador
  )
); 