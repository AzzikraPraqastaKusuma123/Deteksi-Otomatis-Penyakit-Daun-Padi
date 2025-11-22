-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 21, 2025 at 11:34 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_padi_guard`
--

-- --------------------------------------------------------

--
-- Table structure for table `agricultural_resources`
--

CREATE TABLE `agricultural_resources` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category` enum('Obat','Pestisida','Pupuk Organik','Pupuk Anorganik') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `gemini_overview_id` text COLLATE utf8mb4_general_ci,
  `gemini_overview_en` text COLLATE utf8mb4_general_ci,
  `gemini_usage_tips_id` text COLLATE utf8mb4_general_ci,
  `gemini_usage_tips_en` text COLLATE utf8mb4_general_ci,
  `gemini_benefits_json` json DEFAULT NULL,
  `gemini_rekomendasi_tambahan_json` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agricultural_resources`
--

INSERT INTO `agricultural_resources` (`id`, `name`, `category`, `description`, `image`, `created_at`, `updated_at`, `gemini_overview_id`, `gemini_overview_en`, `gemini_usage_tips_id`, `gemini_usage_tips_en`, `gemini_benefits_json`, `gemini_rekomendasi_tambahan_json`) VALUES
(17, 'Urea (Nitrogen 46%)', 'Pupuk Anorganik', 'Sumber Nitrogen tinggi. PERINGATAN: Kurangi dosis saat tanaman terserang penyakit Blas atau Kresek agar jamur tidak menyebar.', 'urea_pupuk.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'KCL Mahkota', 'Pupuk Anorganik', 'Pupuk Kalium tinggi (60%). Wajib untuk mencegah Brown Spot, memperkuat batang, dan mengisi bulir padi agar bernas.', 'kcl_pupuk.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'SP-36 (Super Phosphate)', 'Pupuk Anorganik', 'Memacu pertumbuhan akar. Akar kuat membantu tanaman bertahan dari Hawar Pelepah (Sheath Blight).', 'sp36_pupuk.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'NPK Phonska Plus', 'Pupuk Anorganik', 'Pupuk majemuk lengkap dengan tambahan Zinc (Zn). Sangat baik untuk pemulihan tanaman yang kerdil atau kuning.', 'npk_phonska.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(21, 'Gandasil D (Daun)', 'Pupuk Anorganik', 'Pupuk daun foliar yang disemprot. Mempercepat pemulihan warna daun hijau setelah serangan hama Hispa.', 'gandasil_d.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'MKP (Mono Kalium Phosphate)', 'Pupuk Anorganik', 'Pupuk bebas Nitrogen. Sangat aman dan disarankan dipakai saat tanaman sedang sakit parah (Blas/Kresek) sebagai sumber energi.', 'mkp_pak_tani.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'ZA (Zwavelzure Ammoniak)', 'Pupuk Anorganik', 'Sumber Nitrogen dan Sulfur. Memperbaiki rasa beras dan ketahanan simpan. Alternatif Urea yang lebih aman.', 'pupuk_za.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(24, 'Pupuk Kandang Fermentasi', 'Pupuk Organik', 'Solusi utama penyakit Brown Spot akibat tanah kurus. Memperbaiki biologi tanah jangka panjang.', 'pupuk_kandang.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(25, 'Pupuk Silika Cair', 'Pupuk Organik', 'Melapisi daun padi jadi sekeras kaca. Hama Hispa tidak doyan, dan spora jamur Blas gagal menembus daun.', 'silika_cair.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(26, 'Asam Humat (Humic Acid)', 'Pupuk Organik', 'Pembenah tanah (Soil Conditioner). Membantu akar menyerap pupuk kimia lebih efisien.', 'asam_humat.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(27, 'Trichokompos', 'Pupuk Organik', 'Kompos plus agen hayati Trichoderma. Membunuh jamur patogen tular tanah penyebab Hawar Pelepah.', 'trichokompos.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(28, 'PGPR (Rhizobacteria)', 'Pupuk Organik', 'Bakteri pemacu tumbuh akar. Melindungi akar dari infeksi bakteri jahat dan menyuburkan tanah.', 'pgpr.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(29, 'POC Nasa', 'Pupuk Organik', 'Pupuk Organik Cair populer. Meningkatkan jumlah anakan padi dan kesuburan daun secara menyeluruh.', 'poc_nasa.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(30, 'Eco Farming', 'Pupuk Organik', 'Bio-fertilizer briket. Mengembalikan kesuburan tanah fisik, kimia, dan biologi yang rusak akibat kimia.', 'eco_farming.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(31, 'Agrept 20WP', 'Obat', 'Bakterisida spesialis untuk penyakit Hawar Daun Bakteri (Kresek/Xanthomonas).', 'agrept.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(32, 'Nordox 56WP', 'Obat', 'Fungisida & Bakterisida berbahan aktif Tembaga Oksida. Kuat menempel di daun saat hujan. Untuk Kresek & Blas.', 'nordox.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(33, 'Fujiwan 400EC', 'Obat', 'Fungisida sistemik paling populer khusus untuk penyakit Blas (Leaf Blast) pada padi.', 'fujiwan.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(34, 'Amistartop 325SC', 'Obat', 'Fungisida kelas atas. Efektif membasmi Hawar Pelepah dan membuat daun tetap hijau royo-royo (efek fitotonik).', 'amistartop.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(35, 'Antracol 70WP', 'Obat', 'Fungisida kontak (tepung) dengan kandungan Zinc. Cocok untuk pencegahan bercak daun (Brown Spot).', 'antracol.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(36, 'Score 250EC', 'Obat', 'Fungisida sistemik Difenokonazol. Menyembuhkan tanaman dan bikin bulir padi bening mengkilap.', 'score.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(37, 'Corrin', 'Obat', 'Agens hayati (Organik) pembasmi bakteri Kresek dan jamur Blas. Aman bagi lingkungan.', 'corrin.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(38, 'Spontan 400SL', 'Pestisida', 'Insektisida racun kontak/lambung. Sangat ampuh membasmi Hama Putih Palsu (Rice Hispa) dan Penggerek Batang.', 'spontan.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(39, 'Regent 50SC', 'Pestisida', 'Insektisida sistemik + ZPT. Membasmi hama sekaligus merangsang akar. Efektif untuk wereng dan walang sangit.', 'regent.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(40, 'Curacron 500EC', 'Pestisida', 'Insektisida racun kuat berbau menyengat. Tuntaskan ulat penggulung daun dan hama kutu-kutuan.', 'curacron.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL),
(41, 'Pestisida Nabati Mimba', 'Pestisida', 'Ekstrak daun Mimba/Neem Oil. Mengacaukan hormon makan hama Hispa secara alami.', 'pestisida_mimba.jpg', '2025-11-20 06:25:02', '2025-11-20 06:25:02', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `detections`
--

CREATE TABLE `detections` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `disease_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `confidence` decimal(5,4) NOT NULL,
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `prevention` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `treatment_recommendations` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `detected_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detections`
--

