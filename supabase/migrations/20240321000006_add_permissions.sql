-- Cria a tabela de permissões
CREATE TABLE permissions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT permissions_pkey PRIMARY KEY (id)
);

-- Cria a tabela de relacionamento entre papéis e permissões
CREATE TABLE role_permissions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  role_id bigint NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id bigint NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT role_permissions_pkey PRIMARY KEY (id),
  CONSTRAINT role_permissions_role_id_permission_id_key UNIQUE (role_id, permission_id)
);

-- Insere as permissões padrão
INSERT INTO permissions (name, description) VALUES
  -- Permissões de membros
  ('view_members', 'Pode visualizar membros'),
  ('create_member', 'Pode criar novos membros'),
  ('edit_member', 'Pode editar membros'),
  ('delete_member', 'Pode excluir membros'),
  
  -- Permissões de células
  ('view_cells', 'Pode visualizar células'),
  ('create_cell', 'Pode criar novas células'),
  ('edit_cell', 'Pode editar células'),
  ('delete_cell', 'Pode excluir células'),
  ('manage_cell_attendance', 'Pode gerenciar presença nas células'),
  
  -- Permissões de posts
  ('view_posts', 'Pode visualizar posts'),
  ('create_post', 'Pode criar novos posts'),
  ('edit_post', 'Pode editar posts'),
  ('delete_post', 'Pode excluir posts'),
  ('approve_post', 'Pode aprovar posts'),
  ('manage_comments', 'Pode gerenciar comentários'),
  
  -- Permissões de eventos
  ('view_events', 'Pode visualizar eventos'),
  ('create_event', 'Pode criar novos eventos'),
  ('edit_event', 'Pode editar eventos'),
  ('delete_event', 'Pode excluir eventos'),
  ('manage_event_attendance', 'Pode gerenciar presença nos eventos'),
  
  -- Permissões administrativas
  ('manage_roles', 'Pode gerenciar papéis'),
  ('manage_permissions', 'Pode gerenciar permissões'),
  ('view_analytics', 'Pode visualizar análises');

-- Insere os papéis padrão se não existirem
INSERT INTO roles (name, description)
SELECT 'admin', 'Administrador do sistema com acesso total'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'admin');

INSERT INTO roles (name, description)
SELECT 'moderator', 'Moderador com acesso a gerenciamento de conteúdo'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'moderator');

INSERT INTO roles (name, description)
SELECT 'member', 'Membro com acesso básico'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'member');

-- Insere as permissões padrão para cada papel
-- Admin tem todas as permissões
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'admin'),
  id 
FROM permissions;

-- Moderador tem permissões de conteúdo
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'moderator'),
  id 
FROM permissions
WHERE name IN (
  'view_members',
  'view_cells',
  'view_posts',
  'view_events',
  'create_post',
  'edit_post',
  'delete_post',
  'approve_post',
  'manage_comments',
  'create_event',
  'edit_event',
  'delete_event',
  'manage_event_attendance',
  'manage_cell_attendance'
);

-- Membro tem permissões básicas
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'member'),
  id 
FROM permissions
WHERE name IN (
  'view_members',
  'view_cells',
  'view_posts',
  'view_events',
  'create_post'
);

-- Habilita RLS em todas as tabelas
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Cria políticas de segurança para permissions
CREATE POLICY "Todos podem ver as permissões"
ON permissions
FOR SELECT
USING (true);

CREATE POLICY "Apenas admins podem gerenciar permissões"
ON permissions
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id = (SELECT id FROM roles WHERE name = 'admin')
  )
);

-- Cria políticas de segurança para role_permissions
CREATE POLICY "Todos podem ver as permissões dos papéis"
ON role_permissions
FOR SELECT
USING (true);

CREATE POLICY "Apenas admins podem gerenciar permissões dos papéis"
ON role_permissions
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.supabase_user_id = auth.uid()
    AND users.role_id = (SELECT id FROM roles WHERE name = 'admin')
  )
); 