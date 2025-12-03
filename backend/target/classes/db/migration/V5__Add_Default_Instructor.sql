-- V5__Add_Default_Instructor.sql

-- Creates a default administrator instructor to allow initial login.
-- Password is 'admin' (without quotes).
-- You should change this password immediately after logging in for the first time.
INSERT INTO instructors (name, email, password, role, status, hire_date)
VALUES (
    'Admin',
    'admin@sarahpilates.com',
    '$2a$10$8.A2.c0y0/.b2.C0y0/.e.U7.sU7.sU7.sU7.sU7.sU7.sU7', -- BCrypt hash for 'admin'
    'ADMIN',
    'ATIVO',
    CURDATE()
);
