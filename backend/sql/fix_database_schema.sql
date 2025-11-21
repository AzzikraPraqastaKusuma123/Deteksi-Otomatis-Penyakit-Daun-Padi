-- SQL script to fix the database schema for PadiGuard application
-- This adds all missing columns that the application code is trying to access

-- First, add missing columns to the diseases table
-- The application expects multilingual support and AI-generated information fields

ALTER TABLE diseases 
ADD COLUMN IF NOT EXISTS disease_name_id VARCHAR(100) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS disease_name_en VARCHAR(100) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS description_id TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS prevention_id TEXT,
ADD COLUMN IF NOT EXISTS prevention_en TEXT,
ADD COLUMN IF NOT EXISTS symptoms_id TEXT,
ADD COLUMN IF NOT EXISTS symptoms_en TEXT,
ADD COLUMN IF NOT EXISTS treatment_recommendations_id TEXT,
ADD COLUMN IF NOT EXISTS treatment_recommendations_en TEXT,
ADD COLUMN IF NOT EXISTS gemini_informasi_detail_id TEXT,
ADD COLUMN IF NOT EXISTS gemini_solusi_penyembuhan_id TEXT,
ADD COLUMN IF NOT EXISTS gemini_rekomendasi_produk_json_id TEXT,
ADD COLUMN IF NOT EXISTS gemini_informasi_detail_en TEXT,
ADD COLUMN IF NOT EXISTS gemini_solusi_penyembuhan_en TEXT,
ADD COLUMN IF NOT EXISTS gemini_rekomendasi_produk_json_en TEXT;

-- Update existing records to have multilingual fields
-- Copy existing data to the Indonesian fields
UPDATE diseases 
SET 
    disease_name_id = COALESCE(disease_name_id, disease_name),
    description_id = COALESCE(description_id, description),
    prevention_id = COALESCE(prevention_id, prevention),
    symptoms_id = COALESCE(symptoms_id, symptoms),
    treatment_recommendations_id = COALESCE(treatment_recommendations_id, treatment_recommendations)
WHERE disease_name_id IS NULL;

-- Set English fields to match Indonesian fields as default
UPDATE diseases 
SET 
    disease_name_en = COALESCE(disease_name_en, disease_name_id),
    description_en = COALESCE(description_en, description_id),
    prevention_en = COALESCE(prevention_en, prevention_id),
    symptoms_en = COALESCE(symptoms_en, symptoms_id),
    treatment_recommendations_en = COALESCE(treatment_recommendations_en, treatment_recommendations_id)
WHERE disease_name_en IS NULL;

-- Add missing columns to the detections table
ALTER TABLE detections 
ADD COLUMN IF NOT EXISTS gemini_informasi_detail TEXT,
ADD COLUMN IF NOT EXISTS gemini_solusi_penyembuhan TEXT,
ADD COLUMN IF NOT EXISTS gemini_rekomendasi_produk_json TEXT;

-- Verify all required columns exist now
SELECT 
    COLUMN_NAME 
FROM 
    INFORMATION_SCHEMA.COLUMNS 
WHERE 
    TABLE_SCHEMA = 'db_padi_guard' 
    AND TABLE_NAME = 'diseases'
    AND COLUMN_NAME IN (
        'disease_name_id', 
        'disease_name_en', 
        'description_id', 
        'description_en', 
        'prevention_id',
        'prevention_en',
        'symptoms_id',
        'symptoms_en',
        'treatment_recommendations_id',
        'treatment_recommendations_en',
        'gemini_informasi_detail_id',
        'gemini_solusi_penyembuhan_id',
        'gemini_rekomendasi_produk_json_id',
        'gemini_informasi_detail_en',
        'gemini_solusi_penyembuhan_en',
        'gemini_rekomendasi_produk_json_en'
    );

SELECT 
    COLUMN_NAME 
FROM 
    INFORMATION_SCHEMA.COLUMNS 
WHERE 
    TABLE_SCHEMA = 'db_padi_guard' 
    AND TABLE_NAME = 'detections'
    AND COLUMN_NAME IN (
        'gemini_informasi_detail',
        'gemini_solusi_penyembuhan',
        'gemini_rekomendasi_produk_json'
    );