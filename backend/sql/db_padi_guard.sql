-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 13, 2025 at 07:30 AM
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
-- Table structure for table `detections`
--

CREATE TABLE `detections` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `disease_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `confidence` decimal(5,4) NOT NULL,
  `image_url` text COLLATE utf8mb4_general_ci,
  `description` text COLLATE utf8mb4_general_ci,
  `prevention` text COLLATE utf8mb4_general_ci,
  `treatment_recommendations` text COLLATE utf8mb4_general_ci,
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
(50, 1, 'Rice Hispa', '0.2696', '/uploads/detection_1763018804781.jpg', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', '1. Sanitasi lahan. \n2. Lepas predator alami (bebek). \n3. Tanam serentak.', 'Gunakan insektisida sistemik seperti fipronil atau carbofuran jika populasi hama tinggi.', '2025-11-13 07:26:44');

-- --------------------------------------------------------

--
-- Table structure for table `diseases`
--

CREATE TABLE `diseases` (
  `id` int NOT NULL,
  `disease_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `scientific_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `prevention` text COLLATE utf8mb4_general_ci,
  `symptoms` text COLLATE utf8mb4_general_ci,
  `treatment_recommendations` text COLLATE utf8mb4_general_ci,
  `image_url_example` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diseases`
--

INSERT INTO `diseases` (`id`, `disease_name`, `scientific_name`, `description`, `prevention`, `symptoms`, `treatment_recommendations`, `image_url_example`) VALUES
(1, 'Healthy Rice Leaf', 'N/A', 'Daun tampak sehat, berwarna hijau seragam, dan tidak menunjukkan tanda-tanda lesi, bercak, atau perubahan warna.', 'Pertahankan praktik agronomi yang baik, pemupukan berimbang, dan pengairan yang cukup.', 'Tidak ada gejala. Daun hijau cerah dan utuh.', 'Tidak memerlukan perawatan. Lanjutkan pemantauan rutin.', NULL),
(2, 'Bacterial Leaf Blight', 'Xanthomonas oryzae pv. oryzae', 'Penyakit ini menyebabkan lesi berair pada tepi daun yang kemudian menguning, menjadi abu-abu, dan kering. Sering disebut \"kresek\".', '1. Gunakan varietas tahan. \n2. Pastikan drainase baik. \n3. Jangan gunakan pupuk Nitrogen berlebihan.', 'Bercak kelabu berair di tepi daun, mengering, daun menggulung, terutama di pagi hari.', 'Pengendalian kimia sulit. Gunakan bakterisida berbasis tembaga pada tahap awal. Fokus pada pencegahan.', NULL),
(3, 'Brown Spot', 'Cochliobolus miyabeanus', 'Menimbulkan bercak-bercak oval berwarna coklat pada daun, pelepah, dan bulir. Sering terjadi pada lahan yang kekurangan nutrisi.', '1. Pemupukan berimbang (terutama Kalium). \n2. Sanitasi lahan. \n3. Gunakan benih sehat.', 'Bercak oval coklat dengan titik abu-abu di tengah. Ukuran bercak bervariasi.', 'Semprot dengan fungisida seperti mancozeb atau propiconazole jika serangan parah.', NULL),
(4, 'Leaf Blast', 'Pyricularia oryzae', 'Penyakit \"blas\" adalah salah satu penyakit padi paling merusak. Menyebabkan lesi berbentuk berlian (ketupat) pada daun.', '1. Gunakan varietas tahan. \n2. Hindari pemupukan Nitrogen berlebih. \n3. Atur jarak tanam.', 'Bercak berbentuk ketupat dengan pusat abu-abu dan tepi coklat kemerahan.', 'Gunakan fungisida sistemik seperti trycyclazole atau carbendazim sesuai dosis anjuran.', NULL),
(5, 'Leaf Scald', 'Microdochium oryzae', 'Menyebabkan lesi besar, memanjang, berwarna coklat muda atau abu-abu kehijauan pada ujung daun, seringkali dengan pola \"zona\" konsentris.', '1. Jaga kebersihan lahan. \n2. Gunakan benih bersertifikat. \n3. Pemupukan Kalium yang cukup.', 'Lesi besar di ujung daun seperti tersiram air panas, bergaris-garis konsentris (seperti gelombang).', 'Penggunaan fungisida (seperti benomyl) dapat membantu, tetapi pencegahan lebih utama.', NULL),
(6, 'Narrow Brown Leaf Spot', 'Cercospora oryzae', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \n2. Pemupukan Kalium (K) yang cukup sangat penting.', 'Garis-garis sempit berwarna coklat kemerahan, sejajar dengan urat daun.', 'Fungisida umumnya tidak diperlukan kecuali jika parah. Fokus pada manajemen nutrisi (Kalium).', NULL),
(7, 'Rice Hispa', 'Dicladispa armigera', 'Ini adalah kerusakan akibat hama, bukan penyakit. Kumbang Hispa dan larvanya memakan jaringan daun, meninggalkan goresan-goresan putih.', '1. Sanitasi lahan. \n2. Lepas predator alami (bebek). \n3. Tanam serentak.', 'Garis-garis putih memanjang pada daun, paralel dengan urat daun. Daun tampak \"terkikis\" dan kering.', 'Gunakan insektisida sistemik seperti fipronil atau carbofuran jika populasi hama tinggi.', NULL),
(8, 'Sheath Blight', 'Rhizoctonia solani', 'Penyakit ini ditandai dengan lesi oval atau elips berwarna putih keabu-abuan dengan tepi coklat pada pelepah daun, biasanya dekat garis air.', '1. Atur jarak tanam agar tidak terlalu rapat. \n2. Lakukan drainase yang baik. \n3. Gunakan varietas padi yang tahan.', 'Lesi oval keabu-abuan pada pelepah (dekat air), menyebar ke atas dengan pola seperti sisik ular.', 'Gunakan fungisida yang direkomendasikan seperti propiconazole atau hexaconazole sesuai dosis anjuran.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `detected_disease` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `confidence_score` decimal(5,4) DEFAULT NULL,
  `is_healthy` tinyint(1) DEFAULT NULL,
  `llm_generated_response` text COLLATE utf8mb4_general_ci,
  `detection_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `full_name`, `location`, `detected_disease`, `image_path`, `confidence_score`, `is_healthy`, `llm_generated_response`, `detection_timestamp`, `password`, `created_at`, `role`) VALUES
(1, 'fajri', 'fajri@gmail.com', 'Fajri Ramadhan', 'Jakarta, Indonesia', 'Hawar Daun Bakteri', 'uploads/fajri/20251025_093012.jpg', '0.9650', 0, 'Daun padi Anda terindikasi kuat terkena Hawar Daun Bakteri. Gejalanya adalah bercak basah di tepi daun. Segera atur jarak tanam dan kontrol pemupukan nitrogen.', '2025-10-26 04:14:46', '$2b$10$H7/2kG4LnzMXPCxfdWvku.aLC43IGS5OOcMAnDHnVECTh6brrLxAG', '2025-10-25 15:25:52', 'user'),
(2, 'budi_petani', 'budi.petani@email.com', 'Budi Santoso', 'Karawang, Jawa Barat', 'Hawar Daun Bakteri', 'uploads/budi/20251015_093012.jpg', '0.9650', 0, 'Daun padi Anda terindikasi kuat terkena Hawar Daun Bakteri. Gejalanya adalah bercak basah di tepi daun. Segera atur jarak tanam dan kontrol pemupukan nitrogen.', '2025-10-14 21:14:12', '$2b$10$hGya3vJg8nPWXb8f4HytzuK2Zx8s4fK9z0q3wrXj5D5p3E8aZo5yq', '2025-10-26 05:16:10', 'user'),
(3, 'siti_agri', 'siti.agri@email.com', 'Siti Aminah', 'Indramayu, Jawa Barat', 'Sehat', 'uploads/siti/20251015_100545.jpg', '0.9910', 1, 'Selamat! Daun padi Anda terlihat sehat. Pertahankan kondisi ini dengan pemupukan berimbang dan pengairan yang cukup.', '2025-10-14 22:14:12', '$2b$10$VtB2YxZf2ExmAwn5nbqZWe5vZfZ6bD3xKQxN0OQxR8WcL1b8Lwzze', '2025-10-26 05:16:10', 'user'),
(4, 'japar', 'japar@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-26 05:18:14', '$2b$10$jhI2G/hyadiASkM7IZKLVu7zPSSAEAA57BrNxahTNK5Y8bWhNh/eK', '2025-10-26 05:18:14', 'user'),
(5, 'zikra', 'zikra@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-26 06:19:50', '$2b$10$ve9YCMCZ2FEfaRkOd6i9e.Cmjt0HGWIrmuzpwAET4MKt/96Z/7K7W', '2025-10-26 06:19:50', 'user'),
(6, 'joko', 'joko@gmail.com', 'joko anwar', 'lampung', NULL, NULL, NULL, NULL, NULL, '2025-11-08 14:48:33', '$2b$10$ypzfiacv1eChpENU6WIAk.kDXXERMbgAl6fyofCuiEyOdUDEHHaNO', '2025-11-08 14:48:33', 'user');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `detections`
--
ALTER TABLE `detections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `diseases`
--
ALTER TABLE `diseases`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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

-- --------------------------------------------------------

--
-- Table structure for table `agricultural_resources`
--

CREATE TABLE `agricultural_resources` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `category` enum('Obat','Pupuk','Pestisida') COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for table `agricultural_resources`
--
ALTER TABLE `agricultural_resources`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `agricultural_resources`
--
ALTER TABLE `agricultural_resources`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
