-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 26 Okt 2025 pada 06.19
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
  `user_id` int(11) DEFAULT NULL,
  `disease_id` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `confidence_score` decimal(5,4) DEFAULT NULL,
  `is_healthy` tinyint(1) DEFAULT NULL,
  `llm_generated_response` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `diseases`
--

CREATE TABLE `diseases` (
  `id` int(11) NOT NULL,
  `disease_name` varchar(100) NOT NULL,
  `scientific_name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `symptoms` text DEFAULT NULL,
  `treatment_recommendations` text DEFAULT NULL,
  `image_url_example` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `full_name`, `location`, `detected_disease`, `image_path`, `confidence_score`, `is_healthy`, `llm_generated_response`, `detection_timestamp`, `password`, `created_at`) VALUES
(1, 'fajri', 'fajri@gmail.com', 'Fajri Ramadhan', 'Jakarta, Indonesia', 'Hawar Daun Bakteri', 'uploads/fajri/20251025_093012.jpg', 0.9650, 0, 'Daun padi Anda terindikasi kuat terkena Hawar Daun Bakteri. Gejalanya adalah bercak basah di tepi daun. Segera atur jarak tanam dan kontrol pemupukan nitrogen.', '2025-10-26 04:14:46', '$2b$10$H7/2kG4LnzMXPCxfdWvku.aLC43IGS5OOcMAnDHnVECTh6brrLxAG', '2025-10-25 15:25:52'),
(2, 'budi_petani', 'budi.petani@email.com', 'Budi Santoso', 'Karawang, Jawa Barat', 'Hawar Daun Bakteri', 'uploads/budi/20251015_093012.jpg', 0.9650, 0, 'Daun padi Anda terindikasi kuat terkena Hawar Daun Bakteri. Gejalanya adalah bercak basah di tepi daun. Segera atur jarak tanam dan kontrol pemupukan nitrogen.', '2025-10-14 21:14:12', '$2b$10$hGya3vJg8nPWXb8f4HytzuK2Zx8s4fK9z0q3wrXj5D5p3E8aZo5yq', '2025-10-26 05:16:10'),
(3, 'siti_agri', 'siti.agri@email.com', 'Siti Aminah', 'Indramayu, Jawa Barat', 'Sehat', 'uploads/siti/20251015_100545.jpg', 0.9910, 1, 'Selamat! Daun padi Anda terlihat sehat. Pertahankan kondisi ini dengan pemupukan berimbang dan pengairan yang cukup.', '2025-10-14 22:14:12', '$2b$10$VtB2YxZf2ExmAwn5nbqZWe5vZfZ6bD3xKQxN0OQxR8WcL1b8Lwzze', '2025-10-26 05:16:10'),
(4, 'japar', 'japar@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-26 05:18:14', '$2b$10$jhI2G/hyadiASkM7IZKLVu7zPSSAEAA57BrNxahTNK5Y8bWhNh/eK', '2025-10-26 05:18:14');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `detections`
--
ALTER TABLE `detections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `disease_id` (`disease_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `diseases`
--
ALTER TABLE `diseases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detections`
--
ALTER TABLE `detections`
  ADD CONSTRAINT `detections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detections_ibfk_2` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
