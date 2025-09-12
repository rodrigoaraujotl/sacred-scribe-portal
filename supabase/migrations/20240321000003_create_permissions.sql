-- Cria a tabela de permissões
CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
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
  
  -- Permissões de posts
  ('view_posts', 'Pode visualizar posts'),
  ('create_post', 'Pode criar novos posts'),
  ('edit_post', 'Pode editar posts'),
  ('delete_post', 'Pode excluir posts'),
  ('publish_post', 'Pode publicar posts'),
  
  -- Permissões de eventos
  ('view_events', 'Pode visualizar eventos'),
  ('create_event', 'Pode criar novos eventos'),
  ('edit_event', 'Pode editar eventos'),
  ('delete_event', 'Pode excluir eventos'),
  
  -- Permissões administrativas
  ('manage_roles', 'Pode gerenciar papéis'),
  ('manage_permissions', 'Pode gerenciar permissões'),
  ('view_analytics', 'Pode visualizar análises');

-- Habilita RLS
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

-- Cria políticas de segurança
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
    AND users.role_id = 1  -- ID do papel de admin
  )
);

-- Cria trigger para atualizar o updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON permissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 