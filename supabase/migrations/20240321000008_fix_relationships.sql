-- Primeiro, vamos remover as políticas existentes da tabela users
DROP POLICY IF EXISTS "Usuários podem ver seus próprios dados" ON users;
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios dados" ON users;
DROP POLICY IF EXISTS "Admins podem ver todos os usuários" ON users;
DROP POLICY IF EXISTS "Admins podem atualizar todos os usuários" ON users;

-- Agora vamos corrigir a estrutura da tabela posts
ALTER TABLE posts
DROP CONSTRAINT IF EXISTS posts_author_id_fkey;

ALTER TABLE posts
ADD CONSTRAINT posts_author_id_fkey
FOREIGN KEY (author_id)
REFERENCES users(id)
ON DELETE CASCADE;

-- Vamos recriar as políticas da tabela users de forma não recursiva
CREATE POLICY "Usuários podem ver seus próprios dados"
ON users
FOR SELECT
USING (supabase_user_id = auth.uid());

CREATE POLICY "Usuários podem atualizar seus próprios dados"
ON users
FOR UPDATE
USING (supabase_user_id = auth.uid());

CREATE POLICY "Admins podem ver todos os usuários"
ON users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users u
    WHERE u.supabase_user_id = auth.uid()
    AND u.role_id = (SELECT id FROM roles WHERE name = 'admin')
  )
);

CREATE POLICY "Admins podem atualizar todos os usuários"
ON users
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users u
    WHERE u.supabase_user_id = auth.uid()
    AND u.role_id = (SELECT id FROM roles WHERE name = 'admin')
  )
);

-- Vamos atualizar as políticas da tabela posts para usar a relação correta
DROP POLICY IF EXISTS "Autores podem ver seus próprios posts" ON posts;
DROP POLICY IF EXISTS "Autores podem atualizar seus próprios posts não aprovados" ON posts;

CREATE POLICY "Autores podem ver seus próprios posts"
ON posts
FOR SELECT
USING (
  author_id IN (
    SELECT id FROM users
    WHERE supabase_user_id = auth.uid()
  )
);

CREATE POLICY "Autores podem atualizar seus próprios posts não aprovados"
ON posts
FOR UPDATE
USING (
  author_id IN (
    SELECT id FROM users
    WHERE supabase_user_id = auth.uid()
  )
  AND approved = false
); 