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
