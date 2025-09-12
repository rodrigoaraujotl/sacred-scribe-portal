-- Habilita RLS em todas as tabelas
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE cell_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE cell_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cell_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_teams ENABLE ROW LEVEL SECURITY;

-- Políticas para members
CREATE POLICY "Todos podem ver membros"
ON members
FOR SELECT
USING (true);

CREATE POLICY "Apenas admins podem criar membros"
ON members
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id = (SELECT id FROM roles WHERE name = 'admin')
  )
);

CREATE POLICY "Apenas admins podem atualizar membros"
ON members
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id = (SELECT id FROM roles WHERE name = 'admin')
  )
);

-- Políticas para posts
CREATE POLICY "Todos podem ver posts aprovados"
ON posts
FOR SELECT
USING (approved = true);

CREATE POLICY "Autores podem ver seus próprios posts"
ON posts
FOR SELECT
USING (
  author_id IN (
    SELECT id FROM users
    WHERE supabase_user_id = auth.uid()
  )
);

CREATE POLICY "Moderadores e admins podem ver todos os posts"
ON posts
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
);

CREATE POLICY "Usuários podem criar posts"
ON posts
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
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

CREATE POLICY "Moderadores e admins podem atualizar qualquer post"
ON posts
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
);

-- Políticas para comments
CREATE POLICY "Todos podem ver comentários"
ON comments
FOR SELECT
USING (true);

CREATE POLICY "Usuários autenticados podem criar comentários"
ON comments
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
  )
);

CREATE POLICY "Autores podem atualizar seus próprios comentários"
ON comments
FOR UPDATE
USING (
  author_id IN (
    SELECT id FROM users
    WHERE supabase_user_id = auth.uid()
  )
);

CREATE POLICY "Moderadores e admins podem atualizar qualquer comentário"
ON comments
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
);

-- Políticas para events
CREATE POLICY "Todos podem ver eventos"
ON events
FOR SELECT
USING (true);

CREATE POLICY "Moderadores e admins podem gerenciar eventos"
ON events
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
);

-- Políticas para attendance
CREATE POLICY "Todos podem ver suas próprias presenças"
ON attendance
FOR SELECT
USING (
  member_id IN (
    SELECT m.id FROM members m
    JOIN users u ON u.member_id = m.id
    WHERE u.supabase_user_id = auth.uid()
  )
);

CREATE POLICY "Moderadores e admins podem ver todas as presenças"
ON attendance
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
);

CREATE POLICY "Moderadores e admins podem gerenciar presenças"
ON attendance
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
);

-- Políticas para cell_teams
CREATE POLICY "Todos podem ver células"
ON cell_teams
FOR SELECT
USING (true);

CREATE POLICY "Moderadores e admins podem gerenciar células"
ON cell_teams
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
);

-- Políticas para cell_meetings
CREATE POLICY "Todos podem ver reuniões de células"
ON cell_meetings
FOR SELECT
USING (true);

CREATE POLICY "Moderadores e admins podem gerenciar reuniões"
ON cell_meetings
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
);

-- Políticas para cell_attendance
CREATE POLICY "Todos podem ver suas próprias presenças em células"
ON cell_attendance
FOR SELECT
USING (
  member_id IN (
    SELECT m.id FROM members m
    JOIN users u ON u.member_id = m.id
    WHERE u.supabase_user_id = auth.uid()
  )
);

CREATE POLICY "Moderadores e admins podem ver todas as presenças em células"
ON cell_attendance
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
);

CREATE POLICY "Moderadores e admins podem gerenciar presenças em células"
ON cell_attendance
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
);

-- Políticas para member_teams
CREATE POLICY "Todos podem ver membros das células"
ON member_teams
FOR SELECT
USING (true);

CREATE POLICY "Moderadores e admins podem gerenciar membros das células"
ON member_teams
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id IN (
      (SELECT id FROM roles WHERE name = 'admin'),
      (SELECT id FROM roles WHERE name = 'moderator')
    )
  )
); 