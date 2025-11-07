-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Nov 2025 pada 05.09
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

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
-- Struktur dari tabel `detections`
--

CREATE TABLE `detections` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `disease_name` varchar(100) NOT NULL,
  `confidence` decimal(5,4) NOT NULL,
  `image_url` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `prevention` text DEFAULT NULL,
  `detected_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `detections`
--

INSERT INTO `detections` (`id`, `user_id`, `disease_name`, `confidence`, `image_url`, `description`, `prevention`, `detected_at`) VALUES
(1, 1, 'Sheath Blight', 0.2635, '/uploads/detection_1762488238120.jpg', 'Penyakit ini ditandai dengan lesi oval atau elips berwarna putih keabu-abuan dengan tepi coklat pada pelepah daun, biasanya dekat garis air.', '1. Atur jarak tanam agar tidak terlalu rapat.\n2. Lakukan drainase yang baik pada lahan.\n3. Gunakan varietas padi yang tahan.', '2025-11-07 04:03:58'),
(2, 1, 'Narrow Brown Leaf Spot', 0.2774, '/uploads/detection_1762488517304.jpg', 'Menimbulkan bercak-bercak sempit, linier, berwarna coklat kemerahan pada daun. Biasanya menyerang daun yang lebih tua.', '1. Gunakan varietas tahan. \n2. Pemupukan Kalium (K) yang cukup sangat penting.', '2025-11-07 04:08:37');

-- --------------------------------------------------------

--
-- Struktur dari tabel `diseases`
--

CREATE TABLE `diseases` (
  `id` int(11) NOT NULL,
  `disease_name` varchar(100) NOT NULL,
  `scientific_name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `prevention` text DEFAULT NULL,
  `symptoms` text DEFAULT NULL,
  `treatment_recommendations` text DEFAULT NULL,
  `image_url_example` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `diseases`
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
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `detected_disease` varchar(100) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `confidence_score` decimal(5,4) DEFAULT NULL,
  `is_healthy` tinyint(1) DEFAULT NULL,
  `llm_generated_response` text DEFAULT NULL,
  `detection_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(50) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `full_name`, `location`, `detected_disease`, `image_path`, `confidence_score`, `is_healthy`, `llm_generated_response`, `detection_timestamp`, `password`, `created_at`, `role`) VALUES
(1, 'fajri', 'fajri@gmail.com', 'Fajri Ramadhan', 'Jakarta, Indonesia', 'Hawar Daun Bakteri', 'uploads/fajri/20251025_093012.jpg', 0.9650, 0, 'Daun padi Anda terindikasi kuat terkena Hawar Daun Bakteri. Gejalanya adalah bercak basah di tepi daun. Segera atur jarak tanam dan kontrol pemupukan nitrogen.', '2025-10-26 04:14:46', '$2b$10$H7/2kG4LnzMXPCxfdWvku.aLC43IGS5OOcMAnDHnVECTh6brrLxAG', '2025-10-25 15:25:52', 'user'),
(2, 'budi_petani', 'budi.petani@email.com', 'Budi Santoso', 'Karawang, Jawa Barat', 'Hawar Daun Bakteri', 'uploads/budi/20251015_093012.jpg', 0.9650, 0, 'Daun padi Anda terindikasi kuat terkena Hawar Daun Bakteri. Gejalanya adalah bercak basah di tepi daun. Segera atur jarak tanam dan kontrol pemupukan nitrogen.', '2025-10-14 21:14:12', '$2b$10$hGya3vJg8nPWXb8f4HytzuK2Zx8s4fK9z0q3wrXj5D5p3E8aZo5yq', '2025-10-26 05:16:10', 'user'),
(3, 'siti_agri', 'siti.agri@email.com', 'Siti Aminah', 'Indramayu, Jawa Barat', 'Sehat', 'uploads/siti/20251015_100545.jpg', 0.9910, 1, 'Selamat! Daun padi Anda terlihat sehat. Pertahankan kondisi ini dengan pemupukan berimbang dan pengairan yang cukup.', '2025-10-14 22:14:12', '$2b$10$VtB2YxZf2ExmAwn5nbqZWe5vZfZ6bD3xKQxN0OQxR8WcL1b8Lwzze', '2025-10-26 05:16:10', 'user'),
(4, 'japar', 'japar@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-26 05:18:14', '$2b$10$jhI2G/hyadiASkM7IZKLVu7zPSSAEAA57BrNxahTNK5Y8bWhNh/eK', '2025-10-26 05:18:14', 'user'),
(5, 'zikra', 'zikra@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-26 06:19:50', '$2b$10$ve9YCMCZ2FEfaRkOd6i9e.Cmjt0HGWIrmuzpwAET4MKt/96Z/7K7W', '2025-10-26 06:19:50', 'user');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `detections`
--
ALTER TABLE `detections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `diseases`
--
ALTER TABLE `diseases`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `detections`
--
ALTER TABLE `detections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `diseases`
--
ALTER TABLE `diseases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detections`
--
ALTER TABLE `detections`
  ADD CONSTRAINT `detections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
