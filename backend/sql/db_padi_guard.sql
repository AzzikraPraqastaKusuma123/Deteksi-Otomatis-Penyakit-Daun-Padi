-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 26, 2025 at 07:58 AM
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
  `user_id` int DEFAULT NULL,
  `disease_id` int DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `confidence_score` decimal(5,4) DEFAULT NULL,
  `is_healthy` tinyint(1) DEFAULT NULL,
  `llm_generated_response` text COLLATE utf8mb4_general_ci,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `diseases`
--

CREATE TABLE `diseases` (
  `id` int NOT NULL,
  `disease_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `scientific_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `symptoms` text COLLATE utf8mb4_general_ci,
  `treatment_recommendations` text COLLATE utf8mb4_general_ci,
  `image_url_example` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(5, 'zikra', 'zikra@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-26 06:19:50', '$2b$10$ve9YCMCZ2FEfaRkOd6i9e.Cmjt0HGWIrmuzpwAET4MKt/96Z/7K7W', '2025-10-26 06:19:50', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detections`
--
ALTER TABLE `detections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `disease_id` (`disease_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `diseases`
--
ALTER TABLE `diseases`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detections`
--
ALTER TABLE `detections`
  ADD CONSTRAINT `detections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detections_ibfk_2` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