INSERT INTO `detections` (`id`, `user_id`, `disease_name`, `confidence`, `image_url`, `description`, `prevention`, `treatment_recommendations`, `detected_at`) VALUES
(1, 1, 'Sheath Blight', '0.2635', '/uploads/detection_1762488238120.jpg', 'Penyakit ini ditandai dengan lesi oval atau elips berwarna putih keabu-abuan dengan tepi coklat pada pelepah daun, biasanya dekat garis air.', '1. Atur jarak tanam agar tidak terlalu rapat.\n2. Lakukan drainase yang baik pada lahan.\n3. Gunakan varietas padi yang tahan.', NULL, '2025-11-07 04:03:58'),
(2, 1, 'Narrow Brown Leaf Spot', '0.2774', '/uploads/detection_1762488517304.jpg', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \n2. Pemupukan Kalium (K) yang cukup sangat penting.', NULL, '2025-11-07 04:08:37'),
(3, 1, 'Narrow Brown Leaf Spot', '0.2794', '/uploads/detection_1762605755865.jpg', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \n2. Pemupukan Kalium (K) yang cukup sangat penting.', NULL, '2025-11-08 12:42:35'),
(4, 1, 'Brown Spot', '0.2533', '/uploads/detection_1762605970152.jpg', 'Menimbulkan bercak-bercak oval berwarna coklat pada daun, pelepah, dan bulir. Sering terjadi pada lahan yang kekurangan nutrisi.', '1. Pemupukan berimbang (terutama Kalium). \n2. Sanitasi lahan. \n3. Gunakan benih sehat.', NULL, '2025-11-08 12:46:10'),
(5, 1, 'Brown Spot', '0.2796', '/uploads/detection_1762605998384.jpg', 'Menimbulkan bercak-bercak oval berwarna coklat pada daun, pelepah, dan bulir. Sering terjadi pada lahan yang kekurangan nutrisi.', '1. Pemupukan berimbang (terutama Kalium). \n2. Sanitasi lahan. \n3. Gunakan benih sehat.', NULL, '2025-11-08 12:46:38'),
(6, 1, 'Leaf Blast', '0.2782', '/uploads/detection_1762606014378.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', NULL, '2025-11-08 12:46:54'),
(7, 1, 'Sheath Blight', '0.2789', '/uploads/detection_1762606117742.jpg', 'Penyakit ini ditandai dengan lesi oval atau elips berwarna putih keabu-abuan dengan tepi coklat pada pelepah daun, biasanya dekat garis air.', '1. Atur jarak tanam agar tidak terlalu rapat. \n2. Lakukan drainase yang baik. \n3. Gunakan varietas padi yang tahan.', NULL, '2025-11-08 12:48:37'),
(8, 1, 'Sheath Blight', '0.2783', '/uploads/detection_1762606163354.jpg', 'Penyakit ini ditandai dengan lesi oval atau elips berwarna putih keabu-abuan dengan tepi coklat pada pelepah daun, biasanya dekat garis air.', '1. Atur jarak tanam agar tidak terlalu rapat. \n2. Lakukan drainase yang baik. \n3. Gunakan varietas padi yang tahan.', NULL, '2025-11-08 12:49:23'),
(9, 1, 'Leaf Blast', '0.2789', '/uploads/detection_1762606185353.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', NULL, '2025-11-08 12:49:45'),
(10, 1, 'Rice Hispa', '0.2796', '/uploads/detection_1762606228043.jpg', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', '1. Sanitasi lahan. \n2. Lepas predator alami (bebek). \n3. Tanam serentak.', NULL, '2025-11-08 12:50:28'),
(11, 1, 'Rice Hispa', '0.2789', '/uploads/detection_1762606754082.jpg', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', '1. Sanitasi lahan. \n2. Lepas predator alami (bebek). \n3. Tanam serentak.', NULL, '2025-11-08 12:59:14'),
(12, 1, 'Leaf Scald', '0.2742', '/uploads/detection_1762607430758.jpg', 'Menyebabkan lesi besar, memanjang, berwarna coklat muda atau abu-abu kehijauan pada ujung daun, seringkali dengan pola \"zona\" konsentris.', '1. Jaga kebersihan lahan. \n2. Gunakan benih bersertifikat. \n3. Pemupukan Kalium yang cukup.', NULL, '2025-11-08 13:10:30'),
(13, 1, 'Rice Hispa', '0.2479', '/uploads/detection_1762607519169.jpg', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', '1. Sanitasi lahan. \n2. Lepas predator alami (bebek). \n3. Tanam serentak.', NULL, '2025-11-08 13:11:59'),
(14, 4, 'Healthy Rice Leaf', '0.2797', '/uploads/detection_1762609226852.jpg', 'Daun tampak sehat, berwarna hijau seragam, dan tidak menunjukkan tanda-tanda lesi, bercak, atau perubahan warna.', 'Pertahankan praktik agronomi yang baik, pemupukan berimbang, dan pengairan yang cukup.', NULL, '2025-11-08 13:40:26'),
(15, 4, 'Rice Hispa', '0.1689', '/uploads/detection_1762609249391.jpg', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', '1. Sanitasi lahan. \n2. Lepas predator alami (bebek). \n3. Tanam serentak.', NULL, '2025-11-08 13:40:49'),
(16, 4, 'Sheath Blight', '0.1940', '/uploads/detection_1762609259872.jpg', 'Penyakit ini ditandai dengan lesi oval atau elips berwarna putih keabu-abuan dengan tepi coklat pada pelepah daun, biasanya dekat garis air.', '1. Atur jarak tanam agar tidak terlalu rapat. \n2. Lakukan drainase yang baik. \n3. Gunakan varietas padi yang tahan.', NULL, '2025-11-08 13:40:59'),
(17, 1, 'Bacterial Leaf Blight', '0.1664', '/uploads/detection_1762610723399.jpg', 'Penyakit ini menyebabkan lesi berair pada tepi daun yang kemudian menguning, menjadi abu-abu, dan kering. Sering disebut \"kresek\".', '1. Gunakan varietas tahan. \n2. Pastikan drainase baik. \n3. Jangan gunakan pupuk Nitrogen berlebihan.', NULL, '2025-11-08 14:05:23'),
(18, 1, 'Healthy Rice Leaf', '0.2797', '/uploads/detection_1762612855294.jpg', 'Daun tampak sehat, berwarna hijau seragam, dan tidak menunjukkan tanda-tanda lesi, bercak, atau perubahan warna.', 'Pertahankan praktik agronomi yang baik, pemupukan berimbang, dan pengairan yang cukup.', NULL, '2025-11-08 14:40:55'),
(19, 6, 'Healthy Rice Leaf', '0.2797', '/uploads/detection_1762613343609.jpg', 'Daun tampak sehat, berwarna hijau seragam, dan tidak menunjukkan tanda-tanda lesi, bercak, atau perubahan warna.', 'Pertahankan praktik agronomi yang baik, pemupukan berimbang, dan pengairan yang cukup.', NULL, '2025-11-08 14:49:03'),
(20, 6, 'Brown Spot', '0.2795', '/uploads/detection_1762613359289.jpg', 'Menimbulkan bercak-bercak oval berwarna coklat pada daun, pelepah, dan bulir. Sering terjadi pada lahan yang kekurangan nutrisi.', '1. Pemupukan berimbang (terutama Kalium). \n2. Sanitasi lahan. \n3. Gunakan benih sehat.', NULL, '2025-11-08 14:49:19'),
(21, 6, 'Rice Hispa', '0.2633', '/uploads/detection_1762613376909.jpg', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', '1. Sanitasi lahan. \n2. Lepas predator alami (bebek). \n3. Tanam serentak.', NULL, '2025-11-08 14:49:36'),
(22, 1, 'Leaf Blast', '0.2677', '/uploads/detection_1762613423601.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', NULL, '2025-11-08 14:50:23'),
(23, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763010965268.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', NULL, '2025-11-13 05:16:05'),
(24, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763013139697.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', NULL, '2025-11-13 05:52:19'),
(25, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763013586722.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 05:59:46'),
(26, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763014330863.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:12:10'),
(27, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763014353439.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:12:33'),
(28, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763014435099.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:13:55'),
(29, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763014557586.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:15:57'),
(30, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763014705318.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:18:25'),
(31, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763014724371.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:18:44'),
(32, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763014754300.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:19:14'),
(33, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763014962018.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:22:42'),
(34, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763015212209.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:26:52'),
(35, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763015257252.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:27:37'),
(36, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763015541322.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:32:21'),
(37, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763015860398.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:37:40'),
(38, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763015928410.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:38:48'),
(39, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763015959717.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:39:19'),
(40, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763016086895.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:41:26'),
(41, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763017197938.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 06:59:57'),
(42, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763017270330.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 07:01:10'),
(43, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763017468981.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 07:04:29'),
(44, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763017893644.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 07:11:33'),
(45, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763018026204.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 07:13:46'),
(46, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763018292385.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 07:18:12'),
(47, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763018574807.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 07:22:54'),
(48, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763018612832.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 07:23:32'),
(49, 1, 'Healthy Rice Leaf', '0.2344', '/uploads/detection_1763018719220.jpg', 'Daun tampak sehat, berwarna hijau seragam, dan tidak menunjukkan tanda-tanda lesi, bercak, atau perubahan warna.', 'Pertahankan praktik agronomi yang baik, pemupukan berimbang, dan pengairan yang cukup.', 'Tidak memerlukan perawatan. Lanjutkan pemantauan rutin.', '2025-11-13 07:25:19'),
(50, 1, 'Rice Hispa', '0.2696', '/uploads/detection_1763018804781.jpg', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', '1. Sanitasi lahan. \n2. Lepas predator alami (bebek). \n3. Tanam serentak.', 'Gunakan insektisida sistemik seperti fipronil atau carbofuran jika populasi hama tinggi.', '2025-11-13 07:26:44'),
(51, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763042295793.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 13:58:15'),
(52, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763043485067.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 14:18:05'),
(53, 1, 'Narrow Brown Leaf Spot', '0.2771', '/uploads/detection_1763044157631.jpg', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \n2. Pemupukan Kalium (K) yang cukup sangat penting.', 'Fungisida umumnya tidak diperlukan kecuali jika parah. Fokus pada manajemen nutrisi (Kalium).', '2025-11-13 14:29:17'),
(54, 1, 'Narrow Brown Leaf Spot', '0.2771', '/uploads/detection_1763062548051.jpg', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \n2. Pemupukan Kalium (K) yang cukup sangat penting.', 'Fungisida umumnya tidak diperlukan kecuali jika parah. Fokus pada manajemen nutrisi (Kalium).', '2025-11-13 19:35:48'),
(55, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763062690941.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-13 19:38:10'),
(56, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763181502027.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 04:38:22'),
(57, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763181526527.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 04:38:46'),
(58, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763181629384.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 04:40:29'),
(59, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763182027466.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 04:47:07'),
(60, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763182409779.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 04:53:29'),
(61, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763182840096.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 05:00:40'),
(62, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763182990663.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 05:03:10'),
(63, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763183225049.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 05:07:05'),
(64, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763184174822.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 05:22:54'),
(65, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763184294747.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 05:24:54'),
(66, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763201958796.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 10:19:18'),
(67, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763207294912.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-15 11:48:14'),
(68, 1, 'Leaf Blast', '0.2795', '/uploads/detection_1763311037174.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-16 16:37:17'),
(69, 1, 'Narrow Brown Leaf Spot', '0.2771', '/uploads/detection_1763311061048.jpg', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \n2. Pemupukan Kalium (K) yang cukup sangat penting.', 'Fungisida umumnya tidak diperlukan kecuali jika parah. Fokus pada manajemen nutrisi (Kalium).', '2025-11-16 16:37:41'),
(70, 1, 'Narrow Brown Leaf Spot', '0.2771', '/uploads/detection_1763336184956.jpg', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \n2. Pemupukan Kalium (K) yang cukup sangat penting.', 'Fungisida umumnya tidak diperlukan kecuali jika parah. Fokus pada manajemen nutrisi (Kalium).', '2025-11-16 23:36:24'),
(71, 1, 'Narrow Brown Leaf Spot', '0.2771', '/uploads/detection_1763351944934.jpg', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \n2. Pemupukan Kalium (K) yang cukup sangat penting.', 'Fungisida umumnya tidak diperlukan kecuali jika parah. Fokus pada manajemen nutrisi (Kalium).', '2025-11-17 03:59:04'),
(72, 1, 'Rice Hispa', '0.1900', '/uploads/detection_1763352535874.jpg', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', '1. Sanitasi lahan. \n2. Lepas predator alami (bebek). \n3. Tanam serentak.', 'Gunakan insektisida sistemik seperti fipronil atau carbofuran jika populasi hama tinggi.', '2025-11-17 04:08:55'),
(73, 1, 'Narrow Brown Leaf Spot', '0.2771', '/uploads/detection_1763523611678.jpg', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \n2. Pemupukan Kalium (K) yang cukup sangat penting.', 'Fungisida umumnya tidak diperlukan kecuali jika parah. Fokus pada manajemen nutrisi (Kalium).', '2025-11-19 03:40:11'),
(74, 1, 'Leaf Blast', '0.2037', '/uploads/detection_1763528294792.jpg', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', '2025-11-19 04:58:14'),
(75, 1, 'Narrow Brown Leaf Spot', '0.2771', '/uploads/detection_1763716300944.jpg', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \r\n2. Pemupukan Kalium (K) yang cukup sangat penting.', 'Fungisida umumnya tidak diperlukan kecuali jika parah. Fokus pada manajemen nutrisi (Kalium).', '2025-11-21 09:11:40'),
(76, 1, 'Bacterial Leaf Blight', '0.1845', '/uploads/detection_1763716341345.jpg', 'Bacterial Leaf Blight (BLB) atau Hawar Daun Bakteri disebabkan oleh bakteri *Xanthomonas oryzae pv. oryzae*. Gejala utamanya adalah bercak kuning pada daun yang kemudian meluas dan mengering, terutama pada saat padi memasuki fase pertumbuhan vegetatif hingga generatif. Serangan parah dapat menyebabkan penurunan hasil panen yang signifikan karena mengganggu proses fotosintesis dan pengisian bulir padi.', 'Pencegahan BLB meliputi penggunaan varietas padi yang tahan, pengelolaan air irigasi yang baik (hindari penggenangan terus-menerus), pemupukan berimbang (kurangi penggunaan nitrogen berlebihan), dan sanitasi lahan (membersihkan sisa-sisa tanaman). Secara organik, dapat digunakan agens hayati seperti *Bacillus subtilis*. Jika serangan parah, dapat digunakan bakterisida berbahan aktif streptomisin sulfat atau bahan aktif lainnya yang sesuai dengan rekomendasi setempat, namun penggunaannya harus bijaksana dan sesuai dosis.', 'Pengendalian kimia sulit. Gunakan bakterisida berbasis tembaga pada tahap awal. Fokus pada pencegahan.', '2025-11-21 09:12:21');

-- --------------------------------------------------------

--
-- Table structure for table `diseases`
--

CREATE TABLE `diseases` (
  `id` int NOT NULL,
  `disease_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `disease_name_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `disease_name_en` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `scientific_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_id` text COLLATE utf8mb4_general_ci,
  `description_en` text COLLATE utf8mb4_general_ci,
  `prevention` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `prevention_id` text COLLATE utf8mb4_general_ci,
  `prevention_en` text COLLATE utf8mb4_general_ci,
  `symptoms` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `symptoms_id` text COLLATE utf8mb4_general_ci,
  `symptoms_en` text COLLATE utf8mb4_general_ci,
  `treatment_recommendations` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `treatment_recommendations_id` text COLLATE utf8mb4_general_ci,
  `treatment_recommendations_en` text COLLATE utf8mb4_general_ci,
  `image_url_example` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gemini_informasi_detail` text COLLATE utf8mb4_general_ci,
  `gemini_solusi_penyembuhan` text COLLATE utf8mb4_general_ci,
  `gemini_rekomendasi_produk_json` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diseases`
--

INSERT INTO `diseases` (`id`, `disease_name`, `disease_name_id`, `disease_name_en`, `scientific_name`, `description`, `description_id`, `description_en`, `prevention`, `prevention_id`, `prevention_en`, `symptoms`, `symptoms_id`, `symptoms_en`, `treatment_recommendations`, `treatment_recommendations_id`, `treatment_recommendations_en`, `image_url_example`, `gemini_informasi_detail`, `gemini_solusi_penyembuhan`, `gemini_rekomendasi_produk_json`) VALUES
(1, 'Healthy Rice Leaf', 'Healthy Rice Leaf', NULL, 'N/A', 'Daun tampak sehat, berwarna hijau seragam, dan tidak menunjukkan tanda-tanda lesi, bercak, atau perubahan warna.', 'Daun tampak sehat, berwarna hijau seragam, dan tidak menunjukkan tanda-tanda lesi, bercak, atau perubahan warna.', NULL, 'Pertahankan praktik agronomi yang baik, pemupukan berimbang, dan pengairan yang cukup.', 'Pertahankan praktik agronomi yang baik, pemupukan berimbang, dan pengairan yang cukup.', NULL, 'Tidak ada gejala. Daun hijau cerah dan utuh.', 'Tidak ada gejala. Daun hijau cerah dan utuh.', NULL, 'Tidak memerlukan perawatan. Lanjutkan pemantauan rutin.', 'Tidak memerlukan perawatan. Lanjutkan pemantauan rutin.', NULL, '/images/diseases/disease_1763598518265.jpg', NULL, NULL, NULL),
(2, 'Bacterial Leaf Blight', 'Bacterial Leaf Blight', NULL, 'Xanthomonas oryzae pv. oryzae', 'Penyakit ini menyebabkan lesi berair pada tepi daun yang kemudian menguning, menjadi abu-abu, dan kering. Sering disebut \"kresek\".', 'Penyakit ini menyebabkan lesi berair pada tepi daun yang kemudian menguning, menjadi abu-abu, dan kering. Sering disebut \"kresek\".', NULL, '1. Gunakan varietas tahan. \r\n2. Pastikan drainase baik. \r\n3. Jangan gunakan pupuk Nitrogen berlebihan.', '1. Gunakan varietas tahan. \r\n2. Pastikan drainase baik. \r\n3. Jangan gunakan pupuk Nitrogen berlebihan.', NULL, 'Bercak kelabu berair di tepi daun, mengering, daun menggulung, terutama di pagi hari.', 'Bercak kelabu berair di tepi daun, mengering, daun menggulung, terutama di pagi hari.', NULL, 'Pengendalian kimia sulit. Gunakan bakterisida berbasis tembaga pada tahap awal. Fokus pada pencegahan.', 'Pengendalian kimia sulit. Gunakan bakterisida berbasis tembaga pada tahap awal. Fokus pada pencegahan.', NULL, '/images/diseases/disease_1763598489025.jpg', NULL, NULL, NULL),
(3, 'Brown Spot', 'Brown Spot', NULL, 'Cochliobolus miyabeanus', 'Menimbulkan bercak-bercak oval berwarna coklat pada daun, pelepah, dan bulir. Sering terjadi pada lahan yang kekurangan nutrisi.', 'Menimbulkan bercak-bercak oval berwarna coklat pada daun, pelepah, dan bulir. Sering terjadi pada lahan yang kekurangan nutrisi.', NULL, '1. Pemupukan berimbang (terutama Kalium). \r\n2. Sanitasi lahan. \r\n3. Gunakan benih sehat.', '1. Pemupukan berimbang (terutama Kalium). \r\n2. Sanitasi lahan. \r\n3. Gunakan benih sehat.', NULL, 'Bercak oval coklat dengan titik abu-abu di tengah. Ukuran bercak bervariasi.', 'Bercak oval coklat dengan titik abu-abu di tengah. Ukuran bercak bervariasi.', NULL, 'Semprot dengan fungisida seperti mancozeb atau propiconazole jika serangan parah.', 'Semprot dengan fungisida seperti mancozeb atau propiconazole jika serangan parah.', NULL, '/images/diseases/disease_1763598502035.jpg', NULL, NULL, NULL),
(4, 'Leaf Blast', 'Leaf Blast', NULL, 'Pyricularia oryzae', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', NULL, '1. Gunakan varietas tahan. \r\n2. Hindari pemupukan Nitrogen berlebih. \r\n3. Atur jarak tanam.', '1. Gunakan varietas tahan. \r\n2. Hindari pemupukan Nitrogen berlebih. \r\n3. Atur jarak tanam.', NULL, 'Bercak berbentuk ketupat dengan pusat abu-abu dan tepi coklat kemerahan.', 'Bercak berbentuk ketupat dengan pusat abu-abu dan tepi coklat kemerahan.', NULL, 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', NULL, '/images/diseases/disease_1763598531434.jpg', NULL, NULL, NULL),
(5, 'Leaf Scald', 'Leaf Scald', NULL, 'Microdochium oryzae', 'Menyebabkan lesi besar, memanjang, berwarna coklat muda atau abu-abu kehijauan pada ujung daun, seringkali dengan pola \"zona\" konsentris.', 'Menyebabkan lesi besar, memanjang, berwarna coklat muda atau abu-abu kehijauan pada ujung daun, seringkali dengan pola \"zona\" konsentris.', NULL, '1. Jaga kebersihan lahan. \r\n2. Gunakan benih bersertifikat. \r\n3. Pemupukan Kalium yang cukup.', '1. Jaga kebersihan lahan. \r\n2. Gunakan benih bersertifikat. \r\n3. Pemupukan Kalium yang cukup.', NULL, 'Lesi besar di ujung daun seperti tersiram air panas, bergaris-garis konsentris (seperti gelombang).', 'Lesi besar di ujung daun seperti tersiram air panas, bergaris-garis konsentris (seperti gelombang).', NULL, 'Penggunaan fungisida (seperti benomyl) dapat membantu, tetapi pencegahan lebih utama.', 'Penggunaan fungisida (seperti benomyl) dapat membantu, tetapi pencegahan lebih utama.', NULL, '/images/diseases/disease_1763598544591.jpg', NULL, NULL, NULL),
(6, 'Narrow Brown Leaf Spot', 'Narrow Brown Leaf Spot', NULL, 'Cercospora oryzae', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', NULL, '1. Gunakan varietas tahan. \r\n2. Pemupukan Kalium (K) yang cukup sangat penting.', '1. Gunakan varietas tahan. \r\n2. Pemupukan Kalium (K) yang cukup sangat penting.', NULL, 'Garis-garis sempit berwarna coklat kemerahan, sejajar dengan urat daun.', 'Garis-garis sempit berwarna coklat kemerahan, sejajar dengan urat daun.', NULL, 'Fungisida umumnya tidak diperlukan kecuali jika parah. Fokus pada manajemen nutrisi (Kalium).', 'Fungisida umumnya tidak diperlukan kecuali jika parah. Fokus pada manajemen nutrisi (Kalium).', NULL, '/images/diseases/disease_1763598555006.jpg', NULL, NULL, NULL),
(7, 'Rice Hispa', 'Rice Hispa', NULL, 'Dicladispa armigera', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', NULL, '1. Sanitasi lahan. \r\n2. Lepas predator alami (bebek). \r\n3. Tanam serentak.', '1. Sanitasi lahan. \r\n2. Lepas predator alami (bebek). \r\n3. Tanam serentak.', NULL, 'Garis-garis putih memanjang pada daun, paralel dengan urat daun. Daun tampak \"terkikis\" dan kering.', 'Garis-garis putih memanjang pada daun, paralel dengan urat daun. Daun tampak \"terkikis\" dan kering.', NULL, 'Gunakan insektisida sistemik seperti fipronil atau carbofuran jika populasi hama tinggi.', 'Gunakan insektisida sistemik seperti fipronil atau carbofuran jika populasi hama tinggi.', NULL, '/images/diseases/disease_1763598567231.jpg', NULL, NULL, NULL),
(8, 'Sheath Blight', 'Sheath Blight', NULL, 'Rhizoctonia solani', 'Penyakit ini ditandai dengan lesi oval atau elips berwarna putih keabu-abuan dengan tepi coklat pada pelepah daun, biasanya dekat garis air.', 'Penyakit ini ditandai dengan lesi oval atau elips berwarna putih keabu-abuan dengan tepi coklat pada pelepah daun, biasanya dekat garis air.', NULL, '1. Atur jarak tanam agar tidak terlalu rapat. \r\n2. Lakukan drainase yang baik. \r\n3. Gunakan varietas padi yang tahan.', '1. Atur jarak tanam agar tidak terlalu rapat. \r\n2. Lakukan drainase yang baik. \r\n3. Gunakan varietas padi yang tahan.', NULL, 'Lesi oval keabu-abuan pada pelepah (dekat air), menyebar ke atas dengan pola seperti sisik ular.', 'Lesi oval keabu-abuan pada pelepah (dekat air), menyebar ke atas dengan pola seperti sisik ular.', NULL, 'Gunakan fungisida yang direkomendasikan seperti propiconazole atau hexaconazole sesuai dosis anjuran.', 'Gunakan fungisida yang direkomendasikan seperti propiconazole atau hexaconazole sesuai dosis anjuran.', NULL, '/images/diseases/disease_1763598577562.jpg', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `disease_solutions`
--

CREATE TABLE `disease_solutions` (
  `id` int NOT NULL,
  `disease_id` int NOT NULL,
  `resource_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `disease_solutions`
--

INSERT INTO `disease_solutions` (`id`, `disease_id`, `resource_id`) VALUES
(1, 4, 22),
(2, 4, 25),
(3, 4, 32),
(4, 4, 33),
(5, 4, 34),
(6, 4, 37),
(8, 2, 22),
(9, 2, 25),
(10, 2, 31),
(11, 2, 32),
(12, 2, 37),
(15, 7, 21),
(16, 7, 25),
(17, 7, 38),
(18, 7, 39),
(19, 7, 40),
(20, 7, 41),
(22, 3, 18),
(23, 3, 20),
(24, 3, 24),
(25, 3, 26),
(26, 3, 35),
(29, 6, 18),
(30, 6, 21),
(31, 6, 23),
(32, 6, 36),
(36, 8, 19),
(37, 8, 27),
(38, 8, 34),
(39, 8, 36),
(43, 5, 18),
(44, 5, 22),
(45, 5, 28),
(46, 5, 36),
(50, 1, 17),
(51, 1, 20),
(52, 1, 23),
(53, 1, 29),
(54, 1, 30);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `detected_disease` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `confidence_score` decimal(5,4) DEFAULT NULL,
  `is_healthy` tinyint(1) DEFAULT NULL,
  `llm_generated_response` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `detection_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `full_name`, `location`, `detected_disease`, `image_path`, `confidence_score`, `is_healthy`, `llm_generated_response`, `detection_timestamp`, `password`, `created_at`, `role`) VALUES
(1, 'fajri', 'fajri@gmail.com', 'Fajri Ramadhan', 'Jakarta, Indonesia', 'Hawar Daun Bakteri', 'uploads/fajri/20251025_093012.jpg', '0.9650', 0, 'Daun padi Anda terindikasi kuat terkena Hawar Daun Bakteri. Gejalanya adalah bercak basah di tepi daun. Segera atur jarak tanam dan kontrol pemupukan nitrogen.', '2025-10-26 04:14:46', '$2b$10$H7/2kG4LnzMXPCxfdWvku.aLC43IGS5OOcMAnDHnVECTh6brrLxAG', '2025-10-25 15:25:52', 'user'),
(2, 'budi_petani', 'budi.petani@email.com', 'Budi Santoso', 'Karawang, Jawa Barat', 'Hawar Daun Bakteri', 'uploads/budi/20251015_093012.jpg', '0.9650', 0, 'Daun padi Anda terindikasi kuat terkena Hawar Daun Bakteri. Gejalanya adalah bercak basah di tepi daun. Segera atur jarak tanam dan kontrol pemupukan nitrogen.', '2025-10-14 21:14:12', '$2b$10$hGya3vJg8nPWXb8f4HytzuK2Zx8s4fK9z0q3wrXj5D5p3E8aZo5yq', '2025-10-26 05:16:10', 'user'),
(3, 'siti_agri', 'siti.agri@email.com', 'Siti Aminah', 'Indramayu, Jawa Barat', 'Sehat', 'uploads/siti/20251015_100545.jpg', '0.9910', 1, 'Selamat! Daun padi Anda terlihat sehat. Pertahankan kondisi ini dengan pemupukan berimbang dan pengairan yang cukup.', '2025-10-14 22:14:12', '$2b$10$VtB2YxZf2ExmAwn5nbqZWe5vZfZ6bD3xKQxN0OQxR8WcL1b8Lwzze', '2025-10-26 05:16:10', 'user'),
(4, 'japar', 'japar@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-26 05:18:14', '$2b$10$jhI2G/hyadiASkM7IZKLVu7zPSSAEAA57BrNxahTNK5Y8bWhNh/eK', '2025-10-26 05:18:14', 'user'),
(5, 'zikra', 'zikra@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-26 06:19:50', '$2b$10$ve9YCMCZ2FEfaRkOd6i9e.Cmjt0HGWIrmuzpwAET4MKt/96Z/7K7W', '2025-10-26 06:19:50', 'admin'),
(6, 'joko', 'joko@gmail.com', 'joko anwar', 'lampung', NULL, NULL, NULL, NULL, NULL, '2025-11-08 14:48:33', '$2b$10$ypzfiacv1eChpENU6WIAk.kDXXERMbgAl6fyofCuiEyOdUDEHHaNO', '2025-11-08 14:48:33', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agricultural_resources`
--
ALTER TABLE `agricultural_resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detections`
--
ALTER TABLE `detections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `diseases`
--
ALTER TABLE `diseases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disease_solutions`
--
ALTER TABLE `disease_solutions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `disease_id` (`disease_id`),
  ADD KEY `resource_id` (`resource_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agricultural_resources`
--
ALTER TABLE `agricultural_resources`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `detections`
--
ALTER TABLE `detections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `diseases`
--
ALTER TABLE `diseases`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `disease_solutions`
--
ALTER TABLE `disease_solutions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detections`
--
ALTER TABLE `detections`
  ADD CONSTRAINT `detections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `disease_solutions`
--
ALTER TABLE `disease_solutions`
  ADD CONSTRAINT `fk_disease` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_resource` FOREIGN KEY (`resource_id`) REFERENCES `agricultural_resources` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
