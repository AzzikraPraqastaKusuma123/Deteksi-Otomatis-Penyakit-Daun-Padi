CREATE TABLE `pests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `scientific_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description_id` text COLLATE utf8mb4_general_ci,
  `description_en` text COLLATE utf8mb4_general_ci,
  `symptoms_id` text COLLATE utf8mb4_general_ci,
  `symptoms_en` text COLLATE utf8mb4_general_ci,
  `prevention_id` text COLLATE utf8mb4_general_ci,
  `prevention_en` text COLLATE utf8mb4_general_ci,
  `treatment_id` text COLLATE utf8mb4_general_ci,
  `treatment_en` text COLLATE utf8mb4_general_ci,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `pests` (`name_id`, `name_en`, `scientific_name`, `description_id`, `description_en`, `symptoms_id`, `symptoms_en`, `prevention_id`, `prevention_en`, `treatment_id`, `treatment_en`, `image_url`) VALUES
('Wereng Batang Coklat', 'Brown Planthopper', 'Nilaparvata lugens', 'Wereng Batang Coklat (WBC) adalah salah satu hama utama tanaman padi. Hama ini menyerang batang padi dan mengisap cairannya, menyebabkan tanaman menjadi kering dan mati.', 'The Brown Planthopper (BPH) is one of the major pests of rice. This pest attacks the rice stem and sucks its fluid, causing the plant to dry out and die.', 'Tanaman padi menguning dan mengering, seperti terbakar (hopperburn). Terdapat banyak wereng pada pangkal batang.', 'Paddy plants turn yellow and dry up, as if burned (hopperburn). There are many planthoppers at the base of the stem.', 'Tanam varietas tahan, sanitasi lingkungan, penggunaan pestisida nabati.', 'Plant resistant varieties, environmental sanitation, use of botanical pesticides.', 'Gunakan insektisida sistemik dengan bahan aktif imidakloprid atau buprofezin.', 'Use systemic insecticides with the active ingredient imidacloprid or buprofezin.', '/images/pests/wereng.jpg'),
('Penggerek Batang Padi', 'Rice Stem Borer', 'Scirpophaga incertulas', 'Hama ini menyerang batang padi pada fase vegetatif dan generatif. Larva penggerek batang memakan bagian dalam batang, menyebabkan pucuk tanaman mati (sundep) atau malai menjadi hampa (beluk).', 'This pest attacks rice stems during the vegetative and generative phases. The stem borer larvae eat the inside of the stem, causing the plant shoots to die (deadheart) or the panicles to become empty (whitehead).', 'Pucuk tanaman mati dan mudah dicabut (sundep) pada fase vegetatif. Malai padi berwarna putih, tegak, dan hampa (beluk) pada fase generatif.', 'Dead plant shoots that are easy to pull out (deadheart) in the vegetative phase. Rice panicles are white, upright, and empty (whitehead) in the generative phase.', 'Tanam serentak, rotasi tanaman, penggunaan perangkap feromon.', 'Simultaneous planting, crop rotation, use of pheromone traps.', 'Gunakan insektisida dengan bahan aktif fipronil atau karbofuran.', 'Use insecticides with the active ingredient fipronil or carbofuran.', '/images/pests/penggerek_batang.jpg');
