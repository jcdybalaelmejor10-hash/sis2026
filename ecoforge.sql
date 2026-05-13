-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2026 a las 16:20:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecoforge`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `collectors`
--

CREATE TABLE `collectors` (
  `id` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `carnetIdentidad` varchar(191) NOT NULL,
  `phoneLandline` varchar(191) DEFAULT NULL,
  `status` enum('DISPONIBLE','OCUPADO','INACTIVO') NOT NULL DEFAULT 'DISPONIBLE',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `whatsapp` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `nit` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `address` varchar(191) DEFAULT NULL,
  `status` enum('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO',
  `operativeCapacity` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `contactPersonName` varchar(191) NOT NULL,
  `contactPersonWhatsapp` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `company_services`
--

CREATE TABLE `company_services` (
  `id` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `serviceType` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `priceRef` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coverage_zones`
--

CREATE TABLE `coverage_zones` (
  `id` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `district` varchar(191) NOT NULL,
  `province` varchar(191) DEFAULT NULL,
  `region` varchar(191) DEFAULT NULL,
  `coverageRadiusM` int(11) NOT NULL DEFAULT 1000,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `requestId` int(11) DEFAULT NULL,
  `type` enum('SOLICITUD_CONFIRMADA','CAMBIO_ESTADO','SERVICIO_CERRADO','ASIGNACION_REALIZADA') NOT NULL,
  `channel` enum('EMAIL','PANEL') NOT NULL DEFAULT 'PANEL',
  `status` enum('PENDIENTE','ENVIADO','FALLIDO') NOT NULL DEFAULT 'PENDIENTE',
  `message` text NOT NULL,
  `sentAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `request_photos`
--

CREATE TABLE `request_photos` (
  `id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `url` longtext NOT NULL,
  `caption` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_assignments`
--

CREATE TABLE `service_assignments` (
  `id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `collectorId` int(11) DEFAULT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `assignedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_ratings`
--

CREATE TABLE `service_ratings` (
  `id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_requests`
--

CREATE TABLE `service_requests` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `serviceType` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `priority` enum('BAJA','MEDIA','ALTA','URGENTE') NOT NULL DEFAULT 'MEDIA',
  `status` enum('REGISTRADO','ASIGNADO','EN_PROCESO','FINALIZADO','CANCELADO') NOT NULL DEFAULT 'REGISTRADO',
  `address` varchar(191) NOT NULL,
  `district` varchar(191) NOT NULL,
  `province` varchar(191) DEFAULT NULL,
  `region` varchar(191) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `estimatedM3` decimal(8,2) DEFAULT NULL,
  `confirmedByUser` tinyint(1) NOT NULL DEFAULT 0,
  `confirmedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_status_logs`
--

CREATE TABLE `service_status_logs` (
  `id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `status` enum('REGISTRADO','ASIGNADO','EN_PROCESO','FINALIZADO','CANCELADO') NOT NULL,
  `notes` text DEFAULT NULL,
  `changedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role` enum('CLIENTE','ENCARGADO','ADMINISTRADOR') NOT NULL DEFAULT 'CLIENTE',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `status` enum('ACTIVO','INACTIVO','SUSPENDIDO') NOT NULL DEFAULT 'ACTIVO',
  `phone` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`, `status`, `phone`) VALUES
(5, 'admin@ecoforge.com', '$2a$10$mWi85iqQbfJm58LqP2iWXuMcFmr2OvsbRiTf8XEzByoJIKF5zqN8.', 'Administrador General', 'ADMINISTRADOR', '2026-03-19 13:08:36.057', '2026-03-19 13:08:36.057', 'ACTIVO', '78900001'),
(6, 'encargado@ecoforge.com', '$2a$10$mWi85iqQbfJm58LqP2iWXuMcFmr2OvsbRiTf8XEzByoJIKF5zqN8.', 'Carlos Mamani', 'ENCARGADO', '2026-03-19 13:08:36.062', '2026-03-19 13:08:36.062', 'ACTIVO', '78900002'),
(7, 'cliente1@gmail.com', '$2a$10$mWi85iqQbfJm58LqP2iWXuMcFmr2OvsbRiTf8XEzByoJIKF5zqN8.', 'Juan Quispe', 'CLIENTE', '2026-03-19 13:08:36.066', '2026-03-19 13:08:36.066', 'ACTIVO', '71234567'),
(8, 'cliente2@gmail.com', '$2a$10$mWi85iqQbfJm58LqP2iWXuMcFmr2OvsbRiTf8XEzByoJIKF5zqN8.', 'María Condori', 'CLIENTE', '2026-03-19 13:08:36.068', '2026-03-19 13:08:36.068', 'ACTIVO', '71234568');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `plate` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `capacityM3` decimal(8,2) NOT NULL,
  `status` enum('DISPONIBLE','EN_SERVICIO','MANTENIMIENTO','INACTIVO') NOT NULL DEFAULT 'DISPONIBLE',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `collectorId` int(11) DEFAULT NULL,
  `photoUrl` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('3c47055a-4be6-465a-8685-9f2e41f0d551', '4dc86fee38e801fe8c4e90a2b40678e5ff675c5356214eea25f91dfe60f59fcf', '2026-03-19 12:29:44.286', '20260303232743_add_location_to_coverage_zonesnpx', NULL, NULL, '2026-03-19 12:29:44.274', 1),
('5252de22-a6ee-4630-938e-ecdea8e8a633', '2dfb73394ef9a4217b3c9482fa88f3dc5cee308e666bb815b68a1a82ba32255e', '2026-03-19 12:29:44.256', '20260303231338_add_location_to_coverage_zones', NULL, NULL, '2026-03-19 12:29:44.237', 1),
('6a4a5487-b9e1-4302-9995-2174babcf076', '68adae280eedcef017008853eb68cb925fbe9e91e49212ef6313845884553745', '2026-03-19 12:29:43.118', '20260219005802_initial', NULL, NULL, '2026-03-19 12:29:43.093', 1),
('7748d145-43fc-477e-9303-813e9d96e25f', '258ca36482da3c64b14a3d8130c1afbc683cd1d84718d38c72926bb0cec5b571', '2026-03-19 12:39:09.110', '20260319123908_photo_url_longtext', NULL, NULL, '2026-03-19 12:39:08.987', 1),
('84bf4351-d653-4a32-9ce1-f99b70286943', '222265a57b7af39cff1c9cc5a3d6fd58b7cb172e159161bc97520b9a8e9fa8b3', '2026-03-19 12:29:44.364', '20260303234050_add_collector_to_vehicle', NULL, NULL, '2026-03-19 12:29:44.289', 1),
('b2e7063a-3fe9-4189-962d-aaae32b1c184', '37b06d5e072be270286cdc8e76822c221d11615dc541af3ffbf01d83adbbde07', '2026-03-19 12:29:44.233', '20260303180448_schema', NULL, NULL, '2026-03-19 12:29:43.139', 1),
('c61a8bb1-64eb-4744-b0b7-3833bf9c8633', 'b770318d0e920a100dea4370ac6aef8cccf8d45fcc206382ff92c7a201d80cdc', '2026-03-19 12:29:44.430', '20260304000000_rename_fields_and_add_columns', NULL, NULL, '2026-03-19 12:29:44.366', 1),
('d2fa38c2-68bc-427e-b934-64c9aa05499f', '12906d40164dc05c907f0c5b5694b6c6af8ab4ac3685afc8612ef3fdf7aec34e', '2026-03-19 12:29:43.136', '20260224151445_user_status', NULL, NULL, '2026-03-19 12:29:43.119', 1),
('f8676878-2e41-4ccc-8d83-dc9918245f4c', 'aa3bb1dac51e5d4055b34cf5f3649475ccd27b2c9272b82761a47a73d86558f7', '2026-03-19 13:08:24.784', '20260319130824_request_photo_longtext', NULL, NULL, '2026-03-19 13:08:24.704', 1),
('ff346e2a-119c-4ebc-a4f8-ac83a7e670cc', '4dc86fee38e801fe8c4e90a2b40678e5ff675c5356214eea25f91dfe60f59fcf', '2026-03-19 12:29:44.271', '20260303231426_add_location', NULL, NULL, '2026-03-19 12:29:44.260', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `collectors`
--
ALTER TABLE `collectors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `collectors_carnetIdentidad_key` (`carnetIdentidad`),
  ADD KEY `collectors_companyId_fkey` (`companyId`);

--
-- Indices de la tabla `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `companies_email_key` (`email`),
  ADD UNIQUE KEY `companies_nit_key` (`nit`);

--
-- Indices de la tabla `company_services`
--
ALTER TABLE `company_services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `company_services_companyId_serviceType_key` (`companyId`,`serviceType`);

--
-- Indices de la tabla `coverage_zones`
--
ALTER TABLE `coverage_zones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coverage_zones_companyId_district_key` (`companyId`,`district`);

--
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_userId_fkey` (`userId`),
  ADD KEY `notifications_requestId_fkey` (`requestId`);

--
-- Indices de la tabla `request_photos`
--
ALTER TABLE `request_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `request_photos_requestId_fkey` (`requestId`);

--
-- Indices de la tabla `service_assignments`
--
ALTER TABLE `service_assignments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `service_assignments_requestId_key` (`requestId`),
  ADD KEY `service_assignments_companyId_fkey` (`companyId`),
  ADD KEY `service_assignments_collectorId_fkey` (`collectorId`),
  ADD KEY `service_assignments_vehicleId_fkey` (`vehicleId`);

--
-- Indices de la tabla `service_ratings`
--
ALTER TABLE `service_ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `service_ratings_requestId_key` (`requestId`),
  ADD KEY `service_ratings_userId_fkey` (`userId`);

--
-- Indices de la tabla `service_requests`
--
ALTER TABLE `service_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_requests_userId_fkey` (`userId`);

--
-- Indices de la tabla `service_status_logs`
--
ALTER TABLE `service_status_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_status_logs_requestId_fkey` (`requestId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indices de la tabla `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vehicles_plate_key` (`plate`),
  ADD KEY `vehicles_companyId_fkey` (`companyId`),
  ADD KEY `vehicles_collectorId_fkey` (`collectorId`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `collectors`
--
ALTER TABLE `collectors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `company_services`
--
ALTER TABLE `company_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `coverage_zones`
--
ALTER TABLE `coverage_zones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `request_photos`
--
ALTER TABLE `request_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `service_assignments`
--
ALTER TABLE `service_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `service_ratings`
--
ALTER TABLE `service_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `service_requests`
--
ALTER TABLE `service_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `service_status_logs`
--
ALTER TABLE `service_status_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `collectors`
--
ALTER TABLE `collectors`
  ADD CONSTRAINT `collectors_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `company_services`
--
ALTER TABLE `company_services`
  ADD CONSTRAINT `company_services_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `coverage_zones`
--
ALTER TABLE `coverage_zones`
  ADD CONSTRAINT `coverage_zones_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `service_requests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `request_photos`
--
ALTER TABLE `request_photos`
  ADD CONSTRAINT `request_photos_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `service_requests` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `service_assignments`
--
ALTER TABLE `service_assignments`
  ADD CONSTRAINT `service_assignments_collectorId_fkey` FOREIGN KEY (`collectorId`) REFERENCES `collectors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `service_assignments_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `service_assignments_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `service_requests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `service_assignments_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `service_ratings`
--
ALTER TABLE `service_ratings`
  ADD CONSTRAINT `service_ratings_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `service_requests` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `service_ratings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `service_requests`
--
ALTER TABLE `service_requests`
  ADD CONSTRAINT `service_requests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `service_status_logs`
--
ALTER TABLE `service_status_logs`
  ADD CONSTRAINT `service_status_logs_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `service_requests` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_collectorId_fkey` FOREIGN KEY (`collectorId`) REFERENCES `collectors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
