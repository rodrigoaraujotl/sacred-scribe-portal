-- Cria a tabela de relacionamento entre papéis e permissões
CREATE TABLE role_permissions (
  id SERIAL PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(role_id, permission_id)
);

-- Insere as permissões padrão para cada papel
-- Admin tem todas as permissões
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions;

-- Moderador tem permissões de conteúdo
INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, id FROM permissions
WHERE name IN (
  'view_members',
  'view_cells',
  'view_posts',
  'view_events',
  'create_post',
  'edit_post',
  'delete_post',
  'publish_post',
  'create_event',
  'edit_event',
  'delete_event'
);

-- Membro tem permissões básicas
INSERT INTO role_permissions (role_id, permission_id)
SELECT 3, id FROM permissions
WHERE name IN (
  'view_members',
  'view_cells',
  'view_posts',
  'view_events',
  'create_post'
);

-- Habilita RLS
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Cria políticas de segurança
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
    AND users.role_id = 1  -- ID do papel de admin
  )
);

-- Cria trigger para atualizar o updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON role_permissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 