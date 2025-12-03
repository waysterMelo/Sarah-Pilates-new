-- Inserir um novo instrutor que servirá como usuário de login
-- A senha é '123456', já criptografada com BCrypt
INSERT INTO instructors (name, email, password, role, status, hire_date)
VALUES (
    'Admin User',
    'admin@sarahpilates.com',
    '$2a$10$3z0.nSmi32n3s7lR/GzMzeJ5ZZm6i5z2.H.3T.hYp5Y3iA2pTPoI.', -- senha: '123456'
    'ROLE_ADMIN',
    'ATIVO',
    CURDATE()
);
