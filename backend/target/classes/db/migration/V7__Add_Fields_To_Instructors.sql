-- V7__Add_Fields_To_Instructors.sql
-- Adiciona novos campos à tabela 'instructors' e cria a tabela 'instructor_certifications'

-- Adicionar colunas para contato de emergência e experiência
ALTER TABLE instructors ADD COLUMN emergency_contact VARCHAR(255) NULL;
ALTER TABLE instructors ADD COLUMN emergency_phone VARCHAR(50) NULL;
ALTER TABLE instructors ADD COLUMN experience TEXT NULL;

-- Criar tabela para certificações
CREATE TABLE instructor_certifications (
    instructor_id BIGINT NOT NULL,
    certification VARCHAR(255) NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE CASCADE
);

-- Criar índice para a chave estrangeira
CREATE INDEX idx_instructor_certifications_instructor_id ON instructor_certifications (instructor_id);
