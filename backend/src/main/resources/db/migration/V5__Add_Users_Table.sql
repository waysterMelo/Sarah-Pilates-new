-- V5__Add_Users_Table.sql
-- Cria a tabela 'users' e adiciona um usuário administrador padrão.

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'ROLE_USER' NOT NULL,
    status VARCHAR(50) DEFAULT 'ATIVO' NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_status ON users (status);

-- Insere usuário administrador padrão
-- Email: admin@sarahpilates.com
-- Senha: 123456 (hash BCrypt: $2a$10$N9qo8uLOickgx2ZUrjKj9uh6WY0dWJJECZ9qZJqW5p0JXj5kI8s0O)
INSERT INTO users (name, email, password, role, status, created_at, updated_at)
VALUES (
    'Administrador',
    'admin@sarahpilates.com',
    '$2a$10$N9qo8uLOickgx2ZUrjKj9uh6WY0dWJJECZ9qZJqW5p0JXj5kI8s0O', -- BCrypt hash de '123456'
    'ROLE_ADMIN',
    'ATIVO',
    NOW(),
    NOW()
);
