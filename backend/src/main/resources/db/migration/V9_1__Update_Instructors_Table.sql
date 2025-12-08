-- V9_1__Update_Instructors_Table.sql

-- Adicionar colunas faltantes à tabela instructors
ALTER TABLE instructors ADD COLUMN cref VARCHAR(255);
ALTER TABLE instructors ADD COLUMN specialties VARCHAR(255);
ALTER TABLE instructors ADD COLUMN commission_rate DECIMAL(10, 2);
ALTER TABLE instructors ADD COLUMN active BOOLEAN DEFAULT TRUE;

-- Atualizar registros existentes para garantir integridade
UPDATE instructors SET active = TRUE WHERE active IS NULL;
