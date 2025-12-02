-- V4__Alter_Physical_Evaluations_For_Json.sql
-- This migration assumes you are using MySQL 5.7.8+ or a compatible database that supports the JSON type.
-- For other databases, you might need to keep the column as TEXT.

ALTER TABLE physical_evaluations MODIFY COLUMN anatomical_markers JSON;
