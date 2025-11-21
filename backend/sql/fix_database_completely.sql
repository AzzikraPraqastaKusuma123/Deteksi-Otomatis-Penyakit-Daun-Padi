-- Perbaikan lengkap struktur database PadiGuard

-- Hapus tabel diseases jika sudah ada (untuk membuat ulang dengan struktur yang benar)
-- CATATAN: Pastikan untuk mencadangkan data jika sudah ada data penting
-- DROP TABLE IF EXISTS diseases;

-- Membuat ulang tabel diseases dengan struktur lengkap yang sesuai dengan aplikasi
CREATE TABLE IF NOT EXISTS diseases (
  id int NOT NULL AUTO_INCREMENT,
  disease_name_id varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  disease_name_en varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  scientific_name varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  description_id text COLLATE utf8mb4_general_ci,
  description_en text COLLATE utf8mb4_general_ci,
  prevention_id text COLLATE utf8mb4_general_ci,
  prevention_en text COLLATE utf8mb4_general_ci,
  symptoms_id text COLLATE utf8mb4_general_ci,
  symptoms_en text COLLATE utf8mb4_general_ci,
  treatment_recommendations_id text COLLATE utf8mb4_general_ci,
  treatment_recommendations_en text COLLATE utf8mb4_general_ci,
  image_url_example varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  gemini_informasi_detail_id text COLLATE utf8mb4_general_ci,
  gemini_solusi_penyembuhan_id text COLLATE utf8mb4_general_ci,
  gemini_rekomendasi_produk_json_id text COLLATE utf8mb4_general_ci,
  gemini_informasi_detail_en text COLLATE utf8mb4_general_ci,
  gemini_solusi_penyembuhan_en text COLLATE utf8mb4_general_ci,
  gemini_rekomendasi_produk_json_en text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tambahkan kolom-kolom yang diperlukan ke tabel detections jika belum ada
ALTER TABLE detections 
ADD COLUMN IF NOT EXISTS gemini_informasi_detail TEXT,
ADD COLUMN IF NOT EXISTS gemini_solusi_penyembuhan TEXT,
ADD COLUMN IF NOT EXISTS gemini_rekomendasi_produk_json TEXT;

-- Pindahkan data lama dari kolom-kolom dasar ke versi bahasa Indonesia
-- Ini akan mengisi kolom bahasa Indonesia dengan data yang sudah ada
UPDATE diseases 
SET 
    disease_name_id = COALESCE(disease_name_id, disease_name),
    description_id = COALESCE(description_id, description),
    prevention_id = COALESCE(prevention_id, prevention),
    symptoms_id = COALESCE(symptoms_id, symptoms),
    treatment_recommendations_id = COALESCE(treatment_recommendations_id, treatment_recommendations)
WHERE id IS NOT NULL;

-- Setel nilai default untuk versi bahasa Inggris agar tidak NULL
UPDATE diseases 
SET 
    disease_name_en = COALESCE(disease_name_en, disease_name_id),
    description_en = COALESCE(description_en, description_id),
    prevention_en = COALESCE(prevention_en, prevention_id),
    symptoms_en = COALESCE(symptoms_en, symptoms_id),
    treatment_recommendations_en = COALESCE(treatment_recommendations_en, treatment_recommendations_id)
WHERE id IS NOT NULL;

-- Pastikan semua kolom yang diharapkan oleh aplikasi sekarang ada
-- Cek struktur tabel diseases
DESCRIBE diseases;

-- Cek struktur tabel detections
DESCRIBE detections;

-- Tampilkan contoh data dari tabel diseases untuk memastikan data tersedia
SELECT 
    id,
    disease_name_en AS disease_name,
    scientific_name,
    description_en AS description,
    prevention_en AS prevention,
    symptoms_en AS symptoms,
    treatment_recommendations_en AS treatment_recommendations,
    image_url_example,
    gemini_informasi_detail_en AS gemini_informasi_detail,
    gemini_solusi_penyembuhan_en AS gemini_solusi_penyembuhan,
    gemini_rekomendasi_produk_json_en AS gemini_rekomendasi_produk_json
FROM diseases
ORDER BY disease_name_en ASC
LIMIT 5;

-- Tampilkan contoh data dari tabel detections untuk memastikan data tersedia
SELECT 
    id,
    user_id,
    disease_name,
    confidence,
    image_url,
    description,
    prevention,
    treatment_recommendations,
    gemini_informasi_detail,
    gemini_solusi_penyembuhan,
    gemini_rekomendasi_produk_json
FROM detections
LIMIT 5;