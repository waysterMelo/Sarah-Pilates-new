-- Instructors
INSERT INTO instructors (name, email, phone, cref, specialties, commission_rate, active) VALUES
('João da Silva', 'instrutor@sarahpilates.com', '11999990001', '123456-G/SP', 'Pilates Clássico, Reabilitação', 0.4, true),
('Maria Oliveira', 'maria@sarahpilates.com', '11999990002', '654321-G/SP', 'Pilates Aéreo, Gestantes', 0.45, true);

-- Students
INSERT INTO students (name, email, phone, birth_date, sex, address, status, plan) VALUES
('Ana Souza', 'ana@email.com', '11988887777', '1990-05-15', 'FEMININO', 'Rua das Flores, 123', 'ATIVO', 'Mensal - 8 aulas'),
('Carlos Pereira', 'carlos@email.com', '11977776666', '1985-10-20', 'MASCULINO', 'Av. Paulista, 1000', 'ATIVO', 'Trimestral');

-- Class Types
INSERT INTO class_types (name, description, duration, price, capacity, intensity, color) VALUES
('Pilates Solo', 'Aula de Pilates no solo com acessórios.', 60, 80.00, 10, 'MEDIA', '#FF5733'),
('Pilates Aparelho', 'Aula de Pilates utilizando aparelhos.', 60, 100.00, 3, 'ALTA', '#33FF57');

-- Schedules (Some past, some future)
-- Assuming IDs 1 and 2 for class_types inserted above
INSERT INTO schedules (student_id, instructor_id, class_type_id, date, start_time, end_time, status, price, payment_status, room) VALUES
(1, 1, 1, CURDATE(), '09:00:00', '10:00:00', 'AGENDADO', 80.00, 'PENDENTE', 'Sala 1'),
(2, 2, 2, CURDATE(), '10:00:00', '11:00:00', 'CONFIRMADO', 100.00, 'PAGO', 'Sala 2');
