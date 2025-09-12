-- Cria a tabela de papéis
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insere os papéis padrão
INSERT INTO roles (name, description) VALUES
  ('admin', 'Administrador do sistema com acesso total'),
  ('moderator', 'Moderador com acesso a gerenciamento de conteúdo'),
  ('member', 'Membro com acesso básico');

-- Habilita RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Cria políticas de segurança
CREATE POLICY "Todos podem ver os papéis"
ON roles
FOR SELECT
USING (true);

CREATE POLICY "Apenas admins podem gerenciar papéis"
ON roles
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
  BEFORE UPDATE ON roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 