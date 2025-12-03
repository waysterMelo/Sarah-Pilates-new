-- V5__Add_Admin_User.sql
-- Insere usuário administrador padrão
-- Email: admin@sarahpilates.com
-- Senha: 123456

INSERT INTO instructors (name, email, password, role, status, hire_date)
VALUES (
           'Administrador',
           'admin@sarahpilates.com',
           '$2a$10$N9qo8uLOickgx2ZUrjKj9uh6WY0dWJJECZ9qZJqW5p0JXj5kI8s0O', -- BCrypt hash de '123456'
           'ROLE_ADMIN',
           'ATIVO',
           CURDATE()
       );
