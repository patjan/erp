-- phpMyAdmin SQL Dump
-- version 3.3.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 27, 2013 at 08:47 PM
-- Server version: 5.1.50
-- PHP Version: 5.3.14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `erp`
--

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE IF NOT EXISTS `colors` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `code` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `colors`
--


-- --------------------------------------------------------

--
-- Table structure for table `configs`
--

CREATE TABLE IF NOT EXISTS `configs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `company_id` bigint(20) DEFAULT '1',
  `sequence` int(11) DEFAULT '0',
  `group_set` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Root',
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `value` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_set` (`group_set`,`name`),
  KEY `sequence` (`company_id`,`sequence`),
  KEY `name` (`name`,`sequence`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=97 ;

--
-- Dumping data for table `configs`
--

INSERT INTO `configs` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `company_id`, `sequence`, `group_set`, `name`, `value`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', 3, 0, 'Root', 'Root', ''),
(2, '2013-04-08 14:53:58', 4, '2013-04-14 15:36:05', 4, 'Active', 1, 10, 'Root', 'Countries', ''),
(3, '2013-04-08 15:11:48', 4, '2013-04-14 15:36:11', 4, 'Active', 1, 20, 'Root', 'States', ''),
(4, '2013-04-08 15:13:00', 4, '2013-04-08 15:13:23', 4, 'Active', 1, 50, 'Countries', 'US', 'United States'),
(5, '2013-04-08 15:13:45', 4, NULL, NULL, 'Active', 1, 50, 'Countries', 'BR', 'Brasil'),
(31, '2013-04-08 16:41:06', 4, NULL, NULL, 'Active', 1, 50, 'States', 'AC', ''),
(7, '2013-04-08 15:14:39', 4, NULL, NULL, 'Active', 1, 50, 'States', 'CA', ''),
(8, '2013-04-08 15:14:49', 4, NULL, NULL, 'Active', 1, 50, 'States', 'AL', ''),
(9, '2013-04-08 15:14:59', 4, NULL, NULL, 'Active', 1, 50, 'States', 'AP', ''),
(10, '2013-04-08 15:15:51', 4, NULL, NULL, 'Active', 1, 50, 'States', 'AM', ''),
(11, '2013-04-08 15:15:59', 4, NULL, NULL, 'Active', 1, 50, 'States', 'BA', ''),
(12, '2013-04-08 15:16:05', 4, NULL, NULL, 'Active', 1, 50, 'States', 'CE', ''),
(13, '2013-04-08 15:16:16', 4, NULL, NULL, 'Active', 1, 50, 'States', 'DF', ''),
(14, '2013-04-08 15:16:27', 4, NULL, NULL, 'Active', 1, 50, 'States', 'ES', ''),
(15, '2013-04-08 15:16:36', 4, NULL, NULL, 'Active', 1, 50, 'States', 'GO', ''),
(16, '2013-04-08 15:16:48', 4, NULL, NULL, 'Active', 1, 50, 'States', 'MA', ''),
(17, '2013-04-08 15:16:59', 4, NULL, NULL, 'Active', 1, 50, 'States', 'MT', ''),
(18, '2013-04-08 15:17:09', 4, NULL, NULL, 'Active', 1, 50, 'States', 'MS', ''),
(19, '2013-04-08 15:17:15', 4, NULL, NULL, 'Active', 1, 50, 'States', 'MG', ''),
(20, '2013-04-08 15:17:28', 4, NULL, NULL, 'Active', 1, 50, 'States', 'PA', ''),
(21, '2013-04-08 15:17:35', 4, NULL, NULL, 'Active', 1, 50, 'States', 'PB', ''),
(22, '2013-04-08 15:17:43', 4, NULL, NULL, 'Active', 1, 50, 'States', 'PE', ''),
(23, '2013-04-08 15:17:50', 4, NULL, NULL, 'Active', 1, 50, 'States', 'PI', ''),
(24, '2013-04-08 15:18:00', 4, NULL, NULL, 'Active', 1, 50, 'States', 'RJ', ''),
(25, '2013-04-08 15:18:14', 4, NULL, NULL, 'Active', 1, 50, 'States', 'RS', ''),
(26, '2013-04-08 15:18:29', 4, NULL, NULL, 'Active', 1, 50, 'States', 'RO', ''),
(27, '2013-04-08 15:18:36', 4, NULL, NULL, 'Active', 1, 50, 'States', 'RR', ''),
(28, '2013-04-08 15:18:43', 4, NULL, NULL, 'Active', 1, 50, 'States', 'SP', ''),
(29, '2013-04-08 15:18:49', 4, NULL, NULL, 'Active', 1, 50, 'States', 'SE', ''),
(30, '2013-04-08 15:18:59', 4, NULL, NULL, 'Active', 1, 50, 'States', 'TO', ''),
(32, '2013-04-09 18:02:00', 4, '2013-04-14 15:36:21', 4, 'Active', 1, 40, 'Root', 'Machine Types', ''),
(33, '2013-04-09 18:02:08', 4, '2013-04-14 15:36:25', 4, 'Active', 1, 30, 'Root', 'Machine Brands', ''),
(34, '2013-04-09 18:04:00', 4, NULL, NULL, 'Active', 1, 50, 'Machine Types', 'CIRCULAR', ''),
(35, '2013-04-09 18:08:42', 4, NULL, NULL, 'Active', 1, 50, 'Machine Types', 'RETILINEA', ''),
(36, '2013-04-09 18:08:48', 4, '2013-04-16 06:28:40', 4, 'Active', 1, 50, 'Machine Brands', 'Brand1', ''),
(37, '2013-04-09 18:08:50', 4, '2013-04-16 06:28:46', 4, 'Active', 1, 50, 'Machine Brands', 'Brand2', ''),
(38, '2013-04-09 18:08:51', 4, '2013-04-16 06:28:51', 4, 'Active', 1, 50, 'Machine Brands', 'Brand3', ''),
(42, '2013-04-14 15:24:47', 4, NULL, NULL, 'Active', 1, 50, 'Root', 'Settings', ''),
(43, '2013-04-14 15:26:03', 4, '2013-04-14 15:26:44', 4, 'Active', 1, 10, 'Settings', 'Ponto da Malha', ''),
(44, '2013-04-14 15:26:16', 4, '2013-04-14 15:26:49', 4, 'Active', 1, 11, 'Settings', 'Fita da Malha', ''),
(45, '2013-04-14 15:26:25', 4, '2013-04-14 15:26:53', 4, 'Active', 1, 12, 'Settings', 'LFA da Malha', ''),
(46, '2013-04-14 15:32:49', 4, NULL, NULL, 'Active', 1, 20, 'Settings', 'Ponto da Fang', ''),
(47, '2013-04-14 15:33:00', 4, NULL, NULL, 'Active', 1, 21, 'Settings', 'Fita da Fang', ''),
(48, '2013-04-14 15:33:13', 4, NULL, NULL, 'Active', 1, 22, 'Settings', 'LFA da Fang', ''),
(49, '2013-04-14 15:33:32', 4, NULL, NULL, 'Active', 1, 30, 'Settings', 'Fita da Lycra', ''),
(50, '2013-04-14 15:33:46', 4, '2013-04-18 20:46:49', 4, 'Active', 1, 42, 'Settings', 'Ponto Central', ''),
(51, '2013-04-14 15:34:09', 4, '2013-04-18 20:53:51', 4, 'Active', 1, 50, 'Settings', 'Ponto do Disco 1', ''),
(52, '2013-04-14 15:34:25', 4, '2013-04-18 20:48:07', 4, 'Active', 1, 52, 'Settings', 'Altura do Disco', ''),
(53, '2013-04-14 15:34:38', 4, '2013-04-18 20:47:57', 4, 'Active', 1, 53, 'Settings', 'Chave do Disco', ''),
(54, '2013-04-14 15:34:58', 4, NULL, NULL, 'Active', 1, 60, 'Settings', 'Frontura', ''),
(55, '2013-04-14 15:35:07', 4, NULL, NULL, 'Active', 1, 70, 'Settings', 'Puxador', ''),
(58, '2013-04-16 06:28:30', 4, NULL, NULL, 'Active', 1, 50, 'Machine Brands', 'Brand4', ''),
(59, '2013-04-16 20:46:41', 4, NULL, NULL, 'Active', 1, 50, 'Root', 'Materials', ''),
(60, '2013-04-16 20:46:52', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Algodao', ''),
(61, '2013-04-16 20:47:00', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Polyester', ''),
(62, '2013-04-16 20:47:45', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Viscose', ''),
(63, '2013-04-16 20:47:54', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Acrilico', ''),
(64, '2013-04-16 20:48:02', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Linho', ''),
(65, '2013-04-16 20:48:11', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Nylon', ''),
(66, '2013-04-16 20:48:22', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Poliamida', ''),
(67, '2013-04-16 20:48:30', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Rayon', ''),
(68, '2013-04-16 20:48:37', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Seda', ''),
(69, '2013-04-16 20:48:45', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Elastano', ''),
(70, '2013-04-16 20:48:51', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Modal', ''),
(71, '2013-04-16 20:49:02', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Polinosic', ''),
(72, '2013-04-16 20:49:10', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Liocel', ''),
(73, '2013-04-16 20:49:16', 4, NULL, NULL, 'Active', 1, 50, 'Materials', 'Metalica', ''),
(77, '2013-04-18 20:46:22', 4, NULL, NULL, 'Active', 1, 31, 'Settings', 'Fita 1', ''),
(78, '2013-04-18 20:46:33', 4, NULL, NULL, 'Active', 1, 32, 'Settings', 'Fita 2', ''),
(79, '2013-04-18 20:47:08', 4, '2013-04-18 20:53:44', 4, 'Active', 1, 40, 'Settings', 'Ponto do Cilindro 1', ''),
(80, '2013-04-18 20:47:24', 4, NULL, NULL, 'Active', 1, 41, 'Settings', 'Ponto do Cilindro 2', ''),
(81, '2013-04-18 20:48:25', 4, NULL, NULL, 'Active', 1, 51, 'Settings', 'Ponto do Disco 2', ''),
(82, '2013-04-21 09:01:07', 4, NULL, NULL, 'Active', 1, 50, 'Root', 'Machine Families', ''),
(83, '2013-04-21 09:01:16', 4, NULL, NULL, 'Active', 1, 50, 'Machine Families', 'Family 1', ''),
(84, '2013-04-21 09:01:23', 4, NULL, NULL, 'Active', 1, 50, 'Machine Families', 'Family 2', ''),
(85, '2013-04-21 09:01:29', 4, NULL, NULL, 'Active', 1, 50, 'Machine Families', 'Family 3', ''),
(87, '2013-04-22 19:30:42', 4, NULL, NULL, 'Active', 1, 50, 'xxxxx', 'x1', ''),
(88, '2013-04-22 19:30:46', 4, NULL, NULL, 'Active', 1, 50, 'xxxxx', 'x2', ''),
(89, '2013-04-22 19:30:50', 4, NULL, NULL, 'Active', 1, 50, 'xxxxx', 'x3', '');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `company_id` bigint(20) DEFAULT NULL,
  `support_id` bigint(20) DEFAULT NULL,
  `is_company` char(3) COLLATE utf8_unicode_ci DEFAULT 'No',
  `is_customer` char(3) COLLATE utf8_unicode_ci DEFAULT 'No',
  `is_taxable` char(3) COLLATE utf8_unicode_ci DEFAULT 'Yes',
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tags` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `position` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fax` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `street1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `street2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `language` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Portuguese',
  `time_zone` varchar(255) COLLATE utf8_unicode_ci DEFAULT '-3',
  `cnpj` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ie` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start_dt` date DEFAULT NULL,
  `end_dt` date DEFAULT NULL,
  `credit_limit` decimal(10,2) DEFAULT '0.00',
  `total_purchased` decimal(10,2) DEFAULT '0.00',
  `total_refunded` decimal(10,2) DEFAULT '0.00',
  `total_invoiced` decimal(10,2) DEFAULT '0.00',
  `total_paid` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `company` (`company_id`),
  KEY `first_name` (`first_name`),
  KEY `last_name` (`last_name`),
  KEY `email` (`email`),
  KEY `full_name` (`full_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=21 ;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `company_id`, `support_id`, `is_company`, `is_customer`, `is_taxable`, `photo`, `first_name`, `last_name`, `full_name`, `tags`, `position`, `phone`, `mobile`, `fax`, `email`, `website`, `street1`, `street2`, `city`, `state`, `zip`, `country`, `language`, `time_zone`, `cnpj`, `ie`, `start_dt`, `end_dt`, `credit_limit`, `total_purchased`, `total_refunded`, `total_invoiced`, `total_paid`) VALUES
(1, NULL, NULL, '2013-04-10 21:38:04', 4, 'Active', 3, NULL, 'Yes', 'No', 'No', NULL, NULL, NULL, 'JKY Software Corp', NULL, NULL, '', '', '', 'pat.jan@jkysoftware.com', 'www.jkysoftware.com', '18781 Deep Well Rd', '', 'Santa Ana', 'CA', '92705', 'BR', 'English', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(2, NULL, NULL, '2013-04-10 21:38:06', 4, 'Active', 3, NULL, 'Yes', 'No', 'Yes', NULL, NULL, NULL, 'Tecno Malhas', NULL, NULL, '11 2274.3833', '', '11 2274.3865', 'suporte@metatex.com.br', 'www.metatex.com.br', 'Rua Baceunas, 51', '', 'Parque da Mooca', 'SP', '03127-060', 'BR', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(3, NULL, NULL, '2013-04-10 19:08:34', 4, 'Active', 3, NULL, 'Yes', 'No', 'Yes', NULL, NULL, NULL, 'DL Malhas', NULL, NULL, '', '', '', 'suporte@dlmalhas.com.br', '', '', '', '', 'AC', '', 'BR', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(4, NULL, NULL, '2013-04-27 09:27:34', 4, 'Active', 3, NULL, 'No', 'No', 'Yes', NULL, 'Pat', 'Jan', 'Pat Jan', NULL, NULL, '', '714-801-5752', '', 'pat_jan@hotmail.com', 'www.jkysoftware.com', '18781 Deep Well Rd', '', 'Santa Ana', 'CA', '92705', 'BR', 'Portuguese', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(5, NULL, NULL, '2013-04-27 15:44:58', 4, 'Active', 3, NULL, 'No', 'No', 'Yes', NULL, 'Joel', 'Jan', 'Joel Jan', NULL, NULL, '', '714-801-5757', '', 'joel_jan92@hotmail.com', 'www.jkysoftware.com', '18781 Deep Well Rd', '', 'Santa Ana ', 'CA', '92705', 'BR', 'Portuguese', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(6, NULL, NULL, '2013-04-27 15:45:08', 4, 'Active', 3, NULL, 'No', 'No', 'Yes', NULL, 'Marcelo', 'Lodi', 'Marcelo Lodi', NULL, NULL, '', '', '', '', '', '', '', '', 'AC', '', 'BR', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(7, '2013-04-10 19:10:37', 4, '2013-04-27 09:28:48', 4, 'Active', 3, NULL, 'No', 'No', 'Yes', NULL, 'Susan', 'Jan', 'Susan Jan', NULL, NULL, '', '714-801-5753', '', 'susan.jan@hotmail.com', '', '', '', '', 'AC', '', 'BR', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(8, '2013-04-24 19:42:57', 4, '2013-04-27 09:29:24', 4, 'Active', 3, NULL, 'No', 'No', 'Yes', NULL, 'Pat', 'Jan', 'Pat Jan', NULL, NULL, NULL, '714-801-5753', NULL, 'pat.jan@jkysoftware.com', NULL, '', '', '', 'AC', '', 'BR', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(9, '2013-04-26 06:12:06', 4, '2013-04-27 13:24:10', 4, 'Active', 3, NULL, 'No', 'No', 'Yes', NULL, 'Pat', 'Jan', 'Pat Jan', NULL, NULL, NULL, '714-801-1006', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(17, '2013-04-27 12:56:31', 4, '2013-04-27 15:26:33', 4, 'Active', 3, NULL, 'No', 'No', 'Yes', NULL, 'New1', 'User', 'New1 User', NULL, NULL, NULL, '', NULL, '', NULL, 'Street1 New1', 'Street2 New2', 'City New1', 'AC', '12345', 'US', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(18, '2013-04-27 13:19:33', 4, '2013-04-27 15:52:21', 4, 'Active', 3, NULL, 'No', 'No', 'Yes', NULL, 'New2', 'User', 'New2 User', NULL, '', '', '', '', '', '', 'Street1 New2', 'Street2 New2', 'City New2', 'BA', '10002', 'US', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `controls`
--

CREATE TABLE IF NOT EXISTS `controls` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `company_id` bigint(20) DEFAULT '1',
  `sequence` int(11) DEFAULT '0',
  `group_set` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Root',
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `value` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_set` (`group_set`,`name`),
  KEY `sequence` (`company_id`,`sequence`),
  KEY `name` (`name`,`sequence`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1000000273 ;

--
-- Dumping data for table `controls`
--

INSERT INTO `controls` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `company_id`, `sequence`, `group_set`, `name`, `value`) VALUES
(1000000008, '2011-05-09 19:51:49', 1000000001, '2012-08-13 11:07:15', 1000000001, 'Active', 1000000001, 50, 'System Keys', 'SMTP', ''),
(1000000002, NULL, NULL, '2013-04-14 08:27:54', 4, 'Active', 1000000001, 0, 'Root', 'Status Codes', ''),
(1000000003, NULL, NULL, '2013-04-13 07:05:57', 4, 'Active', 1000000001, 0, 'Root', 'System Defaults', ''),
(1000000004, NULL, NULL, '2013-04-13 07:05:57', 4, 'Active', 1000000001, 0, 'Root', 'System Keys', ''),
(1000000005, NULL, NULL, '2011-09-14 09:12:46', 1000000001, 'Active', 1000000001, 100, 'System Keys', 'Time Zone', 'America/Los_Angeles'),
(1000000006, NULL, NULL, '2011-05-14 20:33:09', 1000000001, 'Active', 1000000001, 110, 'System Keys', 'Email Status', 'stopped at 2010-12-24 19:47:05'),
(1000000007, NULL, NULL, '2011-05-09 20:17:44', 1000000001, 'Active', 1000000001, 400, 'System Keys', 'Upload Max File Size', '30M'),
(1000000009, '2011-05-09 20:02:51', 1000000001, '2012-02-10 07:53:26', 1000000001, 'Active', 1000000001, 200, 'System Keys', 'Email From System', 'noreply;noreply@jkysoftware.com'),
(1000000010, '2011-05-09 20:05:41', 1000000001, '2013-04-13 07:05:49', 4, 'Active', 1000000001, 0, 'Root', 'Root', ''),
(1000000012, '2011-05-12 18:01:11', 1000000001, '2013-04-06 05:46:27', 1, 'Active', 1000000001, 0, 'Status Codes', 'Active', ''),
(1000000013, '2011-05-12 18:01:25', 1000000001, '2013-04-06 05:46:21', 1, 'Active', 1000000001, 0, 'Status Codes', 'Inactive', ''),
(1000000020, '2011-05-12 18:05:24', 1000000001, '2011-11-18 05:17:58', 1000000001, 'Active', 1000000001, 50, 'System Defaults', 'User Role', 'guest'),
(1000000022, '2011-05-12 18:07:45', 1000000001, '2011-11-18 05:18:26', 1000000001, 'Active', 1000000001, 50, 'System Defaults', 'Company Country', 'US'),
(1000000027, '2011-05-12 18:41:49', 1000000001, '2013-04-13 07:08:30', 4, 'Active', 1000000001, 0, 'Root', 'User Roles', ''),
(1000000028, '2011-05-12 18:42:09', 1000000001, '2013-04-07 15:30:43', 4, 'Active', 1000000001, 20, 'User Roles', 'Guest', 'home.php'),
(1000000029, '2011-05-12 18:42:19', 1000000001, '2013-04-07 09:20:37', 4, 'Active', 1000000001, 30, 'User Roles', 'Member', 'myinfo2.php'),
(1000000030, '2011-05-12 18:42:33', 1000000001, '2013-04-07 09:20:42', 4, 'Active', 1000000001, 40, 'User Roles', 'Teacher', 'home.php'),
(1000000031, '2011-05-12 18:42:46', 1000000001, '2013-04-07 09:20:52', 4, 'Active', 1000000001, 60, 'User Roles', 'Leader', 'groups.php'),
(1000000032, '2011-05-12 18:43:01', 1000000001, '2013-04-07 09:20:55', 4, 'Active', 1000000001, 70, 'User Roles', 'Account', 'payments.php'),
(1000000033, '2011-05-12 18:43:10', 1000000001, '2013-04-08 16:07:06', 4, 'Active', 1000000001, 80, 'User Roles', 'Admin', 'customers'),
(1000000034, '2011-05-12 18:43:20', 1000000001, '2013-04-14 06:35:04', 4, 'Active', 1000000001, 90, 'User Roles', 'Support', 'ftps'),
(1000000037, '2011-05-15 06:22:43', 1000000001, '2013-04-13 07:08:02', 4, 'Active', 1000000001, 0, 'Root', 'User Resources', ''),
(1000000038, '2011-05-15 06:24:21', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Comments', ''),
(1000000039, '2011-05-15 06:24:28', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Controls', ''),
(1000000040, '2011-05-15 06:24:45', 1000000001, '2013-04-08 15:03:16', 4, 'Active', 1000000001, 50, 'User Resources', 'Configs', ''),
(1000000056, '2011-05-15 07:19:47', 1000000001, NULL, NULL, 'Active', 1000000001, 200, 'User Actions', 'Login', ''),
(1000000042, '2011-05-15 06:25:10', 1000000001, '2011-05-18 16:44:58', 1000000001, 'Active', 1000000001, 50, 'User Resources', 'Tickets', ''),
(1000000043, '2011-05-15 06:25:16', 1000000001, '2011-05-18 16:45:28', 1000000001, 'Active', 1000000001, 50, 'User Resources', 'Permissions', ''),
(1000000044, '2011-05-15 06:30:40', 1000000001, '2013-04-13 07:08:01', 4, 'Active', 1000000001, 0, 'Root', 'User Actions', ''),
(1000000045, '2011-05-15 06:33:00', 1000000001, '2011-05-15 12:51:11', 1000000001, 'Active', 1000000001, 20, 'User Actions', 'Denied', ''),
(1000000046, '2011-05-15 06:33:07', 1000000001, '2011-05-15 07:13:57', 1000000001, 'Active', 1000000001, 10, 'User Actions', 'All', ''),
(1000000047, '2011-05-15 06:33:23', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'View', ''),
(1000000048, '2011-05-15 06:33:38', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Insert', ''),
(1000000049, '2011-05-15 06:33:45', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Update', ''),
(1000000050, '2011-05-15 06:33:52', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Delete', ''),
(1000000051, '2011-05-15 06:34:03', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Publish', ''),
(1000000062, '2011-05-18 16:46:14', 1000000001, '2013-04-07 17:21:43', 4, 'Active', 1000000001, 0, 'Status Codes', 'History', ''),
(1000000054, '2011-05-15 07:17:23', 1000000001, '2013-04-07 09:20:46', 4, 'Active', 1000000001, 50, 'User Roles', 'Captain', 'groups.php'),
(1000000055, '2011-05-15 07:18:25', 1000000001, '2011-05-18 16:45:34', 1000000001, 'Active', 1000000001, 50, 'User Resources', 'Users', ''),
(1000000057, '2011-05-15 07:19:58', 1000000001, NULL, NULL, 'Active', 1000000001, 210, 'User Actions', 'Logout', ''),
(1000000058, '2011-05-15 07:20:08', 1000000001, '2011-05-15 07:20:17', 1000000001, 'Active', 1000000001, 220, 'User Actions', 'Update Profile', ''),
(1000000059, '2011-05-15 09:38:14', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Export', ''),
(1000000060, '2011-05-16 19:41:20', 1000000001, NULL, NULL, 'Active', 1000000001, 10, 'User Resources', 'Home', ''),
(1000000061, '2011-05-16 19:41:56', 1000000001, '2013-04-07 15:27:37', 4, 'Active', 1000000001, 10, 'User Roles', 'Visitor', 'home.php'),
(1000000064, '2011-05-25 16:53:58', 1000000001, '2013-04-13 07:10:42', 4, 'Active', 1000000001, 0, 'Root', 'Company Types', ''),
(1000000065, '2011-05-25 16:54:19', 1000000001, '2013-04-06 05:01:16', 1, 'Active', 1000000001, 10, 'Company Types', 'Domain', ''),
(1000000066, '2011-05-25 16:54:26', 1000000001, '2013-04-06 05:01:20', 1, 'Active', 1000000001, 20, 'Company Types', 'Company', ''),
(1000000067, '2011-05-25 16:54:44', 1000000001, '2013-04-06 05:01:23', 1, 'Active', 1000000001, 30, 'Company Types', 'Individual', ''),
(1000000073, '2011-05-29 09:56:52', 1000000001, NULL, NULL, 'Active', 1000000001, 20, 'User Resources', 'Admin', ''),
(1000000076, NULL, NULL, '2013-04-13 07:07:59', 4, 'Active', 1000000001, 0, 'Root', 'Template Types', ''),
(1000000077, NULL, NULL, '2013-04-07 09:19:45', 4, 'Active', 1000000001, 0, 'Template Types', 'By Time', ''),
(1000000078, NULL, NULL, '2013-04-07 09:19:53', 4, 'Active', 1000000001, 0, 'Template Types', 'By Event', ''),
(1000000079, NULL, NULL, '2013-04-07 09:20:02', 4, 'Active', 1000000001, 0, 'Template Types', 'Mass Email', ''),
(1000000080, '2011-06-09 17:42:29', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Categories', ''),
(1000000081, '2011-06-09 17:42:42', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Templates', ''),
(1000000082, '2011-06-26 21:29:49', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Models', ''),
(1000000083, '2011-06-26 21:31:02', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Products', ''),
(1000000107, '2011-09-13 17:52:11', 1000000001, '2011-09-27 06:44:32', 1000000001, 'Active', 1000000001, 50, 'User Resources', 'Services', ''),
(1000000200, '2011-11-18 06:03:48', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'My Info', ''),
(1000000226, '2012-05-06 11:56:30', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Settings', ''),
(1000000227, '2012-06-02 06:14:46', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Combine', ''),
(1000000230, '2012-07-10 07:23:19', 1000000001, '2012-07-10 07:23:27', 1000000001, 'Active', 1000000001, 50, 'User Resources', 'Translations', ''),
(1000000231, '2012-08-06 08:13:29', 1000000001, '2013-04-13 07:10:02', 4, 'Active', 1000000001, 0, 'Root', 'Priorities', ''),
(1000000232, '2012-08-06 08:13:46', 1000000001, '2013-04-07 09:13:10', 4, 'Active', 1000000001, 10, 'Priorities', 'Minor', ''),
(1000000233, '2012-08-06 08:17:25', 1000000001, '2013-04-07 09:13:16', 4, 'Active', 1000000001, 50, 'Priorities', 'Normal', ''),
(1000000234, '2012-08-06 08:17:34', 1000000001, '2013-04-07 09:13:21', 4, 'Active', 1000000001, 90, 'Priorities', 'Major', ''),
(1000000235, '2012-08-06 08:17:45', 1000000001, '2013-04-07 09:13:25', 4, 'Active', 1000000001, 99, 'Priorities', 'Critical', ''),
(1000000236, '2012-08-15 13:45:03', 1000000001, '2013-04-13 07:05:52', 4, 'Active', 1000000001, 0, 'Root', 'Summary', ''),
(1000000237, '2012-08-15 13:45:21', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Count by Age', ''),
(1000000238, '2012-08-15 13:45:31', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Count by Church', ''),
(1000000239, '2012-08-15 13:45:49', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Count by Gift', ''),
(1000000240, '2012-08-15 13:49:14', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Language English', ''),
(1000000241, '2012-08-15 13:49:24', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Language Mandarim', ''),
(1000000242, '2012-08-15 13:49:35', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Language Taiwanese', ''),
(1000000243, '2012-08-15 13:49:44', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Percentage Completed', ''),
(1000000247, '2012-08-17 19:36:19', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Count by School Year', ''),
(1000000245, '2012-08-15 13:50:03', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Tshirt Size', ''),
(1000000246, '2012-08-15 13:51:00', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Summary', ''),
(1000000260, '2013-04-10 19:01:19', 4, NULL, NULL, 'Active', 1, 50, 'User Resources', 'Machines', ''),
(1000000262, '2013-04-14 15:42:02', 4, '2013-04-14 15:42:11', 4, 'Active', 1, 0, 'Root', 'System Numbers', ''),
(1000000263, '2013-04-14 15:43:40', 4, '2013-04-20 07:17:38', 4, 'Active', 1, 50, 'System Numbers', 'Next FTP number', '130021'),
(1000000264, '2013-04-16 17:36:19', 4, NULL, NULL, 'Active', 1, 50, 'User Resources', 'FTPs', ''),
(1000000265, '2013-04-16 17:36:36', 4, NULL, NULL, 'Active', 1, 50, 'User Resources', 'Colors', ''),
(1000000266, '2013-04-16 17:37:08', 4, NULL, NULL, 'Active', 1, 50, 'User Resources', 'FTP_Loads', ''),
(1000000267, '2013-04-16 17:37:21', 4, NULL, NULL, 'Active', 1, 50, 'User Resources', 'FTP_Sets', ''),
(1000000268, '2013-04-16 17:37:32', 4, NULL, NULL, 'Active', 1, 50, 'User Resources', 'FTP_Threads', ''),
(1000000269, '2013-04-16 17:37:42', 4, NULL, NULL, 'Active', 1, 50, 'User Resources', 'History', ''),
(1000000270, '2013-04-16 17:38:31', 4, NULL, NULL, 'Active', 1, 50, 'User Resources', 'Threads', ''),
(1000000271, '2013-04-22 15:28:28', 4, NULL, NULL, 'Active', 1, 50, 'User Resources', 'Cylinders', ''),
(1000000272, '2013-04-25 15:40:01', 4, NULL, NULL, 'Active', 1, 50, 'User Resources', 'All', '');

-- --------------------------------------------------------

--
-- Table structure for table `cylinders`
--

CREATE TABLE IF NOT EXISTS `cylinders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `machine_id` bigint(20) DEFAULT NULL,
  `is_current` char(3) COLLATE utf8_unicode_ci DEFAULT 'No',
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `machine_id` (`machine_id`,`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=11 ;

--
-- Dumping data for table `cylinders`
--

INSERT INTO `cylinders` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `machine_id`, `is_current`, `name`) VALUES
(3, 4, '2013-04-22 16:39:11', 4, '2013-04-22 17:10:46', 'Active', 1, 'Yes', 'Altesa 1'),
(6, 4, '2013-04-22 17:09:04', 4, '2013-04-22 17:10:19', 'Active', 3, 'Yes', 'Angelica'),
(7, 4, '2013-04-22 17:09:05', 4, '2013-04-22 17:10:29', 'Active', 4, 'Yes', 'Angelina'),
(8, 4, '2013-04-22 17:10:47', 4, '2013-04-22 17:10:54', 'Active', 1, 'No', 'Altesa 2'),
(9, 4, '2013-04-22 17:10:57', 4, '2013-04-22 17:11:03', 'Active', 1, 'No', 'Altesa 3');

-- --------------------------------------------------------

--
-- Table structure for table `ftps`
--

CREATE TABLE IF NOT EXISTS `ftps` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `code` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `machine_id` bigint(20) DEFAULT NULL,
  `diameter` int(11) DEFAULT '0',
  `density` int(11) DEFAULT '0',
  `inputs` int(11) DEFAULT '0',
  `speed` int(11) DEFAULT '0',
  `turns` int(11) DEFAULT '0',
  `weight` int(11) DEFAULT '0',
  `width` int(11) DEFAULT '0',
  `lanes` int(11) DEFAULT '0',
  `yield` int(11) DEFAULT '0',
  `needling` int(11) DEFAULT '0',
  `peso` decimal(5,2) DEFAULT '0.00',
  `has_break` char(3) COLLATE utf8_unicode_ci DEFAULT 'no',
  `composition` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `draw` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `product` (`product_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=130021 ;

--
-- Dumping data for table `ftps`
--

INSERT INTO `ftps` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `code`, `product_id`, `machine_id`, `diameter`, `density`, `inputs`, `speed`, `turns`, `weight`, `width`, `lanes`, `yield`, `needling`, `peso`, `has_break`, `composition`, `draw`, `photo`) VALUES
(10003, 4, '2013-04-13 19:33:27', 4, '2013-04-26 04:32:42', 'Active', '10003', 3, 3, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, '12.50', 'Yes', '60 Algodao, 40 Polyester', NULL, NULL),
(10006, 4, '2013-04-16 17:30:07', 4, '2013-04-21 16:19:43', 'Active', '10006', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '12.50', 'Yes', '51 Algodao, 49 Polyester', NULL, NULL),
(10001, NULL, NULL, 4, '2013-04-27 07:10:45', 'Active', '10001', 1, 1, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, '12.50', 'Yes', '40 Elastano, 60 Acrilico', NULL, NULL),
(10004, 4, '2013-04-14 16:30:02', 4, '2013-04-21 16:19:42', 'Active', '10004', 2, 1, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, '12.50', 'No', '53 Algodao, 47 Polyester', NULL, NULL),
(10005, 4, '2013-04-14 21:55:38', 4, '2013-04-21 16:19:43', 'Active', '10005', 3, 3, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, '12.50', 'No', '54 Algodao, 46 Polyester', NULL, NULL),
(130001, 4, '2013-04-20 07:17:55', 4, '2013-04-21 16:19:44', 'Active', '130001', NULL, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '12.50', 'No', '40 Algodao, 60 Polyester', NULL, NULL),
(130003, 4, '2013-04-20 10:13:03', 4, '2013-04-21 16:19:46', 'Active', '130003', NULL, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '12.50', 'No', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ftp_loads`
--

CREATE TABLE IF NOT EXISTS `ftp_loads` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `ftp_id` bigint(20) DEFAULT NULL,
  `first_number` int(11) DEFAULT '0',
  `first_thread_id` bigint(20) DEFAULT NULL,
  `second_number` int(11) DEFAULT '0',
  `second_thread_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=22 ;

--
-- Dumping data for table `ftp_loads`
--

INSERT INTO `ftp_loads` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `ftp_id`, `first_number`, `first_thread_id`, `second_number`, `second_thread_id`) VALUES
(1, NULL, NULL, 4, '2013-04-21 08:48:40', 'Active', 10001, 1, 1, 1, 2),
(2, NULL, NULL, 4, '2013-04-27 07:12:30', 'Active', 10001, 1, 1, 1, 4),
(12, 4, '2013-04-21 08:50:05', 4, '2013-04-27 19:58:37', 'Active', 10003, 1, 1, 2, 2),
(11, 4, '2013-04-21 08:48:49', 4, '2013-04-21 08:49:24', 'Active', 10001, 1, 1, 2, 1),
(20, 4, '2013-04-21 17:34:57', NULL, NULL, 'Active', 10006, 0, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ftp_sets`
--

CREATE TABLE IF NOT EXISTS `ftp_sets` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `ftp_id` bigint(20) DEFAULT NULL,
  `setting_id` bigint(20) DEFAULT NULL,
  `value` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ftp_id` (`ftp_id`,`setting_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=40 ;

--
-- Dumping data for table `ftp_sets`
--

INSERT INTO `ftp_sets` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `ftp_id`, `setting_id`, `value`) VALUES
(1, 4, '2013-04-18 20:50:13', 4, '2013-04-20 07:26:34', 'Active', 10001, 43, '6 cima'),
(2, 4, '2013-04-18 20:50:17', NULL, NULL, 'Active', 10001, 44, '100'),
(3, 4, '2013-04-18 20:50:18', 4, '2013-04-18 20:50:29', 'Active', 10001, 45, '11.5'),
(4, 4, '2013-04-18 20:50:24', NULL, NULL, 'Active', 10001, 46, '120'),
(5, 4, '2013-04-18 20:50:35', NULL, NULL, 'Active', 10001, 47, '130'),
(6, 4, '2013-04-18 20:50:38', NULL, NULL, 'Active', 10001, 48, '14.5'),
(7, 4, '2013-04-18 20:50:41', 4, '2013-04-18 20:50:43', 'Active', 10001, 49, '150'),
(8, 4, '2013-04-18 20:50:58', 4, '2013-04-18 20:54:43', 'Active', 10001, 77, 'abcdefghijklmnopqrstuvwxyz'),
(9, 4, '2013-04-18 20:51:03', 4, '2013-04-18 20:54:47', 'Active', 10001, 78, 'abcdefghijklmnopqrstuvwxyz'),
(10, 4, '2013-04-18 20:51:11', 4, '2013-04-20 07:26:24', 'Active', 10001, 79, '9 cima'),
(11, 4, '2013-04-18 20:51:17', 4, '2013-04-20 07:26:30', 'Active', 10001, 80, '9 baixo'),
(12, 4, '2013-04-18 20:51:40', NULL, NULL, 'Active', 10001, 50, '16.5'),
(13, 4, '2013-04-18 20:51:41', NULL, NULL, 'Active', 10001, 51, '17.5'),
(14, 4, '2013-04-18 20:51:44', NULL, NULL, 'Active', 10001, 81, '18.5'),
(15, 4, '2013-04-18 20:51:46', NULL, NULL, 'Active', 10001, 52, '19.5'),
(16, 4, '2013-04-18 20:51:48', NULL, NULL, 'Active', 10001, 53, '20.5'),
(17, 4, '2013-04-18 20:51:50', 4, '2013-04-18 20:51:52', 'Active', 10001, 54, '21.5'),
(18, 4, '2013-04-18 20:51:55', NULL, NULL, 'Active', 10001, 55, '22.5'),
(19, 4, '2013-04-18 21:29:39', NULL, NULL, 'Active', 10003, 43, '4B'),
(20, 4, '2013-04-18 21:29:47', NULL, NULL, 'Active', 10003, 44, '210'),
(21, 4, '2013-04-18 21:29:51', NULL, NULL, 'Active', 10003, 45, '20.5'),
(22, 4, '2013-04-18 21:29:55', NULL, NULL, 'Active', 10003, 46, '220'),
(23, 4, '2013-04-18 21:29:59', NULL, NULL, 'Active', 10003, 47, '230'),
(24, 4, '2013-04-18 21:30:00', NULL, NULL, 'Active', 10003, 48, '24.5'),
(25, 4, '2013-04-18 21:30:06', NULL, NULL, 'Active', 10003, 49, '250'),
(26, 4, '2013-04-18 21:30:45', NULL, NULL, 'Active', 10003, 77, 'abcde fghij klmno pqrst uvwxyz'),
(27, 4, '2013-04-18 21:30:47', NULL, NULL, 'Active', 10003, 78, 'abcde fghij klmno pqrst uvwxyz'),
(28, 4, '2013-04-18 21:30:52', NULL, NULL, 'Active', 10003, 79, '26.5'),
(29, 4, '2013-04-18 21:30:54', NULL, NULL, 'Active', 10003, 80, '27.5'),
(30, 4, '2013-04-18 21:30:55', NULL, NULL, 'Active', 10003, 50, '28.5'),
(31, 4, '2013-04-18 21:30:57', NULL, NULL, 'Active', 10003, 51, '29.5'),
(32, 4, '2013-04-18 21:31:00', NULL, NULL, 'Active', 10003, 81, '30.5'),
(33, 4, '2013-04-18 21:31:02', NULL, NULL, 'Active', 10003, 52, '31.5'),
(34, 4, '2013-04-18 21:31:04', NULL, NULL, 'Active', 10003, 53, '32.5'),
(35, 4, '2013-04-18 21:31:06', NULL, NULL, 'Active', 10003, 54, '33.5'),
(36, 4, '2013-04-18 21:31:09', NULL, NULL, 'Active', 10003, 55, '34.5');

-- --------------------------------------------------------

--
-- Table structure for table `ftp_threads`
--

CREATE TABLE IF NOT EXISTS `ftp_threads` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `ftp_id` bigint(20) DEFAULT NULL,
  `thread_id` bigint(20) DEFAULT NULL,
  `percent` decimal(6,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ftp_id` (`ftp_id`,`thread_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=37 ;

--
-- Dumping data for table `ftp_threads`
--

INSERT INTO `ftp_threads` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `ftp_id`, `thread_id`, `percent`) VALUES
(1, NULL, NULL, 4, '2013-04-21 06:36:50', 'Active', 10001, 1, '20.00'),
(2, NULL, NULL, 4, '2013-04-21 06:26:19', 'Active', 10001, 2, '40.00'),
(9, 4, '2013-04-21 06:15:06', 4, '2013-04-21 08:51:47', 'Active', 10003, 1, '80.00'),
(10, 4, '2013-04-21 06:15:14', 4, '2013-04-21 08:50:37', 'Active', 10003, 2, '20.00'),
(19, 4, '2013-04-21 07:40:00', NULL, NULL, 'Active', 10005, NULL, '0.00'),
(34, 4, '2013-04-21 17:34:55', NULL, NULL, 'Active', 10006, NULL, '0.00'),
(35, 4, '2013-04-27 07:11:20', 4, '2013-04-27 07:11:34', 'Active', 10001, 4, '20.00'),
(36, 4, '2013-04-27 07:11:37', 4, '2013-04-27 07:11:57', 'Active', 10001, 5, '20.00');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE IF NOT EXISTS `history` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `parent_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `parent_id` bigint(20) unsigned DEFAULT NULL,
  `method` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `history` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `parent` (`parent_name`,`parent_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1000000000773 ;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `created_by`, `created_at`, `parent_name`, `parent_id`, `method`, `history`) VALUES
(1000000000001, 1, '2013-04-06 04:55:44', 'Controls', 1000000028, 'update', 'updated_by:1000000001=>1, status:Active=>active'),
(1000000000002, 1, '2013-04-06 04:57:14', 'Controls', 1000000065, 'update', 'updated_by:=>1, status:Active=>active, sequence:50=>10'),
(1000000000003, 1, '2013-04-06 04:57:23', 'Controls', 1000000066, 'update', 'updated_by:=>1, status:Active=>active, sequence:50=>20'),
(1000000000004, 1, '2013-04-06 04:57:28', 'Controls', 1000000067, 'update', 'updated_by:=>1, status:Active=>active, sequence:50=>30'),
(1000000000005, 1, '2013-04-06 05:01:16', 'Controls', 1000000065, 'update', 'status:active=>Active'),
(1000000000006, 1, '2013-04-06 05:01:20', 'Controls', 1000000066, 'update', 'status:active=>Active'),
(1000000000007, 1, '2013-04-06 05:01:23', 'Controls', 1000000067, 'update', 'status:active=>Active'),
(1000000000008, 1, '2013-04-06 05:11:38', 'Controls', 1000000004, 'update', 'value:System Value=>'),
(1000000000009, 1, '2013-04-06 05:20:53', 'Controls', 1000000002, 'update', 'sequence:12=>0'),
(1000000000010, 1, '2013-04-06 05:43:16', 'Controls', 1000000062, 'update', 'updated_by:1000000001=>1, name:history=>History'),
(1000000000011, 1, '2013-04-06 05:44:13', 'Controls', 1000000062, 'update', 'sequence:50=>0'),
(1000000000012, 1, '2013-04-06 05:46:21', 'Controls', 1000000013, 'update', 'updated_by:1000000001=>1, name:inactive=>Inactive'),
(1000000000013, 1, '2013-04-06 05:46:27', 'Controls', 1000000012, 'update', 'updated_by:1000000001=>1, name:active=>Active'),
(1000000000014, 1, '2013-04-06 11:03:20', 'Controls', 1000000248, 'insert', 'id:1000000248, created_at:2013-04-06 11:03:20, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Status Codes, name:XXXXXX, value:VVVVVV'),
(1000000000015, 1, '2013-04-06 11:03:41', 'Controls', 1000000248, 'delete', 'id:1000000248, created_at:2013-04-06 11:03:20, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Status Codes, name:XXXXXX, value:VVVVVV'),
(1000000000016, 1, '2013-04-06 11:06:36', 'Controls', 1000000249, 'insert', 'id:1000000249, created_at:2013-04-06 11:06:36, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Status Codes, name:xxxxxxx, value:d12223232323'),
(1000000000017, 1, '2013-04-06 11:06:47', 'Controls', 1000000250, 'insert', 'id:1000000250, created_at:2013-04-06 11:06:47, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:6050, group_set:Status Codes, name:dfsdfdsfgs, value:sdsggdg'),
(1000000000018, 1, '2013-04-06 11:06:48', 'Controls', 1000000251, 'insert', 'id:1000000251, created_at:2013-04-06 11:06:48, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:6050, group_set:Status Codes, name:dfsdfdsfgs, value:sdsggdg'),
(1000000000019, 1, '2013-04-06 11:07:06', 'Controls', 1000000252, 'insert', 'id:1000000252, created_at:2013-04-06 11:07:06, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:70, group_set:Status Codes, name:dfgfsgfdg, value:sggdsfgdfs'),
(1000000000020, 1, '2013-04-06 11:07:06', 'Controls', 1000000253, 'insert', 'id:1000000253, created_at:2013-04-06 11:07:06, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:70, group_set:Status Codes, name:dfgfsgfdg, value:sggdsfgdfs'),
(1000000000021, 1, '2013-04-06 11:07:06', 'Controls', 1000000254, 'insert', 'id:1000000254, created_at:2013-04-06 11:07:06, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:70, group_set:Status Codes, name:dfgfsgfdg, value:sggdsfgdfs'),
(1000000000022, 1, '2013-04-06 11:07:29', 'Controls', 1000000250, 'delete', 'id:1000000250, created_at:2013-04-06 11:06:47, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:6050, group_set:Status Codes, name:dfsdfdsfgs, value:sdsggdg'),
(1000000000023, 1, '2013-04-06 11:07:39', 'Controls', 1000000251, 'delete', 'id:1000000251, created_at:2013-04-06 11:06:48, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:6050, group_set:Status Codes, name:dfsdfdsfgs, value:sdsggdg'),
(1000000000024, 1, '2013-04-06 16:14:06', 'Controls', 1000000249, 'delete', 'id:1000000249, created_at:2013-04-06 11:06:36, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Status Codes, name:xxxxxxx, value:d12223232323'),
(1000000000025, 1, '2013-04-06 16:21:57', 'Controls', 1000000255, 'insert', 'id:1000000255, created_at:2013-04-06 16:21:57, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:99, group_set:Status Codes, name:xxxxxx, value:vvvvvvv'),
(1000000000026, 1, '2013-04-06 16:22:44', 'Controls', 1000000255, 'delete', 'id:1000000255, created_at:2013-04-06 16:21:57, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:99, group_set:Status Codes, name:xxxxxx, value:vvvvvvv'),
(1000000000027, 1, '2013-04-06 16:22:55', 'Controls', 1000000252, 'delete', 'id:1000000252, created_at:2013-04-06 11:07:06, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:70, group_set:Status Codes, name:dfgfsgfdg, value:sggdsfgdfs'),
(1000000000028, 1, '2013-04-06 16:22:58', 'Controls', 1000000253, 'delete', 'id:1000000253, created_at:2013-04-06 11:07:06, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:70, group_set:Status Codes, name:dfgfsgfdg, value:sggdsfgdfs'),
(1000000000029, 1, '2013-04-06 16:23:00', 'Controls', 1000000254, 'delete', 'id:1000000254, created_at:2013-04-06 11:07:06, created_by:1, updated_at:, updated_by:, status:Active, company_id:1, sequence:70, group_set:Status Codes, name:dfgfsgfdg, value:sggdsfgdfs'),
(1000000000030, 4, '2013-04-07 08:45:07', 'Controls', 1000000004, 'update', 'updated_by:1=>4, status:Inactive=>Active'),
(1000000000031, 4, '2013-04-07 08:45:07', 'Controls', 1000000002, 'update', 'updated_by:1=>4'),
(1000000000032, 4, '2013-04-07 08:45:07', 'Controls', 1000000010, 'update', 'updated_by:1000000001=>4'),
(1000000000033, 4, '2013-04-07 08:45:07', 'Controls', 1000000027, 'update', 'updated_by:=>4'),
(1000000000034, 4, '2013-04-07 08:49:43', 'Controls', 1000000002, 'update', 'status:Active=>Inactive'),
(1000000000035, 4, '2013-04-07 08:49:54', 'Controls', 1000000064, 'update', 'updated_by:=>4, status:Active=>Inactive'),
(1000000000036, 4, '2013-04-07 08:50:15', 'Controls', 1000000004, 'update', 'status:Active=>Inactive'),
(1000000000037, 4, '2013-04-07 08:50:15', 'Controls', 1000000002, 'update', 'status:Inactive=>Active'),
(1000000000038, 4, '2013-04-07 08:59:16', 'Controls', 1000000064, 'update', 'status:Inactive=>Active'),
(1000000000039, 4, '2013-04-07 08:59:25', 'Controls', 1000000003, 'update', 'updated_by:1=>4, status:Active=>Inactive'),
(1000000000040, 4, '2013-04-07 08:59:34', 'Controls', 1000000256, 'insert', 'id:1000000256, created_at:2013-04-07 08:59:34, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:vbcvbvbvbvcb, value:'),
(1000000000041, 4, '2013-04-07 08:59:38', 'Controls', 1000000256, 'delete', 'id:1000000256, created_at:2013-04-07 08:59:34, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:vbcvbvbvbvcb, value:'),
(1000000000042, 4, '2013-04-07 09:11:31', 'Controls', 1000000208, 'delete', 'id:1000000208, created_at:2012-04-25 08:30:54, created_by:1000000001, updated_at:, updated_by:, status:Active, company_id:1000000001, sequence:70, group_set:Display Rows, name:1000, value:'),
(1000000000043, 4, '2013-04-07 09:11:34', 'Controls', 1000000202, 'delete', 'id:1000000202, created_at:2012-04-25 08:28:23, created_by:1000000001, updated_at:, updated_by:, status:Active, company_id:1000000001, sequence:10, group_set:Display Rows, name:10, value:'),
(1000000000044, 4, '2013-04-07 09:11:34', 'Controls', 1000000203, 'delete', 'id:1000000203, created_at:2012-04-25 08:28:33, created_by:1000000001, updated_at:, updated_by:, status:Active, company_id:1000000001, sequence:20, group_set:Display Rows, name:20, value:'),
(1000000000045, 4, '2013-04-07 09:11:35', 'Controls', 1000000204, 'delete', 'id:1000000204, created_at:2012-04-25 08:29:25, created_by:1000000001, updated_at:, updated_by:, status:Active, company_id:1000000001, sequence:30, group_set:Display Rows, name:50, value:'),
(1000000000046, 4, '2013-04-07 09:11:35', 'Controls', 1000000205, 'delete', 'id:1000000205, created_at:2012-04-25 08:30:16, created_by:1000000001, updated_at:, updated_by:, status:Active, company_id:1000000001, sequence:40, group_set:Display Rows, name:100, value:'),
(1000000000047, 4, '2013-04-07 09:11:36', 'Controls', 1000000206, 'delete', 'id:1000000206, created_at:2012-04-25 08:30:32, created_by:1000000001, updated_at:, updated_by:, status:Active, company_id:1000000001, sequence:50, group_set:Display Rows, name:200, value:'),
(1000000000048, 4, '2013-04-07 09:11:37', 'Controls', 1000000207, 'delete', 'id:1000000207, created_at:2012-04-25 08:30:44, created_by:1000000001, updated_at:, updated_by:, status:Active, company_id:1000000001, sequence:60, group_set:Display Rows, name:500, value:'),
(1000000000049, 4, '2013-04-07 09:11:55', 'Controls', 1000000201, 'delete', 'id:1000000201, created_at:2012-04-25 08:28:07, created_by:1000000001, updated_at:2012-07-20 16:47:41, updated_by:1000000001, status:Active, company_id:1000000001, sequence:0, group_set:Root, name:Display Rows, value:'),
(1000000000050, 4, '2013-04-07 09:12:41', 'Controls', 1000000197, 'delete', 'id:1000000197, created_at:2011-09-17 07:39:10, created_by:1000000001, updated_at:, updated_by:, status:Active, company_id:1000000001, sequence:0, group_set:Group Types, name:tw, value:'),
(1000000000051, 4, '2013-04-07 09:12:43', 'Controls', 1000000196, 'delete', 'id:1000000196, created_at:2011-09-17 07:39:02, created_by:1000000001, updated_at:, updated_by:, status:Active, company_id:1000000001, sequence:0, group_set:Group Types, name:us, value:'),
(1000000000052, 4, '2013-04-07 09:12:53', 'Controls', 1000000195, 'delete', 'id:1000000195, created_at:2011-09-17 07:38:33, created_by:1000000001, updated_at:, updated_by:, status:Active, company_id:1000000001, sequence:0, group_set:Root, name:Group Types, value:'),
(1000000000053, 4, '2013-04-07 09:13:10', 'Controls', 1000000232, 'update', 'updated_by:=>4, name:minor=>Minor'),
(1000000000054, 4, '2013-04-07 09:13:16', 'Controls', 1000000233, 'update', 'updated_by:=>4, name:normal=>Normal'),
(1000000000055, 4, '2013-04-07 09:13:21', 'Controls', 1000000234, 'update', 'updated_by:=>4, name:major=>Major'),
(1000000000056, 4, '2013-04-07 09:13:25', 'Controls', 1000000235, 'update', 'updated_by:=>4, name:critical=>Critical'),
(1000000000057, 4, '2013-04-07 09:19:45', 'Controls', 1000000077, 'update', 'updated_by:=>4, name:by time=>By Time'),
(1000000000058, 4, '2013-04-07 09:19:53', 'Controls', 1000000078, 'update', 'updated_by:=>4, name:by event=>By Event'),
(1000000000059, 4, '2013-04-07 09:20:02', 'Controls', 1000000079, 'update', 'updated_by:=>4, name:mass email=>Mass Email'),
(1000000000060, 4, '2013-04-07 09:20:29', 'Controls', 1000000061, 'update', 'updated_by:1=>4, name:visitor=>Visitor'),
(1000000000061, 4, '2013-04-07 09:20:33', 'Controls', 1000000028, 'update', 'updated_by:1=>4, status:active=>Active, name:guest=>Guest'),
(1000000000062, 4, '2013-04-07 09:20:37', 'Controls', 1000000029, 'update', 'updated_by:1000000001=>4, name:member=>Member'),
(1000000000063, 4, '2013-04-07 09:20:42', 'Controls', 1000000030, 'update', 'updated_by:1000000001=>4, name:teacher=>Teacher'),
(1000000000064, 4, '2013-04-07 09:20:46', 'Controls', 1000000054, 'update', 'updated_by:1000000001=>4, name:captain=>Captain'),
(1000000000065, 4, '2013-04-07 09:20:52', 'Controls', 1000000031, 'update', 'updated_by:1000000001=>4, name:leader=>Leader'),
(1000000000066, 4, '2013-04-07 09:20:55', 'Controls', 1000000032, 'update', 'updated_by:1000000001=>4, name:account=>Account'),
(1000000000067, 4, '2013-04-07 09:20:59', 'Controls', 1000000033, 'update', 'updated_by:1000000001=>4, name:admin=>Admin'),
(1000000000068, 4, '2013-04-07 09:21:02', 'Controls', 1000000034, 'update', 'updated_by:1000000001=>4, name:support=>Support'),
(1000000000069, 4, '2013-04-07 09:22:22', 'Controls', 1000000003, 'update', 'status:Inactive=>Active'),
(1000000000070, 4, '2013-04-07 09:22:26', 'Controls', 1000000004, 'update', 'status:Inactive=>Active'),
(1000000000071, 4, '2013-04-07 12:18:04', 'Controls', 1000000003, 'update', 'sequence:12=>0'),
(1000000000072, 4, '2013-04-07 12:18:06', 'Controls', 1000000004, 'update', 'sequence:20=>0'),
(1000000000073, 4, '2013-04-07 15:31:02', 'Controls', 1000000257, 'insert', 'id:1000000257, created_at:2013-04-07 15:31:02, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Status Codes, name:XXXXXXXXX, value:'),
(1000000000074, 4, '2013-04-07 16:05:18', 'Controls', 1000000257, 'delete', 'id:1000000257, created_at:2013-04-07 15:31:02, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Status Codes, name:XXXXXXXXX, value:'),
(1000000000075, 4, '2013-04-07 16:05:30', 'Controls', 1000000062, 'update', 'updated_by:1=>4, name:History=>HistoryX'),
(1000000000076, 4, '2013-04-07 16:07:13', 'Controls', 1000000062, 'update', 'name:HistoryX=>HistoryXxx'),
(1000000000077, 4, '2013-04-07 17:21:43', 'Controls', 1000000062, 'update', 'name:HistoryXxx=>History'),
(1000000000078, 4, '2013-04-07 20:43:51', 'Controls', 1000000033, 'update', 'value:summary.php=>customers'),
(1000000000079, 4, '2013-04-08 10:22:49', 'Contacts', 1, 'update', 'updated_by:=>4, email:=>pat.jan@jkysoftware.com'),
(1000000000080, 4, '2013-04-08 10:23:19', 'Contacts', 4, 'update', 'updated_by:=>4, email:=>pat_jan@hotmail.com'),
(1000000000081, 4, '2013-04-08 10:23:56', 'Contacts', 5, 'update', 'updated_by:=>4, email:=>joel_jan92@hotmail.com'),
(1000000000082, 4, '2013-04-08 10:28:01', 'Contacts', 4, 'update', 'phone:=>714-801-5752'),
(1000000000083, 4, '2013-04-08 10:28:11', 'Contacts', 5, 'update', 'phone:=>714-801-5757'),
(1000000000084, 4, '2013-04-08 11:44:16', 'Contacts', 2, 'update', 'updated_by:=>4, email:=>suporte@metatex.com.br'),
(1000000000085, 4, '2013-04-08 11:44:33', 'Contacts', 3, 'update', 'updated_by:=>4, email:=>suporte@dlmalhas.com.br'),
(1000000000086, 4, '2013-04-08 14:09:55', 'Contacts', 4, 'update', 'is_company:no=>yes, phone:714-801-5752=>, mobile:=>714-801-5752, website:=>www.jkysoftware.com, street1:=>18781 Deep Well Rd, city:=>Santa Ana, state:=>CA, zip:=>92705, country:=>USA'),
(1000000000087, 4, '2013-04-08 14:10:24', 'Contacts', 4, 'update', 'phone:=>714-801-5752'),
(1000000000088, 4, '2013-04-08 14:12:00', 'Contacts', 4, 'update', 'phone:714-801-5752=>'),
(1000000000089, 4, '2013-04-08 14:12:51', 'Contacts', 5, 'update', 'is_company:no=>yes, phone:714-801-5757=>, mobile:=>714-801-5757, website:=>www.jkysoftware.com, street1:=>18781 Deep Well Rd, city:=>Santa Ana , state:=>CA, zip:=>92705, country:=>USA'),
(1000000000090, 4, '2013-04-08 14:13:45', 'Contacts', 1, 'update', 'website:=>www.jkysoftware.com, street1:=>18781 Deep Well Rd, city:=>Santa Ana, state:=>CA, zip:=>92705, country:=>USA'),
(1000000000091, 4, '2013-04-08 14:15:37', 'Contacts', 2, 'update', 'street1:=>Rua Baceunas, 51, city:=>Parque da Mooca, state:=>Search More..., zip:=>03127-060, country:=>USA'),
(1000000000092, 4, '2013-04-08 14:17:29', 'Contacts', 2, 'update', 'phone:=>11 2274.3833, fax:=>11 2274.3865, website:=>www.metatex.com.br, state:Search More...=>SP, country:USA=>BR'),
(1000000000093, 4, '2013-04-08 15:03:16', 'Controls', 1000000040, 'update', 'updated_by:=>4, name:Companies=>Configs'),
(1000000000094, 4, '2013-04-08 15:05:14', 'Controls', 1000000033, 'update', 'value:customers=>configs'),
(1000000000095, 4, '2013-04-08 15:06:12', 'Configs', 2, 'insert', 'id:2, created_at:2013-04-08 15:06:12, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:Countries, value:'),
(1000000000096, 4, '2013-04-08 16:07:06', 'Controls', 1000000033, 'update', 'value:configs=>customers'),
(1000000000097, 4, '2013-04-10 15:51:14', 'Controls', 1000000258, 'insert', 'id:1000000258, created_at:2013-04-10 15:51:14, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:States, value:'),
(1000000000098, 4, '2013-04-10 15:51:22', 'Controls', 1000000258, 'delete', 'id:1000000258, created_at:2013-04-10 15:51:14, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:States, value:'),
(1000000000099, 4, '2013-04-10 15:52:29', 'Configs', 39, 'insert', 'id:39, created_at:2013-04-10 15:52:29, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:New Table, value:'),
(1000000000100, 4, '2013-04-10 15:52:50', 'Configs', 39, 'delete', 'id:39, created_at:2013-04-10 15:52:29, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:New Table, value:'),
(1000000000101, 4, '2013-04-10 17:47:09', 'Controls', 1000000259, 'insert', 'id:1000000259, created_at:2013-04-10 17:47:09, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Company Types, name:domains, value:'),
(1000000000102, 4, '2013-04-10 17:48:04', 'Controls', 1000000259, 'update', 'updated_by:=>4, name:domains=>domain2'),
(1000000000103, 4, '2013-04-10 17:48:15', 'Controls', 1000000259, 'delete', 'id:1000000259, created_at:2013-04-10 17:47:09, created_by:4, updated_at:2013-04-10 17:48:04, updated_by:4, status:Active, company_id:1, sequence:50, group_set:Company Types, name:domain2, value:'),
(1000000000104, 4, '2013-04-10 19:01:19', 'Controls', 1000000260, 'insert', 'id:1000000260, created_at:2013-04-10 19:01:19, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:User Resources, name:Machines, value:'),
(1000000000105, 4, '2013-04-10 19:07:25', 'Contacts', 4, 'update', 'country:USA=>BR'),
(1000000000106, 4, '2013-04-10 19:08:26', 'Contacts', 5, 'update', 'country:USA=>BR'),
(1000000000107, 4, '2013-04-10 19:08:29', 'Contacts', 6, 'update', 'updated_by:=>4, is_company:no=>yes, state:=>AC, country:=>BR'),
(1000000000108, 4, '2013-04-10 19:08:30', 'Contacts', 1, 'update', 'country:USA=>BR'),
(1000000000109, 4, '2013-04-10 19:08:34', 'Contacts', 3, 'update', 'state:=>AC, country:=>BR'),
(1000000000110, 4, '2013-04-10 19:10:37', 'Contacts', 7, 'insert', 'id:7, created_at:2013-04-10 19:10:37, created_by:4, updated_at:, updated_by:, status:Active, company_id:, support_id:, is_company:yes, is_customer:no, is_taxable:yes, photo:, first_name:, last_name:, full_name:, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:AC, zip:, country:BR, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000111, 4, '2013-04-10 19:11:05', 'Contacts', 7, 'update', 'updated_by:=>4, full_name:=>Susan Jan'),
(1000000000112, 4, '2013-04-10 21:37:05', 'Contacts', 7, 'update', 'mobile:=>714-801-5756'),
(1000000000113, 4, '2013-04-10 21:39:10', 'Machines', 1, 'insert', 'id:1, created_at:2013-04-10 21:39:10, created_by:4, updated_at:, updated_by:, status:Active, name:Altesa, machine_type:CIRCULAR, machine_brand:Brand2, diameter:100, width:200, density:300, inputs:50, lanes:6, repair_dt:, return_dt:'),
(1000000000114, 4, '2013-04-10 21:39:20', 'Machines', 1, 'update', 'updated_by:=>4, machine_brand:Brand2=>Brand1'),
(1000000000115, 4, '2013-04-10 21:40:59', 'Machines', 2, 'insert', 'id:2, created_at:2013-04-10 21:40:59, created_by:4, updated_at:, updated_by:, status:Active, name:, machine_type:CIRCULAR, machine_brand:Brand1, diameter:0, width:0, density:0, inputs:0, lanes:0, repair_dt:, return_dt:'),
(1000000000116, 4, '2013-04-10 21:41:17', 'Machines', 2, 'update', 'updated_by:=>4, name:=>Ana'),
(1000000000117, 4, '2013-04-10 21:41:57', 'Machines', 2, 'update', 'diameter:0=>120, width:0=>210, density:0=>140, inputs:0=>60, lanes:0=>4'),
(1000000000118, 4, '2013-04-10 22:06:51', 'Machines', 2, 'update', 'machine_brand:Brand1=>Brand3'),
(1000000000119, 4, '2013-04-10 22:11:18', 'Machines', 2, 'update', 'machine_type:CIRCULAR=>RETILINEA, machine_brand:Brand3=>Brand1'),
(1000000000120, 4, '2013-04-10 22:14:18', 'Machines', 2, 'update', 'machine_brand:Brand1=>Brand2'),
(1000000000121, 4, '2013-04-10 22:14:24', 'Machines', 1, 'update', 'machine_brand:Brand1=>Brand2'),
(1000000000122, 4, '2013-04-11 19:26:00', 'Machines', 2, 'update', 'machine_type:RETILINEA=>undefined, machine_brand:Brand2=>Brand1'),
(1000000000123, 4, '2013-04-11 19:27:04', 'Machines', 3, 'insert', 'id:3, created_at:2013-04-11 19:27:04, created_by:4, updated_at:, updated_by:, status:Active, name:Angelica, machine_type:CIRCULAR, machine_brand:Brand3, diameter:100, width:200, density:300, inputs:400, lanes:500, repair_dt:, return_dt:'),
(1000000000124, 4, '2013-04-11 19:27:14', 'Machines', 3, 'update', 'updated_by:=>4, machine_type:CIRCULAR=>RETILINEA, machine_brand:Brand3=>Brand1'),
(1000000000125, 4, '2013-04-11 19:27:45', 'Machines', 2, 'update', 'machine_type:undefined=>CIRCULAR'),
(1000000000126, 4, '2013-04-11 19:28:05', 'Machines', 2, 'update', 'machine_type:CIRCULAR=>RETILINEA'),
(1000000000127, 4, '2013-04-11 20:43:27', 'Machines', 1, 'update', 'machine_brand:Brand2=>Brand1'),
(1000000000128, 4, '2013-04-11 20:45:24', 'Machines', 3, 'update', 'machine_brand:Brand1=>Brand3'),
(1000000000129, 4, '2013-04-12 22:58:04', 'Configs', 40, 'insert', 'id:40, created_at:2013-04-12 22:58:04, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Countries, name: us, value:'),
(1000000000130, 4, '2013-04-12 22:58:13', 'Configs', 40, 'delete', 'id:40, created_at:2013-04-12 22:58:04, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Countries, name: us, value:'),
(1000000000131, 4, '2013-04-13 06:38:41', 'Controls', 1000000064, 'update', 'status:Active=>History'),
(1000000000132, 4, '2013-04-13 07:05:40', 'Controls', 1000000231, 'update', 'updated_by:=>4'),
(1000000000133, 4, '2013-04-13 07:05:52', 'Controls', 1000000236, 'update', 'updated_by:=>4'),
(1000000000134, 4, '2013-04-13 07:07:59', 'Controls', 1000000076, 'update', 'updated_by:=>4'),
(1000000000135, 4, '2013-04-13 07:08:01', 'Controls', 1000000044, 'update', 'updated_by:1000000001=>4'),
(1000000000136, 4, '2013-04-13 07:08:02', 'Controls', 1000000037, 'update', 'updated_by:=>4'),
(1000000000137, 4, '2013-04-13 07:10:19', 'Controls', 1000000261, 'insert', 'id:1000000261, created_at:2013-04-13 07:10:19, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:ddffgdfgdfgdgfdg, value:'),
(1000000000138, 4, '2013-04-13 07:10:26', 'Controls', 1000000261, 'delete', 'id:1000000261, created_at:2013-04-13 07:10:19, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:ddffgdfgdfgdgfdg, value:'),
(1000000000139, 4, '2013-04-13 07:10:42', 'Controls', 1000000064, 'update', 'status:History=>Active'),
(1000000000140, 4, '2013-04-13 19:29:33', 'FTPs', 1, 'insert', 'id:1, created_by:4, created_at:2013-04-13 19:29:33, updated_by:, updated_at:, status:Active, code:1, product_id:10001, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:0, composition:, draw:, photo:'),
(1000000000141, 4, '2013-04-13 19:29:45', 'FTPs', 2, 'insert', 'id:2, created_by:4, created_at:2013-04-13 19:29:45, updated_by:, updated_at:, status:Active, code:2, product_id:10002, machine_id:2, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:0, composition:, draw:, photo:'),
(1000000000142, 4, '2013-04-13 19:33:27', 'FTPs', 3, 'insert', 'id:3, created_by:4, created_at:2013-04-13 19:33:27, updated_by:, updated_at:, status:Active, code:3, product_id:10002, machine_id:3, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:0, composition:, draw:, photo:'),
(1000000000143, 4, '2013-04-13 21:04:53', 'FTPs', 1, 'update', 'updated_by:=>4, diameter:0=>100, density:0=>110, inputs:0=>120, speed:0=>130, turns:0=>140, weight:0=>150, width:0=>160, lanes:0=>170, yield:0=>180, needling:0=>190, has_break:0=>yes'),
(1000000000144, 4, '2013-04-13 21:05:24', 'FTPs', 2, 'update', 'updated_by:=>4, diameter:0=>200, density:0=>210, inputs:0=>220, speed:0=>230, turns:0=>240, weight:0=>250, width:0=>260, lanes:0=>270, yield:0=>280, needling:0=>290, has_break:0=>no'),
(1000000000145, 4, '2013-04-13 21:05:44', 'FTPs', 3, 'update', 'updated_by:=>4, diameter:0=>300, density:0=>310, inputs:0=>320, speed:0=>330, turns:0=>340, weight:0=>350, width:0=>360, lanes:0=>370, yield:0=>380, needling:0=>390, has_break:0=>yes'),
(1000000000146, 4, '2013-04-13 21:06:00', 'FTPs', 2, 'update', 'machine_id:2=>3'),
(1000000000147, 4, '2013-04-14 06:35:04', 'Controls', 1000000034, 'update', 'value:controls=>ftps'),
(1000000000148, 4, '2013-04-14 08:04:32', 'FTPs', 2, 'update', 'machine_id:3=>1'),
(1000000000149, 4, '2013-04-14 08:04:59', 'FTPs', 1, 'update', 'machine_id:1=>2'),
(1000000000150, 4, '2013-04-14 08:07:37', 'Configs', 41, 'insert', 'id:41, created_at:2013-04-14 08:07:37, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Countries, name:Root, value:'),
(1000000000151, 4, '2013-04-14 08:10:06', 'Configs', 41, 'delete', 'id:41, created_at:2013-04-14 08:07:37, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Countries, name:Root, value:'),
(1000000000152, 4, '2013-04-14 08:24:45', 'Controls', 1000000002, 'update', 'name:Status Codes=>Status Codes new'),
(1000000000153, 4, '2013-04-14 08:24:57', 'Controls', 1000000002, 'update', 'name:Status Codes new=>Status Codes'),
(1000000000154, 4, '2013-04-14 08:25:22', 'Controls', 1000000002, 'update', 'name:Status Codes=>Status Codes pat'),
(1000000000155, 4, '2013-04-14 08:27:54', 'Controls', 1000000002, 'update', 'name:Status Codes pat=>Status Codes'),
(1000000000156, 4, '2013-04-14 15:24:47', 'Configs', 42, 'insert', 'id:42, created_at:2013-04-14 15:24:47, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:Settings, value:'),
(1000000000157, 4, '2013-04-14 15:26:03', 'Configs', 43, 'insert', 'id:43, created_at:2013-04-14 15:26:03, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Settings, name:Ponto da Malha, value:'),
(1000000000158, 4, '2013-04-14 15:26:16', 'Configs', 44, 'insert', 'id:44, created_at:2013-04-14 15:26:16, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Settings, name:Fita da Malha, value:'),
(1000000000159, 4, '2013-04-14 15:26:25', 'Configs', 45, 'insert', 'id:45, created_at:2013-04-14 15:26:25, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Settings, name:LFA da Malha, value:'),
(1000000000160, 4, '2013-04-14 15:26:44', 'Configs', 43, 'update', 'updated_by:=>4, sequence:50=>10'),
(1000000000161, 4, '2013-04-14 15:26:50', 'Configs', 44, 'update', 'updated_by:=>4, sequence:50=>11'),
(1000000000162, 4, '2013-04-14 15:26:53', 'Configs', 45, 'update', 'updated_by:=>4, sequence:50=>12'),
(1000000000163, 4, '2013-04-14 15:32:49', 'Configs', 46, 'insert', 'id:46, created_at:2013-04-14 15:32:49, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:20, group_set:Settings, name:Ponto da Fang, value:'),
(1000000000164, 4, '2013-04-14 15:33:00', 'Configs', 47, 'insert', 'id:47, created_at:2013-04-14 15:33:00, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:21, group_set:Settings, name:Fita da Fang, value:'),
(1000000000165, 4, '2013-04-14 15:33:13', 'Configs', 48, 'insert', 'id:48, created_at:2013-04-14 15:33:13, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:22, group_set:Settings, name:LFA da Fang, value:'),
(1000000000166, 4, '2013-04-14 15:33:32', 'Configs', 49, 'insert', 'id:49, created_at:2013-04-14 15:33:32, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:30, group_set:Settings, name:Fita da Lycra, value:'),
(1000000000167, 4, '2013-04-14 15:33:46', 'Configs', 50, 'insert', 'id:50, created_at:2013-04-14 15:33:46, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:40, group_set:Settings, name:Ponto Central, value:'),
(1000000000168, 4, '2013-04-14 15:34:09', 'Configs', 51, 'insert', 'id:51, created_at:2013-04-14 15:34:09, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Settings, name:Ponto do Disco, value:'),
(1000000000169, 4, '2013-04-14 15:34:25', 'Configs', 52, 'insert', 'id:52, created_at:2013-04-14 15:34:25, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:51, group_set:Settings, name:Altura do Disco, value:'),
(1000000000170, 4, '2013-04-14 15:34:38', 'Configs', 53, 'insert', 'id:53, created_at:2013-04-14 15:34:38, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:52, group_set:Settings, name:Chave do Disco, value:'),
(1000000000171, 4, '2013-04-14 15:34:58', 'Configs', 54, 'insert', 'id:54, created_at:2013-04-14 15:34:58, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:60, group_set:Settings, name:Frontura, value:'),
(1000000000172, 4, '2013-04-14 15:35:07', 'Configs', 55, 'insert', 'id:55, created_at:2013-04-14 15:35:07, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:70, group_set:Settings, name:Puxador, value:'),
(1000000000173, 4, '2013-04-14 15:36:05', 'Configs', 2, 'update', 'updated_by:=>4, sequence:50=>10'),
(1000000000174, 4, '2013-04-14 15:36:11', 'Configs', 3, 'update', 'updated_by:=>4, sequence:50=>20'),
(1000000000175, 4, '2013-04-14 15:36:21', 'Configs', 32, 'update', 'updated_by:=>4, sequence:50=>40'),
(1000000000176, 4, '2013-04-14 15:36:25', 'Configs', 33, 'update', 'updated_by:=>4, sequence:50=>30'),
(1000000000177, 4, '2013-04-14 15:42:02', 'Controls', 1000000262, 'insert', 'id:1000000262, created_at:2013-04-14 15:42:02, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:System Numbers, value:'),
(1000000000178, 4, '2013-04-14 15:42:11', 'Controls', 1000000262, 'update', 'updated_by:=>4, sequence:50=>0'),
(1000000000179, 4, '2013-04-14 15:43:40', 'Controls', 1000000263, 'insert', 'id:1000000263, created_at:2013-04-14 15:43:40, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:System Numbers, name:Next FTP number, value:100001'),
(1000000000180, 4, '2013-04-14 16:08:08', 'Configs', 56, 'insert', 'id:56, created_at:2013-04-14 16:08:08, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:System Numbers, value:'),
(1000000000181, 4, '2013-04-14 16:08:24', 'Configs', 56, 'update', 'updated_by:=>4, sequence:50=>90'),
(1000000000182, 4, '2013-04-14 16:08:43', 'Configs', 57, 'insert', 'id:57, created_at:2013-04-14 16:08:43, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:System Numbers, name:Next FTP Number, value:'),
(1000000000183, 4, '2013-04-14 16:09:16', 'Configs', 57, 'update', 'updated_by:=>4, value:=>10001'),
(1000000000184, 4, '2013-04-14 16:09:42', 'Configs', 57, 'delete', 'id:57, created_at:2013-04-14 16:08:43, created_by:4, updated_at:2013-04-14 16:09:16, updated_by:4, status:Active, company_id:1, sequence:50, group_set:System Numbers, name:Next FTP Number, value:10001'),
(1000000000185, 4, '2013-04-14 16:09:50', 'Configs', 56, 'delete', 'id:56, created_at:2013-04-14 16:08:08, created_by:4, updated_at:2013-04-14 16:08:24, updated_by:4, status:Active, company_id:1, sequence:90, group_set:Root, name:System Numbers, value:'),
(1000000000186, 4, '2013-04-14 16:10:04', 'Controls', 1000000263, 'update', 'updated_by:=>4, value:100001=>10001'),
(1000000000187, 4, '2013-04-14 16:13:33', 'Controls', 1000000263, 'update', 'value:10001=>10004'),
(1000000000188, 4, '2013-04-14 16:25:42', 'FTPs', 10004, 'insert', 'id:10004, created_by:4, created_at:2013-04-14 16:25:42, updated_by:, updated_at:, status:Active, code:, product_id:, machine_id:1, diameter:400, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:0, composition:, draw:, photo:'),
(1000000000189, 4, '2013-04-14 16:25:51', 'FTPs', 10004, 'delete', 'id:10004, created_by:4, created_at:2013-04-14 16:25:42, updated_by:, updated_at:, status:Active, code:, product_id:, machine_id:1, diameter:400, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:0, composition:, draw:, photo:'),
(1000000000190, 4, '2013-04-14 16:26:05', 'FTPs', 10005, 'insert', 'id:10005, created_by:4, created_at:2013-04-14 16:26:05, updated_by:, updated_at:, status:Active, code:, product_id:, machine_id:1, diameter:400, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:0, composition:, draw:, photo:'),
(1000000000191, 4, '2013-04-14 16:29:48', 'Controls', 1000000263, 'update', 'value:10006=>10004'),
(1000000000192, 4, '2013-04-14 16:30:02', 'FTPs', 10004, 'insert', 'id:10004, created_by:4, created_at:2013-04-14 16:30:02, updated_by:, updated_at:, status:Active, code:10004, product_id:, machine_id:1, diameter:400, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:0, composition:, draw:, photo:'),
(1000000000193, 4, '2013-04-14 21:55:38', 'FTPs', 10005, 'insert', 'id:10005, created_by:4, created_at:2013-04-14 21:55:38, updated_by:, updated_at:, status:Active, code:10005, product_id:, machine_id:3, diameter:500, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:0, composition:, draw:, photo:'),
(1000000000194, 4, '2013-04-15 06:22:31', 'FTPs', 10001, 'delete', 'id:10001, created_by:4, created_at:2013-04-13 19:29:33, updated_by:4, updated_at:2013-04-14 08:04:59, status:Active, code:10001, product_id:1, machine_id:2, diameter:100, density:110, inputs:120, speed:130, turns:140, weight:150, width:160, lanes:170, yield:180, needling:190, has_break:yes, composition:, draw:, photo:'),
(1000000000195, 4, '2013-04-15 20:44:45', 'Machines', 1, 'update', 'machine_type:CIRCULAR=>undefined, machine_brand:Brand1=>BRAND1'),
(1000000000196, 4, '2013-04-15 20:48:54', 'Machines', 2, 'update', 'machine_type:RETILINEA=>undefined, machine_brand:Brand1=>BRAND1'),
(1000000000197, 4, '2013-04-15 21:03:24', 'Machines', 1, 'update', 'repair_date:=>2013-04-15, return_date:=>2013-04-16'),
(1000000000198, 4, '2013-04-15 21:04:16', 'Machines', 2, 'update', 'repair_date:=>2013-04-15, return_date:=>2013-04-16'),
(1000000000199, 4, '2013-04-15 21:04:20', 'Machines', 3, 'update', 'machine_type:RETILINEA=>undefined, machine_brand:Brand3=>BRAND1, repair_date:=>2013-04-15, return_date:=>2013-04-16'),
(1000000000200, 4, '2013-04-15 21:04:54', 'Machines', 1, 'update', 'repair_date:2013-04-15=>2013-04-11, return_date:2013-04-16=>2013-04-12'),
(1000000000201, 4, '2013-04-15 21:05:32', 'Machines', 2, 'update', 'repair_date:2013-04-15=>2013-04-12, return_date:2013-04-16=>2013-04-13'),
(1000000000202, 4, '2013-04-15 21:05:40', 'Machines', 3, 'update', 'repair_date:2013-04-15=>2013-04-13, return_date:2013-04-16=>2013-04-14'),
(1000000000203, 4, '2013-04-15 21:10:49', 'Machines', 1, 'update', 'repair_date:2013-04-11=>2013-04-10, return_date:2013-04-12=>2013-04-11'),
(1000000000204, 4, '2013-04-15 21:23:30', 'Machines', 4, 'insert', 'id:4, created_at:2013-04-15 21:23:30, created_by:4, updated_at:, updated_by:, status:Active, name:Angelina, machine_type:RETILINEA, machine_brand:BRAND1, diameter:0, width:0, density:0, inputs:0, lanes:0, repair_date:, return_date:'),
(1000000000205, 4, '2013-04-15 21:25:00', 'Machines', 4, 'update', 'updated_by:=>4, machine_type:RETILINEA=>undefined'),
(1000000000206, 4, '2013-04-15 21:25:23', 'Machines', 4, 'update', 'repair_date:=>2013-04-15'),
(1000000000207, 4, '2013-04-15 21:50:21', 'FTPs', 10002, 'delete', 'id:10002, created_by:4, created_at:2013-04-13 19:29:45, updated_by:4, updated_at:2013-04-14 08:04:32, status:Active, code:10002, product_id:2, machine_id:1, diameter:200, density:210, inputs:220, speed:230, turns:240, weight:250, width:260, lanes:270, yield:280, needling:290, has_break:no, composition:, draw:, photo:'),
(1000000000208, 4, '2013-04-15 21:51:08', 'Machines', 4, 'update', 'machine_type:undefined=>RETILINEA'),
(1000000000209, 4, '2013-04-16 06:13:23', 'Machines', 2, 'update', 'machine_type:undefined=>CIRCULAR'),
(1000000000210, 4, '2013-04-16 06:16:22', 'Machines', 1, 'update', 'machine_type:undefined=>CIRCULAR'),
(1000000000211, 4, '2013-04-16 06:23:11', 'Machines', 1, 'update', 'machine_type:CIRCULAR=>Circular'),
(1000000000212, 4, '2013-04-16 06:23:44', 'Machines', 2, 'update', 'machine_type:CIRCULAR=>Circular'),
(1000000000213, 4, '2013-04-16 06:23:45', 'Machines', 3, 'update', 'machine_type:undefined=>Circular'),
(1000000000214, 4, '2013-04-16 06:23:46', 'Machines', 4, 'update', 'machine_type:RETILINEA=>Circular'),
(1000000000215, 4, '2013-04-16 06:23:53', 'Machines', 4, 'update', 'machine_type:Circular=>Retilinea'),
(1000000000216, 4, '2013-04-16 06:27:51', 'Machines', 4, 'update', 'machine_brand:BRAND1=>BRAND2'),
(1000000000217, 4, '2013-04-16 06:27:58', 'Machines', 2, 'update', 'machine_brand:BRAND1=>BRAND2'),
(1000000000218, 4, '2013-04-16 06:28:02', 'Machines', 3, 'update', 'machine_brand:BRAND1=>BRAND3'),
(1000000000219, 4, '2013-04-16 06:28:30', 'Configs', 58, 'insert', 'id:58, created_at:2013-04-16 06:28:30, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Machine Brands, name:Brand4, value:'),
(1000000000220, 4, '2013-04-16 06:28:40', 'Configs', 36, 'update', 'name:BRAND1=>Brand1'),
(1000000000221, 4, '2013-04-16 06:28:46', 'Configs', 37, 'update', 'name:BRAND2=>Brand2'),
(1000000000222, 4, '2013-04-16 06:28:51', 'Configs', 38, 'update', 'name:BRAND3=>Brand3'),
(1000000000223, 4, '2013-04-16 17:24:23', 'FTPs', 10001, 'update', 'updated_by:=>4, has_break:no=>'),
(1000000000224, 4, '2013-04-16 17:29:04', 'FTPs', 10001, 'update', 'has_break:=>No'),
(1000000000225, 4, '2013-04-16 17:29:11', 'FTPs', 10004, 'update', 'updated_by:=>4, has_break:0=>No'),
(1000000000226, 4, '2013-04-16 17:29:14', 'FTPs', 10005, 'update', 'updated_by:=>4, has_break:0=>No'),
(1000000000227, 4, '2013-04-16 17:29:29', 'FTPs', 10001, 'update', 'has_break:No=>Yes'),
(1000000000228, 4, '2013-04-16 17:30:07', 'FTPs', 10006, 'insert', 'id:10006, created_by:4, created_at:2013-04-16 17:30:07, updated_by:, updated_at:, status:Active, code:10006, product_id:, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000229, 4, '2013-04-16 17:30:15', 'FTPs', 10006, 'update', 'updated_by:=>4, has_break:No=>Yes'),
(1000000000230, 4, '2013-04-16 17:32:26', 'FTPs', 10001, 'update', 'machine_id:1=>2, density:0=>110, inputs:0=>120, speed:0=>130, turns:0=>140, weight:0=>150, width:0=>160, lanes:0=>170, yield:0=>180, needling:0=>190, has_break:Yes=>No'),
(1000000000231, 4, '2013-04-16 17:36:19', 'Controls', 1000000264, 'insert', 'id:1000000264, created_at:2013-04-16 17:36:19, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:User Resources, name:FTPs, value:'),
(1000000000232, 4, '2013-04-16 17:36:36', 'Controls', 1000000265, 'insert', 'id:1000000265, created_at:2013-04-16 17:36:36, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:User Resources, name:Colors, value:'),
(1000000000233, 4, '2013-04-16 17:37:08', 'Controls', 1000000266, 'insert', 'id:1000000266, created_at:2013-04-16 17:37:08, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:User Resources, name:FTP_Loads, value:'),
(1000000000234, 4, '2013-04-16 17:37:21', 'Controls', 1000000267, 'insert', 'id:1000000267, created_at:2013-04-16 17:37:21, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:User Resources, name:FTP_Sets, value:'),
(1000000000235, 4, '2013-04-16 17:37:32', 'Controls', 1000000268, 'insert', 'id:1000000268, created_at:2013-04-16 17:37:32, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:User Resources, name:FTP_Threads, value:'),
(1000000000236, 4, '2013-04-16 17:37:42', 'Controls', 1000000269, 'insert', 'id:1000000269, created_at:2013-04-16 17:37:42, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:User Resources, name:History, value:'),
(1000000000237, 4, '2013-04-16 17:38:31', 'Controls', 1000000270, 'insert', 'id:1000000270, created_at:2013-04-16 17:38:31, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:User Resources, name:Threads, value:'),
(1000000000238, 4, '2013-04-16 19:29:15', 'FTPs', 10007, 'insert', 'id:10007, created_by:4, created_at:2013-04-16 19:29:15, updated_by:, updated_at:, status:Active, code:10007, product_id:, machine_id:3, diameter:500, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000239, 4, '2013-04-16 19:30:43', 'FTPs', 10008, 'insert', 'id:10008, created_by:4, created_at:2013-04-16 19:30:43, updated_by:, updated_at:, status:Active, code:10008, product_id:, machine_id:4, diameter:600, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000240, 4, '2013-04-16 19:32:29', 'FTPs', 10009, 'insert', 'id:10009, created_by:4, created_at:2013-04-16 19:32:29, updated_by:, updated_at:, status:Active, code:10009, product_id:, machine_id:2, diameter:700, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000241, 4, '2013-04-16 20:41:58', 'FTPs', 10001, 'update', 'composition:52 Algodao, 48 Polyester=>42 Algodao, 58 Polyester'),
(1000000000242, 4, '2013-04-16 20:44:33', 'FTPs', 10001, 'update', 'composition:42 Algodao, 58 Polyester=>52 Algodao, 48 Polyester'),
(1000000000243, 4, '2013-04-16 20:45:45', 'FTPs', 10001, 'update', 'composition:52 Algodao, 48 Polyester=>52 Algodaox, 48 Polyester'),
(1000000000244, 4, '2013-04-16 20:46:00', 'FTPs', 10001, 'update', 'composition:52 Algodaox, 48 Polyester=>42 Algodaox, 58 Polyesterx'),
(1000000000245, 4, '2013-04-16 20:46:11', 'FTPs', 10001, 'update', 'composition:42 Algodaox, 58 Polyesterx=>42 Algodao, 58 Polyesterx'),
(1000000000246, 4, '2013-04-16 20:46:15', 'FTPs', 10001, 'update', 'composition:42 Algodao, 58 Polyesterx=>42 Algodao, 58 Polyester'),
(1000000000247, 4, '2013-04-16 20:46:41', 'Configs', 59, 'insert', 'id:59, created_at:2013-04-16 20:46:41, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:Materials, value:'),
(1000000000248, 4, '2013-04-16 20:46:52', 'Configs', 60, 'insert', 'id:60, created_at:2013-04-16 20:46:52, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Algodao, value:'),
(1000000000249, 4, '2013-04-16 20:47:00', 'Configs', 61, 'insert', 'id:61, created_at:2013-04-16 20:47:00, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Polyester, value:'),
(1000000000250, 4, '2013-04-16 20:47:45', 'Configs', 62, 'insert', 'id:62, created_at:2013-04-16 20:47:45, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Viscose, value:'),
(1000000000251, 4, '2013-04-16 20:47:54', 'Configs', 63, 'insert', 'id:63, created_at:2013-04-16 20:47:54, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Acrilico, value:'),
(1000000000252, 4, '2013-04-16 20:48:02', 'Configs', 64, 'insert', 'id:64, created_at:2013-04-16 20:48:02, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Linho, value:'),
(1000000000253, 4, '2013-04-16 20:48:11', 'Configs', 65, 'insert', 'id:65, created_at:2013-04-16 20:48:11, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Nylon, value:'),
(1000000000254, 4, '2013-04-16 20:48:22', 'Configs', 66, 'insert', 'id:66, created_at:2013-04-16 20:48:22, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Poliamida, value:'),
(1000000000255, 4, '2013-04-16 20:48:30', 'Configs', 67, 'insert', 'id:67, created_at:2013-04-16 20:48:30, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Rayon, value:'),
(1000000000256, 4, '2013-04-16 20:48:37', 'Configs', 68, 'insert', 'id:68, created_at:2013-04-16 20:48:37, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Seda, value:'),
(1000000000257, 4, '2013-04-16 20:48:45', 'Configs', 69, 'insert', 'id:69, created_at:2013-04-16 20:48:45, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Elastano, value:'),
(1000000000258, 4, '2013-04-16 20:48:51', 'Configs', 70, 'insert', 'id:70, created_at:2013-04-16 20:48:51, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Modal, value:'),
(1000000000259, 4, '2013-04-16 20:49:02', 'Configs', 71, 'insert', 'id:71, created_at:2013-04-16 20:49:02, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Polinosic, value:'),
(1000000000260, 4, '2013-04-16 20:49:10', 'Configs', 72, 'insert', 'id:72, created_at:2013-04-16 20:49:10, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Liocel, value:'),
(1000000000261, 4, '2013-04-16 20:49:16', 'Configs', 73, 'insert', 'id:73, created_at:2013-04-16 20:49:16, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Materials, name:Metalica, value:'),
(1000000000262, 4, '2013-04-17 05:59:01', 'FTPs', 10001, 'update', 'composition:42 Algodao, 58 Polyester=>44 Algodao, 56 Polyester'),
(1000000000263, 4, '2013-04-17 06:00:46', 'FTPs', 10001, 'update', 'composition:44 Algodao, 56 Polyester=>44.5 Algodao, 55.5 Polyester'),
(1000000000264, 4, '2013-04-17 17:42:58', 'FTPs', 10001, 'update', 'composition:44.5 Algodao, 55.5 Polyester=>44.5 Elastano, 55.5 Polyester'),
(1000000000265, 4, '2013-04-17 17:43:02', 'FTPs', 10001, 'update', 'composition:44.5 Elastano, 55.5 Polyester=>44.5 Elastano, 55.5 Viscose'),
(1000000000266, 4, '2013-04-17 17:43:04', 'FTPs', 10001, 'update', 'composition:44.5 Elastano, 55.5 Viscose=>44.5 Elastano, 55.5 Polyester'),
(1000000000267, 4, '2013-04-17 17:43:08', 'FTPs', 10001, 'update', 'composition:44.5 Elastano, 55.5 Polyester=>44.5 Linho, 55.5 Polyester'),
(1000000000268, 4, '2013-04-17 17:43:09', 'FTPs', 10001, 'update', 'composition:44.5 Linho, 55.5 Polyester=>44.5 Algodao, 55.5 Polyester'),
(1000000000269, 4, '2013-04-17 20:06:38', 'FTPs', 10001, 'update', 'composition:44.5 Algodao, 55.5 Polyester=>44.5 Elastano, 55.5 Polyester'),
(1000000000270, 4, '2013-04-17 20:06:45', 'FTPs', 10001, 'update', 'composition:44.5 Elastano, 55.5 Polyester=>44.5 Algodao, 55.5 Polyester'),
(1000000000271, 4, '2013-04-17 20:07:35', 'FTPs', 10001, 'update', 'composition:44.5 Algodao, 55.5 Polyester=>44 Elastano, 56 Polyester'),
(1000000000272, 4, '2013-04-17 20:07:45', 'FTPs', 10001, 'update', 'composition:44 Elastano, 56 Polyester=>44 Algodao, 56 Polyester'),
(1000000000273, 4, '2013-04-17 20:08:08', 'FTPs', 10001, 'update', 'composition:44 Algodao, 56 Polyester=>44.5 Algodao, 55.5 Polyester'),
(1000000000274, 4, '2013-04-18 06:09:45', 'FTP_Sets', 1, 'insert', 'id:1, created_by:4, created_at:2013-04-18 06:09:45, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:43, value:100'),
(1000000000275, 4, '2013-04-18 06:09:51', 'FTP_Sets', 2, 'insert', 'id:2, created_by:4, created_at:2013-04-18 06:09:51, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:44, value:110'),
(1000000000276, 4, '2013-04-18 06:09:53', 'FTP_Sets', 3, 'insert', 'id:3, created_by:4, created_at:2013-04-18 06:09:53, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:45, value:130'),
(1000000000277, 4, '2013-04-18 06:09:56', 'FTP_Sets', 4, 'insert', 'id:4, created_by:4, created_at:2013-04-18 06:09:56, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:46, value:140'),
(1000000000278, 4, '2013-04-18 06:09:58', 'FTP_Sets', 5, 'insert', 'id:5, created_by:4, created_at:2013-04-18 06:09:58, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:47, value:150'),
(1000000000279, 4, '2013-04-18 06:10:00', 'FTP_Sets', 6, 'insert', 'id:6, created_by:4, created_at:2013-04-18 06:10:00, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:48, value:160'),
(1000000000280, 4, '2013-04-18 06:10:11', 'FTP_Sets', 7, 'insert', 'id:7, created_by:4, created_at:2013-04-18 06:10:11, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:49, value:170'),
(1000000000281, 4, '2013-04-18 06:10:13', 'FTP_Sets', 8, 'insert', 'id:8, created_by:4, created_at:2013-04-18 06:10:13, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:50, value:180'),
(1000000000282, 4, '2013-04-18 06:10:15', 'FTP_Sets', 9, 'insert', 'id:9, created_by:4, created_at:2013-04-18 06:10:15, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:51, value:190');
INSERT INTO `history` (`id`, `created_by`, `created_at`, `parent_name`, `parent_id`, `method`, `history`) VALUES
(1000000000283, 4, '2013-04-18 06:10:17', 'FTP_Sets', 10, 'insert', 'id:10, created_by:4, created_at:2013-04-18 06:10:17, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:52, value:200'),
(1000000000284, 4, '2013-04-18 06:10:19', 'FTP_Sets', 11, 'insert', 'id:11, created_by:4, created_at:2013-04-18 06:10:19, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:53, value:210'),
(1000000000285, 4, '2013-04-18 06:10:20', 'FTP_Sets', 12, 'insert', 'id:12, created_by:4, created_at:2013-04-18 06:10:20, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:54, value:220'),
(1000000000286, 4, '2013-04-18 06:10:22', 'FTP_Sets', 13, 'insert', 'id:13, created_by:4, created_at:2013-04-18 06:10:22, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:55, value:230'),
(1000000000287, 4, '2013-04-18 06:10:39', 'FTP_Sets', 1, 'update', 'updated_by:=>4, value:100=>101'),
(1000000000288, 4, '2013-04-18 06:11:09', 'FTP_Sets', 1, 'update', 'value:101=>100'),
(1000000000289, 4, '2013-04-18 06:11:30', 'FTP_Sets', 1, 'update', 'value:100=>6Up'),
(1000000000290, 4, '2013-04-18 06:11:40', 'FTP_Sets', 1, 'update', 'value:6Up=>6 Up'),
(1000000000291, 4, '2013-04-18 17:05:38', 'Configs', 74, 'insert', 'id:74, created_at:2013-04-18 17:05:38, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:new, value:'),
(1000000000292, 4, '2013-04-18 17:25:07', 'Configs', 74, 'delete', 'id:74, created_at:2013-04-18 17:05:38, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:new, value:'),
(1000000000293, 4, '2013-04-18 17:25:27', 'Configs', 75, 'insert', 'id:75, created_at:2013-04-18 17:25:27, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:new, value:'),
(1000000000294, 4, '2013-04-18 17:29:23', 'Configs', 75, 'delete', 'id:75, created_at:2013-04-18 17:25:27, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:new, value:'),
(1000000000295, 4, '2013-04-18 17:30:08', 'Configs', 76, 'insert', 'id:76, created_at:2013-04-18 17:30:08, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:new, value:'),
(1000000000296, 4, '2013-04-18 17:32:10', 'Configs', 76, 'delete', 'id:76, created_at:2013-04-18 17:30:08, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:new, value:'),
(1000000000297, 4, '2013-04-18 19:26:35', 'FTP_Sets', 14, 'insert', 'id:14, created_by:4, created_at:2013-04-18 19:26:35, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:43, value:5 Up'),
(1000000000298, 4, '2013-04-18 19:27:08', 'FTP_Sets', 14, 'update', 'updated_by:=>4, value:5 Up=>7 Up'),
(1000000000299, 4, '2013-04-18 19:28:27', 'FTP_Sets', 15, 'insert', 'id:15, created_by:4, created_at:2013-04-18 19:28:27, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:44, value:210'),
(1000000000300, 4, '2013-04-18 19:28:28', 'FTP_Sets', 16, 'insert', 'id:16, created_by:4, created_at:2013-04-18 19:28:28, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:45, value:220'),
(1000000000301, 4, '2013-04-18 19:28:30', 'FTP_Sets', 17, 'insert', 'id:17, created_by:4, created_at:2013-04-18 19:28:30, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:46, value:230'),
(1000000000302, 4, '2013-04-18 19:28:31', 'FTP_Sets', 18, 'insert', 'id:18, created_by:4, created_at:2013-04-18 19:28:31, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:47, value:24'),
(1000000000303, 4, '2013-04-18 19:28:34', 'FTP_Sets', 18, 'update', 'updated_by:=>4, value:24=>240'),
(1000000000304, 4, '2013-04-18 19:28:35', 'FTP_Sets', 19, 'insert', 'id:19, created_by:4, created_at:2013-04-18 19:28:35, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:48, value:250'),
(1000000000305, 4, '2013-04-18 19:28:37', 'FTP_Sets', 20, 'insert', 'id:20, created_by:4, created_at:2013-04-18 19:28:37, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:49, value:260'),
(1000000000306, 4, '2013-04-18 19:28:38', 'FTP_Sets', 21, 'insert', 'id:21, created_by:4, created_at:2013-04-18 19:28:38, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:50, value:270'),
(1000000000307, 4, '2013-04-18 19:28:40', 'FTP_Sets', 22, 'insert', 'id:22, created_by:4, created_at:2013-04-18 19:28:40, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:51, value:280'),
(1000000000308, 4, '2013-04-18 19:28:41', 'FTP_Sets', 23, 'insert', 'id:23, created_by:4, created_at:2013-04-18 19:28:41, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:52, value:290'),
(1000000000309, 4, '2013-04-18 19:28:43', 'FTP_Sets', 24, 'insert', 'id:24, created_by:4, created_at:2013-04-18 19:28:43, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:53, value:300'),
(1000000000310, 4, '2013-04-18 19:28:45', 'FTP_Sets', 25, 'insert', 'id:25, created_by:4, created_at:2013-04-18 19:28:45, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:54, value:310'),
(1000000000311, 4, '2013-04-18 19:28:46', 'FTP_Sets', 26, 'insert', 'id:26, created_by:4, created_at:2013-04-18 19:28:46, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:55, value:320'),
(1000000000312, 4, '2013-04-18 19:29:50', 'FTPs', 10003, 'update', 'composition:50 Algodao, 50 Polyester=>60 Algodao, 40 Polyester'),
(1000000000313, 4, '2013-04-18 19:30:07', 'FTPs', 10001, 'update', 'composition:44.5 Algodao, 55.5 Polyester=>45 Algodao, 55 Polyester'),
(1000000000314, 4, '2013-04-18 20:46:22', 'Configs', 77, 'insert', 'id:77, created_at:2013-04-18 20:46:22, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:31, group_set:Settings, name:Fita 1, value:'),
(1000000000315, 4, '2013-04-18 20:46:33', 'Configs', 78, 'insert', 'id:78, created_at:2013-04-18 20:46:33, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:32, group_set:Settings, name:Fita 2, value:'),
(1000000000316, 4, '2013-04-18 20:46:49', 'Configs', 50, 'update', 'updated_by:=>4, sequence:40=>42'),
(1000000000317, 4, '2013-04-18 20:47:08', 'Configs', 79, 'insert', 'id:79, created_at:2013-04-18 20:47:08, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:40, group_set:Settings, name:Ponto do Cilindro, value:'),
(1000000000318, 4, '2013-04-18 20:47:24', 'Configs', 80, 'insert', 'id:80, created_at:2013-04-18 20:47:24, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:41, group_set:Settings, name:Ponto do Cilindro 2, value:'),
(1000000000319, 4, '2013-04-18 20:47:57', 'Configs', 53, 'update', 'updated_by:=>4, sequence:52=>53'),
(1000000000320, 4, '2013-04-18 20:48:07', 'Configs', 52, 'update', 'updated_by:=>4, sequence:51=>52'),
(1000000000321, 4, '2013-04-18 20:48:25', 'Configs', 81, 'insert', 'id:81, created_at:2013-04-18 20:48:25, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:51, group_set:Settings, name:Ponto do Disco 2, value:'),
(1000000000322, 4, '2013-04-18 20:50:13', 'FTP_Sets', 1, 'insert', 'id:1, created_by:4, created_at:2013-04-18 20:50:13, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:43, value:6 C'),
(1000000000323, 4, '2013-04-18 20:50:17', 'FTP_Sets', 2, 'insert', 'id:2, created_by:4, created_at:2013-04-18 20:50:17, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:44, value:100'),
(1000000000324, 4, '2013-04-18 20:50:18', 'FTP_Sets', 3, 'insert', 'id:3, created_by:4, created_at:2013-04-18 20:50:18, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:45, value:110'),
(1000000000325, 4, '2013-04-18 20:50:24', 'FTP_Sets', 4, 'insert', 'id:4, created_by:4, created_at:2013-04-18 20:50:24, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:46, value:120'),
(1000000000326, 4, '2013-04-18 20:50:29', 'FTP_Sets', 3, 'update', 'updated_by:=>4, value:110=>11.5'),
(1000000000327, 4, '2013-04-18 20:50:35', 'FTP_Sets', 5, 'insert', 'id:5, created_by:4, created_at:2013-04-18 20:50:35, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:47, value:130'),
(1000000000328, 4, '2013-04-18 20:50:38', 'FTP_Sets', 6, 'insert', 'id:6, created_by:4, created_at:2013-04-18 20:50:38, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:48, value:14.5'),
(1000000000329, 4, '2013-04-18 20:50:41', 'FTP_Sets', 7, 'insert', 'id:7, created_by:4, created_at:2013-04-18 20:50:41, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:49, value:16'),
(1000000000330, 4, '2013-04-18 20:50:43', 'FTP_Sets', 7, 'update', 'updated_by:=>4, value:16=>150'),
(1000000000331, 4, '2013-04-18 20:50:58', 'FTP_Sets', 8, 'insert', 'id:8, created_by:4, created_at:2013-04-18 20:50:58, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:77, value:40 Alpha'),
(1000000000332, 4, '2013-04-18 20:51:03', 'FTP_Sets', 9, 'insert', 'id:9, created_by:4, created_at:2013-04-18 20:51:03, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:78, value:40 Alpha'),
(1000000000333, 4, '2013-04-18 20:51:11', 'FTP_Sets', 10, 'insert', 'id:10, created_by:4, created_at:2013-04-18 20:51:11, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:79, value:9 C'),
(1000000000334, 4, '2013-04-18 20:51:17', 'FTP_Sets', 11, 'insert', 'id:11, created_by:4, created_at:2013-04-18 20:51:17, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:80, value:9B'),
(1000000000335, 4, '2013-04-18 20:51:23', 'FTP_Sets', 10, 'update', 'updated_by:=>4, value:9 C=>9C'),
(1000000000336, 4, '2013-04-18 20:51:30', 'FTP_Sets', 1, 'update', 'updated_by:=>4, value:6 C=>6C'),
(1000000000337, 4, '2013-04-18 20:51:40', 'FTP_Sets', 12, 'insert', 'id:12, created_by:4, created_at:2013-04-18 20:51:40, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:50, value:16.5'),
(1000000000338, 4, '2013-04-18 20:51:41', 'FTP_Sets', 13, 'insert', 'id:13, created_by:4, created_at:2013-04-18 20:51:41, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:51, value:17.5'),
(1000000000339, 4, '2013-04-18 20:51:44', 'FTP_Sets', 14, 'insert', 'id:14, created_by:4, created_at:2013-04-18 20:51:44, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:81, value:18.5'),
(1000000000340, 4, '2013-04-18 20:51:46', 'FTP_Sets', 15, 'insert', 'id:15, created_by:4, created_at:2013-04-18 20:51:46, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:52, value:19.5'),
(1000000000341, 4, '2013-04-18 20:51:48', 'FTP_Sets', 16, 'insert', 'id:16, created_by:4, created_at:2013-04-18 20:51:48, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:53, value:20.5'),
(1000000000342, 4, '2013-04-18 20:51:50', 'FTP_Sets', 17, 'insert', 'id:17, created_by:4, created_at:2013-04-18 20:51:50, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:54, value:51.5'),
(1000000000343, 4, '2013-04-18 20:51:52', 'FTP_Sets', 17, 'update', 'updated_by:=>4, value:51.5=>21.5'),
(1000000000344, 4, '2013-04-18 20:51:55', 'FTP_Sets', 18, 'insert', 'id:18, created_by:4, created_at:2013-04-18 20:51:55, updated_by:, updated_at:, status:Active, ftp_id:10001, setting_id:55, value:22.5'),
(1000000000345, 4, '2013-04-18 20:53:44', 'Configs', 79, 'update', 'updated_by:=>4, name:Ponto do Cilindro=>Ponto do Cilindro 1'),
(1000000000346, 4, '2013-04-18 20:53:51', 'Configs', 51, 'update', 'updated_by:=>4, name:Ponto do Disco=>Ponto do Disco 1'),
(1000000000347, 4, '2013-04-18 20:54:43', 'FTP_Sets', 8, 'update', 'updated_by:=>4, value:40 Alpha=>abcdefghijklmnopqrstuvwxyz'),
(1000000000348, 4, '2013-04-18 20:54:47', 'FTP_Sets', 9, 'update', 'updated_by:=>4, value:40 Alpha=>abcdefghijklmnopqrstuvwxyz'),
(1000000000349, 4, '2013-04-18 21:21:20', 'Threads', 1, 'insert', 'id:1, created_at:2013-04-18 21:21:20, created_by:4, updated_at:, updated_by:, status:Active, code:267, name:06/1 PAC Flame, thread_group:PA Card/Pent, thread_color:Cru, composition:50 Algodao'),
(1000000000350, 4, '2013-04-18 21:22:03', 'Threads', 2, 'insert', 'id:2, created_at:2013-04-18 21:22:03, created_by:4, updated_at:, updated_by:, status:Active, code:284, name:08/1 CO Card, thread_group:CO-CARD/PENT0, thread_color:Cru, composition:100 Algodao'),
(1000000000351, 4, '2013-04-18 21:26:53', 'Threads', 1, 'update', 'updated_by:=>4'),
(1000000000352, 4, '2013-04-18 21:28:00', 'Threads', 3, 'insert', 'id:3, created_at:2013-04-18 21:28:00, created_by:4, updated_at:, updated_by:, status:Active, code:281, name:10/1 CO Card OE, thread_group:Card/Pentado, thread_color:Cru, composition:100 Algodao'),
(1000000000353, 4, '2013-04-18 21:28:34', 'Threads', 2, 'update', 'updated_by:=>4, thread_group:CO-CARD/PENT0=>CO Cardado/Penteado'),
(1000000000354, 4, '2013-04-18 21:29:39', 'FTP_Sets', 19, 'insert', 'id:19, created_by:4, created_at:2013-04-18 21:29:39, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:43, value:4B'),
(1000000000355, 4, '2013-04-18 21:29:47', 'FTP_Sets', 20, 'insert', 'id:20, created_by:4, created_at:2013-04-18 21:29:47, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:44, value:210'),
(1000000000356, 4, '2013-04-18 21:29:51', 'FTP_Sets', 21, 'insert', 'id:21, created_by:4, created_at:2013-04-18 21:29:51, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:45, value:20.5'),
(1000000000357, 4, '2013-04-18 21:29:55', 'FTP_Sets', 22, 'insert', 'id:22, created_by:4, created_at:2013-04-18 21:29:55, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:46, value:220'),
(1000000000358, 4, '2013-04-18 21:29:59', 'FTP_Sets', 23, 'insert', 'id:23, created_by:4, created_at:2013-04-18 21:29:59, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:47, value:230'),
(1000000000359, 4, '2013-04-18 21:30:00', 'FTP_Sets', 24, 'insert', 'id:24, created_by:4, created_at:2013-04-18 21:30:00, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:48, value:24.5'),
(1000000000360, 4, '2013-04-18 21:30:06', 'FTP_Sets', 25, 'insert', 'id:25, created_by:4, created_at:2013-04-18 21:30:06, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:49, value:250'),
(1000000000361, 4, '2013-04-18 21:30:45', 'FTP_Sets', 26, 'insert', 'id:26, created_by:4, created_at:2013-04-18 21:30:45, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:77, value:abcde fghij klmno pqrst uvwxyz'),
(1000000000362, 4, '2013-04-18 21:30:47', 'FTP_Sets', 27, 'insert', 'id:27, created_by:4, created_at:2013-04-18 21:30:47, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:78, value:abcde fghij klmno pqrst uvwxyz'),
(1000000000363, 4, '2013-04-18 21:30:52', 'FTP_Sets', 28, 'insert', 'id:28, created_by:4, created_at:2013-04-18 21:30:52, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:79, value:26.5'),
(1000000000364, 4, '2013-04-18 21:30:54', 'FTP_Sets', 29, 'insert', 'id:29, created_by:4, created_at:2013-04-18 21:30:54, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:80, value:27.5'),
(1000000000365, 4, '2013-04-18 21:30:55', 'FTP_Sets', 30, 'insert', 'id:30, created_by:4, created_at:2013-04-18 21:30:55, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:50, value:28.5'),
(1000000000366, 4, '2013-04-18 21:30:57', 'FTP_Sets', 31, 'insert', 'id:31, created_by:4, created_at:2013-04-18 21:30:57, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:51, value:29.5'),
(1000000000367, 4, '2013-04-18 21:31:00', 'FTP_Sets', 32, 'insert', 'id:32, created_by:4, created_at:2013-04-18 21:31:00, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:81, value:30.5'),
(1000000000368, 4, '2013-04-18 21:31:02', 'FTP_Sets', 33, 'insert', 'id:33, created_by:4, created_at:2013-04-18 21:31:02, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:52, value:31.5'),
(1000000000369, 4, '2013-04-18 21:31:04', 'FTP_Sets', 34, 'insert', 'id:34, created_by:4, created_at:2013-04-18 21:31:04, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:53, value:32.5'),
(1000000000370, 4, '2013-04-18 21:31:06', 'FTP_Sets', 35, 'insert', 'id:35, created_by:4, created_at:2013-04-18 21:31:06, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:54, value:33.5'),
(1000000000371, 4, '2013-04-18 21:31:09', 'FTP_Sets', 36, 'insert', 'id:36, created_by:4, created_at:2013-04-18 21:31:09, updated_by:, updated_at:, status:Active, ftp_id:10003, setting_id:55, value:34.5'),
(1000000000372, 4, '2013-04-20 06:07:36', 'FTPs', 10001, 'update', 'composition:45 Algodao, 55 Polyester=>44 60, 56 61'),
(1000000000373, 4, '2013-04-20 06:08:07', 'FTPs', 10001, 'update', 'composition:44 60, 56 61=>44 68, 56 61'),
(1000000000374, 4, '2013-04-20 06:11:19', 'FTP_Sets', 1, 'update', 'value:6C=>6 Cima'),
(1000000000375, 4, '2013-04-20 07:03:17', 'FTPs', 10001, 'update', 'composition:44 68, 56 61=>44 60, 56 63'),
(1000000000376, 4, '2013-04-20 07:13:29', 'FTPs', 10001, 'update', 'composition:44 60, 56 63=>44 69, 56 63'),
(1000000000377, 4, '2013-04-20 07:15:03', 'FTPs', 10001, 'update', 'composition:44 69, 56 63=>44 Algodao, 56 Acrilico'),
(1000000000378, 4, '2013-04-20 07:15:25', 'FTPs', 10001, 'update', 'composition:44 Algodao, 56 Acrilico=>44 Algodao, 56 Polyester'),
(1000000000379, 4, '2013-04-20 07:17:30', 'Controls', 1000000263, 'update', 'value:10010=>130010'),
(1000000000380, 4, '2013-04-20 07:17:38', 'Controls', 1000000263, 'update', 'value:130010=>130001'),
(1000000000381, 4, '2013-04-20 07:17:55', 'FTPs', 130001, 'insert', 'id:130001, created_by:4, created_at:2013-04-20 07:17:55, updated_by:, updated_at:, status:Active, code:130001, product_id:, machine_id:4, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000382, 4, '2013-04-20 07:26:24', 'FTP_Sets', 10, 'update', 'value:9C=>9 cima'),
(1000000000383, 4, '2013-04-20 07:26:30', 'FTP_Sets', 11, 'update', 'updated_by:=>4, value:9B=>9 baixo'),
(1000000000384, 4, '2013-04-20 07:26:34', 'FTP_Sets', 1, 'update', 'value:6 Cima=>6 cima'),
(1000000000385, 4, '2013-04-20 07:31:58', 'FTPs', 10001, 'update', 'composition:44 Algodao, 56 Polyester=>44 Elastano, 56 Polyester'),
(1000000000386, 4, '2013-04-20 07:32:02', 'FTPs', 10001, 'update', 'composition:44 Elastano, 56 Polyester=>44 Algodao, 56 Polyester'),
(1000000000387, 4, '2013-04-20 07:44:56', 'FTPs', 130002, 'insert', 'id:130002, created_by:4, created_at:2013-04-20 07:44:56, updated_by:, updated_at:, status:Active, code:130002, product_id:, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000388, 4, '2013-04-20 10:08:55', 'FTPs', 10009, 'delete', 'id:10009, created_by:4, created_at:2013-04-16 19:32:29, updated_by:, updated_at:, status:Active, code:10009, product_id:, machine_id:2, diameter:700, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000389, 4, '2013-04-20 10:09:03', 'FTPs', 10008, 'delete', 'id:10008, created_by:4, created_at:2013-04-16 19:30:43, updated_by:, updated_at:, status:Active, code:10008, product_id:, machine_id:4, diameter:600, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000390, 4, '2013-04-20 10:09:11', 'FTPs', 10007, 'delete', 'id:10007, created_by:4, created_at:2013-04-16 19:29:15, updated_by:, updated_at:, status:Active, code:10007, product_id:, machine_id:3, diameter:500, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000391, 4, '2013-04-20 10:12:56', 'FTPs', 130002, 'delete', 'id:130002, created_by:4, created_at:2013-04-20 07:44:56, updated_by:, updated_at:, status:Active, code:130002, product_id:, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000392, 4, '2013-04-20 10:13:03', 'FTPs', 130003, 'insert', 'id:130003, created_by:4, created_at:2013-04-20 10:13:03, updated_by:, updated_at:, status:Active, code:130003, product_id:, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, has_break:No, composition:, draw:, photo:'),
(1000000000393, 4, '2013-04-20 15:11:06', 'FTPs', 10001, 'update', 'has_break:No=>Yes'),
(1000000000394, 4, '2013-04-20 15:27:32', 'FTPs', 130004, 'insert', 'id:130004, created_by:4, created_at:2013-04-20 15:27:32, updated_by:, updated_at:, status:Active, code:130004, product_id:, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000395, 4, '2013-04-20 15:45:28', 'FTPs', 10001, 'update', 'composition:44 Algodao, 56 Polyester=>44 Algodao, 46 Polyester, 10 Acrilico'),
(1000000000396, 4, '2013-04-20 15:45:36', 'FTPs', 10001, 'update', 'composition:44 Algodao, 46 Polyester, 10 Acrilico=>44 Algodao, 46 Elastano, 10 Acrilico'),
(1000000000397, 4, '2013-04-20 15:45:39', 'FTPs', 10001, 'update', 'composition:44 Algodao, 46 Elastano, 10 Acrilico=>44 Algodao, 46 Elastano, 10 Polyester'),
(1000000000398, 4, '2013-04-20 15:46:09', 'FTPs', 130001, 'update', 'updated_by:=>4, composition:=>100 Acrilico'),
(1000000000399, 4, '2013-04-20 15:46:13', 'FTPs', 130001, 'update', 'composition:100 Acrilico=>100 Algodao'),
(1000000000400, 4, '2013-04-20 15:46:28', 'FTPs', 130001, 'update', 'composition:100 Algodao=>40 Algodao, 60 Acrilico'),
(1000000000401, 4, '2013-04-20 15:46:49', 'FTPs', 130001, 'update', 'composition:40 Algodao, 60 Acrilico=>40 Algodao, 60 Polyester'),
(1000000000402, 4, '2013-04-20 15:55:17', 'FTPs', 130004, 'update', 'updated_by:=>4, composition:=>50 Algodao, 40 Elastano, 10 Acrilico'),
(1000000000403, 4, '2013-04-20 15:55:24', 'FTPs', 130004, 'update', 'composition:50 Algodao, 40 Elastano, 10 Acrilico=>50 Algodao, 40 Elastano, 10 Polyester'),
(1000000000404, 4, '2013-04-20 16:16:51', 'FTPs', 10001, 'update', 'composition:44 Algodao, 46 Elastano, 10 Polyester=>44 Algodao, 56 Elastano'),
(1000000000405, 4, '2013-04-20 16:20:59', 'FTPs', 10001, 'update', 'composition:44 Algodao, 56 Elastano=>44 Algodao, 46 Elastano, 10 Acrilico'),
(1000000000406, 4, '2013-04-20 16:21:09', 'FTPs', 10001, 'update', 'composition:44 Algodao, 46 Elastano, 10 Acrilico=>44 Algodao, 56 Elastano'),
(1000000000407, 4, '2013-04-20 16:21:46', 'FTPs', 10001, 'update', 'composition:44 Algodao, 56 Elastano=>44 Algodao, 46 Elastano, 10 Acrilico, 0 Acrilico'),
(1000000000408, 4, '2013-04-20 16:21:49', 'FTPs', 10001, 'update', 'composition:44 Algodao, 46 Elastano, 10 Acrilico, 0 Acrilico=>44 Algodao, 46 Elastano, 10 Acrilico'),
(1000000000409, 4, '2013-04-20 20:40:38', 'FTP_Threads', 1, 'update', 'updated_by:=>4'),
(1000000000410, 4, '2013-04-20 20:40:38', 'FTP_Threads', 2, 'update', 'updated_by:=>4'),
(1000000000411, 4, '2013-04-20 20:40:38', 'FTP_Threads', 3, 'update', 'updated_by:=>4'),
(1000000000412, 4, '2013-04-20 20:41:19', 'FTP_Threads', 3, 'update', 'percent:40.00=>50.00'),
(1000000000413, 4, '2013-04-20 20:41:19', 'FTP_Threads', 2, 'update', 'percent:35.00=>25.00'),
(1000000000414, 4, '2013-04-20 21:02:45', 'FTPs', 10001, 'update', 'composition:44 Algodao, 46 Elastano, 10 Acrilico=>44 Acrilico, 46 Elastano, 10 Acrilico'),
(1000000000415, 4, '2013-04-20 21:02:51', 'FTPs', 10001, 'update', 'composition:44 Acrilico, 46 Elastano, 10 Acrilico=>44 Algodao, 46 Elastano, 10 Acrilico'),
(1000000000416, 4, '2013-04-20 21:09:50', 'FTP_Threads', 3, 'update', 'thread_id:3=>4'),
(1000000000417, 4, '2013-04-20 21:10:08', 'FTP_Threads', 3, 'update', 'percent:50.00=>40.00'),
(1000000000418, 4, '2013-04-20 21:10:21', 'FTP_Threads', 3, 'update', 'percent:40.00=>50.00'),
(1000000000419, 4, '2013-04-20 21:10:41', 'FTP_Threads', 1, 'update', 'percent:25.00=>20.00'),
(1000000000420, 4, '2013-04-20 21:10:48', 'FTP_Threads', 2, 'update', 'percent:25.00=>30.00'),
(1000000000421, 4, '2013-04-20 21:10:54', 'FTP_Threads', 3, 'update', 'percent:50.00=>40.00'),
(1000000000422, 4, '2013-04-20 21:11:00', 'FTP_Threads', 3, 'update', 'thread_id:4=>3'),
(1000000000423, 4, '2013-04-20 21:11:12', 'FTP_Threads', 4, 'insert', 'id:4, created_by:4, created_at:2013-04-20 21:11:12, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000424, 4, '2013-04-20 21:14:16', 'FTP_Threads', 4, 'delete', 'id:4, created_by:4, created_at:2013-04-20 21:11:12, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000425, 4, '2013-04-20 21:15:17', 'FTP_Threads', 5, 'insert', 'id:5, created_by:4, created_at:2013-04-20 21:15:17, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000426, 4, '2013-04-20 21:15:36', 'FTP_Threads', 5, 'update', 'updated_by:=>4, thread_id:=>4, percent:0.00=>10.00'),
(1000000000427, 4, '2013-04-20 21:21:16', 'FTP_Threads', 5, 'delete', 'id:5, created_by:4, created_at:2013-04-20 21:15:17, updated_by:4, updated_at:2013-04-20 21:20:56, status:Active, ftp_id:10001, thread_id:4, percent:10.00'),
(1000000000428, 4, '2013-04-20 21:21:21', 'FTP_Threads', 3, 'delete', 'id:3, created_by:, created_at:, updated_by:4, updated_at:2013-04-20 21:11:00, status:Active, ftp_id:10001, thread_id:3, percent:40.00'),
(1000000000429, 4, '2013-04-20 21:22:35', 'FTP_Threads', 6, 'insert', 'id:6, created_by:4, created_at:2013-04-20 21:22:35, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000430, 4, '2013-04-20 21:23:22', 'FTP_Threads', 6, 'update', 'updated_by:=>4, thread_id:=>4, percent:0.00=>50.00'),
(1000000000431, 4, '2013-04-21 06:02:16', 'FTPs', 10001, 'update', 'composition:44 Algodao, 46 Elastano, 10 Acrilico=>44 Algodao, 46 Elastano, 10 Nylon'),
(1000000000432, 4, '2013-04-21 06:02:27', 'FTPs', 10001, 'update', 'composition:44 Algodao, 46 Elastano, 10 Nylon=>44 Algodao, 46 Nylon, 10 Nylon'),
(1000000000433, 4, '2013-04-21 06:02:37', 'FTPs', 10001, 'update', 'composition:44 Algodao, 46 Nylon, 10 Nylon=>44 Algodao, 46 Elastano, 10 Nylon'),
(1000000000434, 4, '2013-04-21 06:02:52', 'FTPs', 10001, 'update', 'composition:44 Algodao, 46 Elastano, 10 Nylon=>46 Elastano, 54 Nylon'),
(1000000000435, 4, '2013-04-21 06:03:31', 'FTPs', 10001, 'update', 'composition:46 Elastano, 54 Nylon=>46 Elastano, 0 Nylon, 54 Acrilico'),
(1000000000436, 4, '2013-04-21 06:03:38', 'FTPs', 10001, 'update', 'composition:46 Elastano, 0 Nylon, 54 Acrilico=>46 Elastano, 54 Acrilico'),
(1000000000437, 4, '2013-04-21 06:03:52', 'FTP_Threads', 7, 'insert', 'id:7, created_by:4, created_at:2013-04-21 06:03:52, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000438, 4, '2013-04-21 06:04:26', 'FTP_Threads', 7, 'update', 'updated_by:=>4, thread_id:=>3, percent:0.00=>10.00'),
(1000000000439, 4, '2013-04-21 06:09:26', 'FTP_Threads', 8, 'insert', 'id:8, created_by:4, created_at:2013-04-21 06:09:26, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000440, 4, '2013-04-21 06:09:59', 'FTP_Threads', 8, 'delete', 'id:8, created_by:4, created_at:2013-04-21 06:09:26, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000441, 4, '2013-04-21 06:12:21', 'FTP_Threads', 7, 'delete', 'id:7, created_by:4, created_at:2013-04-21 06:03:52, updated_by:4, updated_at:2013-04-21 06:04:26, status:Active, ftp_id:10001, thread_id:3, percent:10.00'),
(1000000000442, 4, '2013-04-21 06:13:18', 'FTP_Threads', 6, 'delete', 'id:6, created_by:4, created_at:2013-04-20 21:22:35, updated_by:4, updated_at:2013-04-20 21:23:22, status:Active, ftp_id:10001, thread_id:4, percent:50.00'),
(1000000000443, 4, '2013-04-21 06:15:06', 'FTP_Threads', 9, 'insert', 'id:9, created_by:4, created_at:2013-04-21 06:15:06, updated_by:, updated_at:, status:Active, ftp_id:10003, thread_id:, percent:0.00'),
(1000000000444, 4, '2013-04-21 06:15:13', 'FTP_Threads', 9, 'update', 'updated_by:=>4, thread_id:=>1, percent:0.00=>100.00'),
(1000000000445, 4, '2013-04-21 06:15:14', 'FTP_Threads', 10, 'insert', 'id:10, created_by:4, created_at:2013-04-21 06:15:14, updated_by:, updated_at:, status:Active, ftp_id:10003, thread_id:, percent:0.00'),
(1000000000446, 4, '2013-04-21 06:15:27', 'FTP_Threads', 10, 'update', 'updated_by:=>4, thread_id:=>2, percent:0.00=>50.00'),
(1000000000447, 4, '2013-04-21 06:15:41', 'FTP_Threads', 9, 'update', 'percent:100.00=>50.00'),
(1000000000448, 4, '2013-04-21 06:15:54', 'FTP_Threads', 9, 'update', 'thread_id:1=>3'),
(1000000000449, 4, '2013-04-21 06:16:01', 'FTP_Threads', 9, 'update', 'thread_id:3=>1'),
(1000000000450, 4, '2013-04-21 06:18:55', 'FTP_Threads', 11, 'insert', 'id:11, created_by:4, created_at:2013-04-21 06:18:55, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000451, 4, '2013-04-21 06:19:50', 'FTP_Threads', 12, 'insert', 'id:12, created_by:4, created_at:2013-04-21 06:19:50, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000452, 4, '2013-04-21 06:21:12', 'FTP_Threads', 12, 'delete', 'id:12, created_by:4, created_at:2013-04-21 06:19:50, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000453, 4, '2013-04-21 06:21:18', 'FTP_Threads', 11, 'delete', 'id:11, created_by:4, created_at:2013-04-21 06:18:55, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000454, 4, '2013-04-21 06:24:48', 'FTPs', 10001, 'update', 'composition:46 Elastano, 54 Acrilico=>46 Elastano, 44 Acrilico, 10 Acrilico'),
(1000000000455, 4, '2013-04-21 06:25:42', 'FTP_Threads', 13, 'insert', 'id:13, created_by:4, created_at:2013-04-21 06:25:42, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000456, 4, '2013-04-21 06:25:48', 'FTP_Threads', 14, 'insert', 'id:14, created_by:4, created_at:2013-04-21 06:25:48, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000457, 4, '2013-04-21 06:25:55', 'FTP_Threads', 13, 'delete', 'id:13, created_by:4, created_at:2013-04-21 06:25:42, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000458, 4, '2013-04-21 06:26:01', 'FTP_Threads', 14, 'delete', 'id:14, created_by:4, created_at:2013-04-21 06:25:48, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000459, 4, '2013-04-21 06:26:09', 'FTP_Threads', 2, 'update', 'percent:30.00=>80.00'),
(1000000000460, 4, '2013-04-21 06:26:11', 'FTP_Threads', 15, 'insert', 'id:15, created_by:4, created_at:2013-04-21 06:26:11, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000461, 4, '2013-04-21 06:26:12', 'FTP_Threads', 16, 'insert', 'id:16, created_by:4, created_at:2013-04-21 06:26:12, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000462, 4, '2013-04-21 06:26:19', 'FTP_Threads', 2, 'update', 'percent:80.00=>40.00'),
(1000000000463, 4, '2013-04-21 06:26:51', 'FTP_Threads', 15, 'update', 'updated_by:=>4, thread_id:=>4, percent:0.00=>40.00'),
(1000000000464, 4, '2013-04-21 06:26:55', 'FTP_Threads', 16, 'delete', 'id:16, created_by:4, created_at:2013-04-21 06:26:12, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000465, 4, '2013-04-21 06:34:07', 'FTPs', 10001, 'update', 'composition:46 Elastano, 44 Acrilico, 10 Acrilico=>46 Elastano, 54 Acrilico'),
(1000000000466, 4, '2013-04-21 06:34:21', 'FTP_Threads', 17, 'insert', 'id:17, created_by:4, created_at:2013-04-21 06:34:21, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000467, 4, '2013-04-21 06:34:26', 'FTP_Threads', 18, 'insert', 'id:18, created_by:4, created_at:2013-04-21 06:34:26, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000468, 4, '2013-04-21 06:35:14', 'FTP_Threads', 18, 'delete', 'id:18, created_by:4, created_at:2013-04-21 06:34:26, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000469, 4, '2013-04-21 06:35:25', 'FTP_Threads', 17, 'delete', 'id:17, created_by:4, created_at:2013-04-21 06:34:21, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000470, 4, '2013-04-21 06:35:30', 'FTP_Threads', 15, 'update', 'thread_id:4=>'),
(1000000000471, 4, '2013-04-21 06:36:40', 'FTP_Threads', 15, 'update', 'thread_id:=>3'),
(1000000000472, 4, '2013-04-21 07:31:41', 'FTP_Loads', 5, 'insert', 'id:5, created_by:4, created_at:2013-04-21 07:31:41, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000473, 4, '2013-04-21 07:33:48', 'FTP_Loads', 6, 'insert', 'id:6, created_by:4, created_at:2013-04-21 07:33:48, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000474, 4, '2013-04-21 07:33:51', 'FTP_Loads', 6, 'delete', 'id:6, created_by:4, created_at:2013-04-21 07:33:48, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000475, 4, '2013-04-21 07:33:52', 'FTP_Loads', 5, 'delete', 'id:5, created_by:4, created_at:2013-04-21 07:31:41, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000476, 4, '2013-04-21 07:33:54', 'FTP_Loads', 7, 'insert', 'id:7, created_by:4, created_at:2013-04-21 07:33:54, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000477, 4, '2013-04-21 07:34:50', 'FTP_Loads', 8, 'insert', 'id:8, created_by:4, created_at:2013-04-21 07:34:50, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000478, 4, '2013-04-21 07:34:52', 'FTP_Loads', 8, 'delete', 'id:8, created_by:4, created_at:2013-04-21 07:34:50, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000479, 4, '2013-04-21 07:34:53', 'FTP_Loads', 7, 'delete', 'id:7, created_by:4, created_at:2013-04-21 07:33:54, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000480, 4, '2013-04-21 07:35:39', 'FTP_Loads', 4, 'delete', 'id:4, created_by:, created_at:, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:1, first_thread_id:1, second_number:1, second_thread_id:4'),
(1000000000481, 4, '2013-04-21 07:37:31', 'FTP_Loads', 3, 'update', 'updated_by:=>4, second_thread_id:3=>4'),
(1000000000482, 4, '2013-04-21 07:39:56', 'FTP_Loads', 9, 'insert', 'id:9, created_by:4, created_at:2013-04-21 07:39:56, updated_by:, updated_at:, status:Active, ftp_id:10005, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000483, 4, '2013-04-21 07:40:00', 'FTP_Threads', 19, 'insert', 'id:19, created_by:4, created_at:2013-04-21 07:40:00, updated_by:, updated_at:, status:Active, ftp_id:10005, thread_id:, percent:0.00'),
(1000000000484, 4, '2013-04-21 08:40:34', 'FTP_Loads', 10, 'insert', 'id:10, created_by:4, created_at:2013-04-21 08:40:34, updated_by:, updated_at:, status:Active, ftp_id:10003, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000485, 4, '2013-04-21 08:43:26', 'FTP_Loads', 3, 'update', 'second_thread_id:4=>1'),
(1000000000486, 4, '2013-04-21 08:43:29', 'FTP_Loads', 3, 'update', 'second_thread_id:1=>15'),
(1000000000487, 4, '2013-04-21 08:44:41', 'FTP_Loads', 3, 'update', 'second_thread_id:15=>1'),
(1000000000488, 4, '2013-04-21 08:45:07', 'FTP_Loads', 3, 'update', 'second_thread_id:1=>15'),
(1000000000489, 4, '2013-04-21 08:47:23', 'FTP_Loads', 3, 'update', 'second_thread_id:15=>2'),
(1000000000490, 4, '2013-04-21 08:48:20', 'FTP_Loads', 3, 'update', 'second_thread_id:2=>1'),
(1000000000491, 4, '2013-04-21 08:48:27', 'FTP_Loads', 1, 'update', 'updated_by:=>4, second_thread_id:2=>'),
(1000000000492, 4, '2013-04-21 08:48:34', 'FTP_Loads', 1, 'update', 'second_thread_id:=>15'),
(1000000000493, 4, '2013-04-21 08:48:40', 'FTP_Loads', 1, 'update', 'second_thread_id:15=>2'),
(1000000000494, 4, '2013-04-21 08:48:49', 'FTP_Loads', 11, 'insert', 'id:11, created_by:4, created_at:2013-04-21 08:48:49, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000495, 4, '2013-04-21 08:48:55', 'FTP_Loads', 3, 'delete', 'id:3, created_by:, created_at:, updated_by:4, updated_at:2013-04-21 08:48:20, status:Active, ftp_id:10001, first_number:1, first_thread_id:1, second_number:1, second_thread_id:1'),
(1000000000496, 4, '2013-04-21 08:49:02', 'FTP_Loads', 11, 'update', 'updated_by:=>4, first_number:0=>1'),
(1000000000497, 4, '2013-04-21 08:49:07', 'FTP_Loads', 11, 'update', 'first_thread_id:=>1'),
(1000000000498, 4, '2013-04-21 08:49:09', 'FTP_Loads', 11, 'update', 'second_number:0=>2'),
(1000000000499, 4, '2013-04-21 08:49:13', 'FTP_Loads', 11, 'update', 'second_thread_id:=>15'),
(1000000000500, 4, '2013-04-21 08:49:24', 'FTP_Loads', 11, 'update', 'second_thread_id:15=>1'),
(1000000000501, 4, '2013-04-21 08:49:48', 'FTP_Threads', 20, 'insert', 'id:20, created_by:4, created_at:2013-04-21 08:49:48, updated_by:, updated_at:, status:Active, ftp_id:10003, thread_id:, percent:0.00'),
(1000000000502, 4, '2013-04-21 08:49:51', 'FTP_Threads', 20, 'update', 'updated_by:=>4, percent:0.00=>10.00'),
(1000000000503, 4, '2013-04-21 08:50:01', 'FTP_Threads', 21, 'insert', 'id:21, created_by:4, created_at:2013-04-21 08:50:01, updated_by:, updated_at:, status:Active, ftp_id:10003, thread_id:, percent:0.00'),
(1000000000504, 4, '2013-04-21 08:50:05', 'FTP_Loads', 12, 'insert', 'id:12, created_by:4, created_at:2013-04-21 08:50:05, updated_by:, updated_at:, status:Active, ftp_id:10003, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000505, 4, '2013-04-21 08:50:33', 'FTP_Threads', 21, 'update', 'updated_by:=>4, percent:0.00=>20.00'),
(1000000000506, 4, '2013-04-21 08:50:37', 'FTP_Threads', 10, 'update', 'percent:50.00=>20.00'),
(1000000000507, 4, '2013-04-21 08:50:37', 'FTP_Threads', 22, 'insert', 'id:22, created_by:4, created_at:2013-04-21 08:50:37, updated_by:, updated_at:, status:Active, ftp_id:10003, thread_id:, percent:0.00'),
(1000000000508, 4, '2013-04-21 08:50:41', 'FTP_Threads', 22, 'delete', 'id:22, created_by:4, created_at:2013-04-21 08:50:37, updated_by:, updated_at:, status:Active, ftp_id:10003, thread_id:, percent:0.00'),
(1000000000509, 4, '2013-04-21 08:50:59', 'FTP_Loads', 12, 'update', 'updated_by:=>4, first_thread_id:=>10, second_thread_id:=>21'),
(1000000000510, 4, '2013-04-21 08:51:05', 'FTP_Loads', 12, 'update', 'first_number:0=>1'),
(1000000000511, 4, '2013-04-21 08:51:08', 'FTP_Loads', 12, 'update', 'second_number:0=>2'),
(1000000000512, 4, '2013-04-21 08:51:11', 'FTP_Loads', 12, 'update', 'second_thread_id:21=>10'),
(1000000000513, 4, '2013-04-21 08:51:13', 'FTP_Loads', 12, 'update', 'first_thread_id:10=>9'),
(1000000000514, 4, '2013-04-21 08:51:41', 'FTP_Threads', 21, 'delete', 'id:21, created_by:4, created_at:2013-04-21 08:50:01, updated_by:4, updated_at:2013-04-21 08:50:33, status:Active, ftp_id:10003, thread_id:, percent:20.00'),
(1000000000515, 4, '2013-04-21 08:51:42', 'FTP_Threads', 20, 'delete', 'id:20, created_by:4, created_at:2013-04-21 08:49:48, updated_by:4, updated_at:2013-04-21 08:49:51, status:Active, ftp_id:10003, thread_id:, percent:10.00'),
(1000000000516, 4, '2013-04-21 08:51:47', 'FTP_Threads', 9, 'update', 'percent:50.00=>80.00'),
(1000000000517, 4, '2013-04-21 09:01:07', 'Configs', 82, 'insert', 'id:82, created_at:2013-04-21 09:01:07, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:Machine Families, value:'),
(1000000000518, 4, '2013-04-21 09:01:16', 'Configs', 83, 'insert', 'id:83, created_at:2013-04-21 09:01:16, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Machine Families, name:Family 1, value:'),
(1000000000519, 4, '2013-04-21 09:01:23', 'Configs', 84, 'insert', 'id:84, created_at:2013-04-21 09:01:23, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Machine Families, name:Family 2, value:'),
(1000000000520, 4, '2013-04-21 09:01:29', 'Configs', 85, 'insert', 'id:85, created_at:2013-04-21 09:01:29, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Machine Families, name:Family 3, value:'),
(1000000000521, 4, '2013-04-21 09:02:42', 'Machines', 1, 'update', 'machine_family:=>Family 1, machine_brand:BRAND1=>Brand1'),
(1000000000522, 4, '2013-04-21 09:02:52', 'Machines', 3, 'update', 'machine_family:=>Family 2, machine_brand:BRAND3=>Brand2'),
(1000000000523, 4, '2013-04-21 09:03:03', 'Machines', 2, 'update', 'machine_family:=>Family 2, machine_brand:BRAND2=>Brand2'),
(1000000000524, 4, '2013-04-21 09:03:13', 'Machines', 4, 'update', 'machine_family:=>Family 3, machine_brand:BRAND2=>Brand3'),
(1000000000525, 4, '2013-04-21 14:16:35', 'FTPs', 10001, 'update', 'composition:46 Elastano, 54 Acrilico=>30 Elastano, 50 Acrilico, 20 Acrilico'),
(1000000000526, 4, '2013-04-21 14:19:09', 'FTP_Threads', 23, 'insert', 'id:23, created_by:4, created_at:2013-04-21 14:19:09, updated_by:, updated_at:, status:Active, ftp_id:130004, thread_id:, percent:0.00'),
(1000000000527, 4, '2013-04-21 14:19:14', 'FTP_Threads', 23, 'update', 'updated_by:=>4, percent:0.00=>400.00'),
(1000000000528, 4, '2013-04-21 14:19:16', 'FTP_Threads', 23, 'update', 'percent:400.00=>40.00'),
(1000000000529, 4, '2013-04-21 14:19:21', 'FTP_Threads', 23, 'update', 'thread_id:=>1'),
(1000000000530, 4, '2013-04-21 14:19:23', 'FTP_Threads', 24, 'insert', 'id:24, created_by:4, created_at:2013-04-21 14:19:23, updated_by:, updated_at:, status:Active, ftp_id:130004, thread_id:, percent:0.00'),
(1000000000531, 4, '2013-04-21 14:19:27', 'FTP_Threads', 24, 'update', 'updated_by:=>4, percent:0.00=>20.00'),
(1000000000532, 4, '2013-04-21 14:19:31', 'FTP_Threads', 24, 'update', 'thread_id:=>2'),
(1000000000533, 4, '2013-04-21 14:19:32', 'FTP_Threads', 25, 'insert', 'id:25, created_by:4, created_at:2013-04-21 14:19:32, updated_by:, updated_at:, status:Active, ftp_id:130004, thread_id:, percent:0.00'),
(1000000000534, 4, '2013-04-21 14:19:34', 'FTP_Threads', 25, 'update', 'updated_by:=>4, percent:0.00=>20.00'),
(1000000000535, 4, '2013-04-21 14:19:36', 'FTP_Threads', 25, 'update', 'thread_id:=>3'),
(1000000000536, 4, '2013-04-21 14:19:38', 'FTP_Threads', 26, 'insert', 'id:26, created_by:4, created_at:2013-04-21 14:19:38, updated_by:, updated_at:, status:Active, ftp_id:130004, thread_id:, percent:0.00'),
(1000000000537, 4, '2013-04-21 14:19:42', 'FTP_Threads', 26, 'update', 'updated_by:=>4, percent:0.00=>20.00'),
(1000000000538, 4, '2013-04-21 14:19:54', 'FTP_Threads', 26, 'update', 'thread_id:=>4'),
(1000000000539, 4, '2013-04-21 14:20:10', 'FTP_Loads', 13, 'insert', 'id:13, created_by:4, created_at:2013-04-21 14:20:10, updated_by:, updated_at:, status:Active, ftp_id:130004, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000540, 4, '2013-04-21 14:20:18', 'FTP_Loads', 13, 'update', 'updated_by:=>4, first_number:0=>1'),
(1000000000541, 4, '2013-04-21 14:20:19', 'FTP_Loads', 13, 'update', 'first_thread_id:=>23'),
(1000000000542, 4, '2013-04-21 14:20:25', 'FTP_Loads', 13, 'update', 'second_number:0=>1'),
(1000000000543, 4, '2013-04-21 14:21:00', 'FTP_Loads', 13, 'update', 'second_thread_id:=>24'),
(1000000000544, 4, '2013-04-21 14:21:01', 'FTP_Loads', 14, 'insert', 'id:14, created_by:4, created_at:2013-04-21 14:21:01, updated_by:, updated_at:, status:Active, ftp_id:130004, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000545, 4, '2013-04-21 14:21:04', 'FTP_Loads', 14, 'update', 'updated_by:=>4, first_number:0=>1'),
(1000000000546, 4, '2013-04-21 14:21:05', 'FTP_Loads', 14, 'update', 'first_thread_id:=>23'),
(1000000000547, 4, '2013-04-21 14:21:22', 'FTP_Loads', 15, 'insert', 'id:15, created_by:4, created_at:2013-04-21 14:21:22, updated_by:, updated_at:, status:Active, ftp_id:130004, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000548, 4, '2013-04-21 14:21:26', 'FTP_Loads', 15, 'update', 'updated_by:=>4, first_number:0=>1'),
(1000000000549, 4, '2013-04-21 14:21:26', 'FTP_Loads', 15, 'update', 'first_thread_id:=>23'),
(1000000000550, 4, '2013-04-21 14:21:30', 'FTP_Loads', 15, 'update', 'second_number:0=>3'),
(1000000000551, 4, '2013-04-21 14:21:32', 'FTP_Loads', 14, 'update', 'second_number:0=>2'),
(1000000000552, 4, '2013-04-21 14:21:37', 'FTP_Loads', 14, 'update', 'second_thread_id:=>25'),
(1000000000553, 4, '2013-04-21 14:21:43', 'FTP_Loads', 15, 'update', 'second_thread_id:=>26'),
(1000000000554, 4, '2013-04-21 15:56:22', 'FTPs', 130004, 'update', 'composition:50 Algodao, 40 Elastano, 10 Polyester=>60 Algodao, 40 Elastano'),
(1000000000555, 4, '2013-04-21 15:57:17', 'FTPs', 130004, 'update', 'composition:60 Algodao, 40 Elastano=>60 Algodao, 39 Elastano, 1 Acrilico, 0 Acrilico, 0 Acrilico'),
(1000000000556, 4, '2013-04-21 15:57:21', 'FTPs', 130004, 'update', 'composition:60 Algodao, 39 Elastano, 1 Acrilico, 0 Acrilico, 0 Acrilico=>60 Algodao, 39 Elastano, 1 Acrilico, 0 Acrilico'),
(1000000000557, 4, '2013-04-21 15:57:24', 'FTPs', 130004, 'update', 'composition:60 Algodao, 39 Elastano, 1 Acrilico, 0 Acrilico=>60 Algodao, 39 Elastano, 1 Acrilico'),
(1000000000558, 4, '2013-04-21 15:57:33', 'FTPs', 130004, 'update', 'composition:60 Algodao, 39 Elastano, 1 Acrilico=>60 Algodao, 40 Elastano'),
(1000000000559, 4, '2013-04-21 15:57:49', 'FTPs', 130004, 'update', 'composition:60 Algodao, 40 Elastano=>100 Acrilico'),
(1000000000560, 4, '2013-04-21 16:01:44', 'FTPs', 130005, 'insert', 'id:130005, created_by:4, created_at:2013-04-21 16:01:44, updated_by:, updated_at:, status:Active, code:130005, product_id:, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000561, 4, '2013-04-21 16:07:23', 'FTPs', 130006, 'insert', 'id:130006, created_by:4, created_at:2013-04-21 16:07:23, updated_by:, updated_at:, status:Active, code:130006, product_id:, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000562, 4, '2013-04-21 16:08:02', 'FTPs', 130007, 'insert', 'id:130007, created_by:4, created_at:2013-04-21 16:08:02, updated_by:, updated_at:, status:Active, code:130007, product_id:, machine_id:1, diameter:999, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000563, 4, '2013-04-21 16:09:05', 'FTPs', 130008, 'insert', 'id:130008, created_by:4, created_at:2013-04-21 16:09:05, updated_by:, updated_at:, status:Active, code:130008, product_id:, machine_id:1, diameter:8, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000564, 4, '2013-04-21 16:13:41', 'FTPs', 130009, 'insert', 'id:130009, created_by:4, created_at:2013-04-21 16:13:41, updated_by:, updated_at:, status:Active, code:130009, product_id:, machine_id:1, diameter:9, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000565, 4, '2013-04-21 16:14:10', 'FTPs', 130010, 'insert', 'id:130010, created_by:4, created_at:2013-04-21 16:14:10, updated_by:, updated_at:, status:Active, code:130010, product_id:, machine_id:1, diameter:10, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000566, 4, '2013-04-21 16:14:36', 'FTPs', 130011, 'insert', 'id:130011, created_by:4, created_at:2013-04-21 16:14:36, updated_by:, updated_at:, status:Active, code:130011, product_id:, machine_id:1, diameter:11, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000567, 4, '2013-04-21 16:15:34', 'FTPs', 130012, 'insert', 'id:130012, created_by:4, created_at:2013-04-21 16:15:34, updated_by:, updated_at:, status:Active, code:130012, product_id:, machine_id:1, diameter:12, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000568, 4, '2013-04-21 16:17:57', 'FTPs', 130013, 'insert', 'id:130013, created_by:4, created_at:2013-04-21 16:17:57, updated_by:, updated_at:, status:Active, code:130013, product_id:, machine_id:1, diameter:13, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000569, 4, '2013-04-21 16:18:57', 'FTPs', 130014, 'insert', 'id:130014, created_by:4, created_at:2013-04-21 16:18:57, updated_by:, updated_at:, status:Active, code:130014, product_id:, machine_id:1, diameter:14, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000570, 4, '2013-04-21 16:19:16', 'FTPs', 130014, 'update', 'updated_by:=>4');
INSERT INTO `history` (`id`, `created_by`, `created_at`, `parent_name`, `parent_id`, `method`, `history`) VALUES
(1000000000571, 4, '2013-04-21 16:19:32', 'FTPs', 130015, 'insert', 'id:130015, created_by:4, created_at:2013-04-21 16:19:32, updated_by:, updated_at:, status:Active, code:130015, product_id:, machine_id:1, diameter:15, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000572, 4, '2013-04-21 16:19:39', 'FTPs', 130015, 'update', 'updated_by:=>4'),
(1000000000573, 4, '2013-04-21 16:19:46', 'FTPs', 130003, 'update', 'updated_by:=>4'),
(1000000000574, 4, '2013-04-21 16:19:47', 'FTPs', 130005, 'update', 'updated_by:=>4'),
(1000000000575, 4, '2013-04-21 16:19:48', 'FTPs', 130006, 'update', 'updated_by:=>4'),
(1000000000576, 4, '2013-04-21 16:19:49', 'FTPs', 130007, 'update', 'updated_by:=>4'),
(1000000000577, 4, '2013-04-21 16:19:49', 'FTPs', 130008, 'update', 'updated_by:=>4'),
(1000000000578, 4, '2013-04-21 16:19:50', 'FTPs', 130009, 'update', 'updated_by:=>4'),
(1000000000579, 4, '2013-04-21 16:19:51', 'FTPs', 130010, 'update', 'updated_by:=>4'),
(1000000000580, 4, '2013-04-21 16:19:51', 'FTPs', 130011, 'update', 'updated_by:=>4'),
(1000000000581, 4, '2013-04-21 16:19:52', 'FTPs', 130012, 'update', 'updated_by:=>4'),
(1000000000582, 4, '2013-04-21 16:19:53', 'FTPs', 130013, 'update', 'updated_by:=>4'),
(1000000000583, 4, '2013-04-21 16:20:43', 'FTPs', 130016, 'insert', 'id:130016, created_by:4, created_at:2013-04-21 16:20:43, updated_by:, updated_at:, status:Active, code:130016, product_id:, machine_id:1, diameter:16, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000584, 4, '2013-04-21 16:22:51', 'FTPs', 130016, 'delete', 'id:130016, created_by:4, created_at:2013-04-21 16:20:43, updated_by:, updated_at:, status:Active, code:130016, product_id:, machine_id:1, diameter:16, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000585, 4, '2013-04-21 16:22:57', 'FTPs', 130015, 'delete', 'id:130015, created_by:4, created_at:2013-04-21 16:19:32, updated_by:4, updated_at:2013-04-21 16:19:54, status:Active, code:130015, product_id:, machine_id:1, diameter:15, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000586, 4, '2013-04-21 16:23:04', 'FTPs', 130014, 'delete', 'id:130014, created_by:4, created_at:2013-04-21 16:18:57, updated_by:4, updated_at:2013-04-21 16:19:53, status:Active, code:130014, product_id:, machine_id:1, diameter:14, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000587, 4, '2013-04-21 16:23:08', 'FTPs', 130013, 'delete', 'id:130013, created_by:4, created_at:2013-04-21 16:17:57, updated_by:4, updated_at:2013-04-21 16:19:53, status:Active, code:130013, product_id:, machine_id:1, diameter:13, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000588, 4, '2013-04-21 16:23:13', 'FTPs', 130012, 'delete', 'id:130012, created_by:4, created_at:2013-04-21 16:15:34, updated_by:4, updated_at:2013-04-21 16:19:52, status:Active, code:130012, product_id:, machine_id:1, diameter:12, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000589, 4, '2013-04-21 16:23:18', 'FTPs', 130011, 'delete', 'id:130011, created_by:4, created_at:2013-04-21 16:14:36, updated_by:4, updated_at:2013-04-21 16:19:51, status:Active, code:130011, product_id:, machine_id:1, diameter:11, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000590, 4, '2013-04-21 16:23:22', 'FTPs', 130010, 'delete', 'id:130010, created_by:4, created_at:2013-04-21 16:14:10, updated_by:4, updated_at:2013-04-21 16:19:51, status:Active, code:130010, product_id:, machine_id:1, diameter:10, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000591, 4, '2013-04-21 16:23:30', 'FTPs', 130009, 'delete', 'id:130009, created_by:4, created_at:2013-04-21 16:13:41, updated_by:4, updated_at:2013-04-21 16:19:50, status:Active, code:130009, product_id:, machine_id:1, diameter:9, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000592, 4, '2013-04-21 16:23:46', 'FTPs', 130017, 'insert', 'id:130017, created_by:4, created_at:2013-04-21 16:23:46, updated_by:, updated_at:, status:Active, code:130017, product_id:, machine_id:1, diameter:9, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000593, 4, '2013-04-21 16:24:12', 'FTPs', 130018, 'insert', 'id:130018, created_by:4, created_at:2013-04-21 16:24:12, updated_by:, updated_at:, status:Active, code:130018, product_id:, machine_id:1, diameter:18, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000594, 4, '2013-04-21 16:24:47', 'FTPs', 130019, 'insert', 'id:130019, created_by:4, created_at:2013-04-21 16:24:47, updated_by:, updated_at:, status:Active, code:130019, product_id:, machine_id:1, diameter:19, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000595, 4, '2013-04-21 16:25:26', 'FTPs', 130020, 'insert', 'id:130020, created_by:4, created_at:2013-04-21 16:25:26, updated_by:, updated_at:, status:Active, code:130020, product_id:, machine_id:1, diameter:20, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000596, 4, '2013-04-21 16:26:03', 'FTPs', 130020, 'delete', 'id:130020, created_by:4, created_at:2013-04-21 16:25:26, updated_by:, updated_at:, status:Active, code:130020, product_id:, machine_id:1, diameter:20, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000597, 4, '2013-04-21 16:28:00', 'FTPs', 130019, 'delete', 'id:130019, created_by:4, created_at:2013-04-21 16:24:47, updated_by:, updated_at:, status:Active, code:130019, product_id:, machine_id:1, diameter:19, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000598, 4, '2013-04-21 16:28:05', 'FTPs', 130018, 'delete', 'id:130018, created_by:4, created_at:2013-04-21 16:24:12, updated_by:, updated_at:, status:Active, code:130018, product_id:, machine_id:1, diameter:18, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000599, 4, '2013-04-21 16:32:04', 'FTPs', 130017, 'update', 'updated_by:=>4, composition:=>100 Acrilico'),
(1000000000600, 4, '2013-04-21 16:32:18', 'FTP_Threads', 27, 'insert', 'id:27, created_by:4, created_at:2013-04-21 16:32:18, updated_by:, updated_at:, status:Active, ftp_id:130017, thread_id:, percent:0.00'),
(1000000000601, 4, '2013-04-21 16:33:42', 'FTP_Loads', 16, 'insert', 'id:16, created_by:4, created_at:2013-04-21 16:33:42, updated_by:, updated_at:, status:Active, ftp_id:130017, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000602, 4, '2013-04-21 16:33:55', 'FTP_Threads', 27, 'update', 'updated_by:=>4, percent:0.00=>100.00'),
(1000000000603, 4, '2013-04-21 16:33:57', 'FTP_Threads', 27, 'update', 'thread_id:=>1'),
(1000000000604, 4, '2013-04-21 16:34:01', 'FTP_Threads', 28, 'insert', 'id:28, created_by:4, created_at:2013-04-21 16:34:01, updated_by:, updated_at:, status:Active, ftp_id:130017, thread_id:, percent:0.00'),
(1000000000605, 4, '2013-04-21 16:34:05', 'FTP_Threads', 28, 'update', 'updated_by:=>4, percent:0.00=>40.00'),
(1000000000606, 4, '2013-04-21 16:34:08', 'FTP_Threads', 28, 'update', 'thread_id:=>2'),
(1000000000607, 4, '2013-04-21 16:34:12', 'FTP_Threads', 27, 'update', 'percent:100.00=>60.00'),
(1000000000608, 4, '2013-04-21 16:34:23', 'FTP_Loads', 16, 'update', 'updated_by:=>4, first_number:0=>1'),
(1000000000609, 4, '2013-04-21 16:34:36', 'FTP_Loads', 16, 'update', 'first_thread_id:=>27'),
(1000000000610, 4, '2013-04-21 16:34:41', 'FTP_Loads', 16, 'update', 'second_number:0=>1'),
(1000000000611, 4, '2013-04-21 16:34:43', 'FTP_Loads', 16, 'update', 'second_thread_id:=>28'),
(1000000000612, 4, '2013-04-21 16:34:58', 'FTP_Loads', 16, 'update', 'second_thread_id:28=>'),
(1000000000613, 4, '2013-04-21 16:35:01', 'FTP_Loads', 16, 'update', 'second_thread_id:=>28'),
(1000000000614, 4, '2013-04-21 16:35:12', 'FTP_Loads', 17, 'insert', 'id:17, created_by:4, created_at:2013-04-21 16:35:12, updated_by:, updated_at:, status:Active, ftp_id:130017, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000615, 4, '2013-04-21 16:35:15', 'FTP_Threads', 29, 'insert', 'id:29, created_by:4, created_at:2013-04-21 16:35:15, updated_by:, updated_at:, status:Active, ftp_id:130008, thread_id:, percent:0.00'),
(1000000000616, 4, '2013-04-21 16:35:16', 'FTP_Loads', 18, 'insert', 'id:18, created_by:4, created_at:2013-04-21 16:35:16, updated_by:, updated_at:, status:Active, ftp_id:130008, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000617, 4, '2013-04-21 16:39:37', 'FTP_Sets', 37, 'insert', 'id:37, created_by:4, created_at:2013-04-21 16:39:37, updated_by:, updated_at:, status:Active, ftp_id:130017, setting_id:43, value:17'),
(1000000000618, 4, '2013-04-21 16:39:38', 'FTP_Sets', 38, 'insert', 'id:38, created_by:4, created_at:2013-04-21 16:39:38, updated_by:, updated_at:, status:Active, ftp_id:130017, setting_id:44, value:17'),
(1000000000619, 4, '2013-04-21 16:39:39', 'FTP_Sets', 39, 'insert', 'id:39, created_by:4, created_at:2013-04-21 16:39:39, updated_by:, updated_at:, status:Active, ftp_id:130017, setting_id:45, value:17'),
(1000000000620, 4, '2013-04-21 16:48:59', 'FTP_Loads', 17, 'update', 'updated_by:=>4, first_number:0=>1'),
(1000000000621, 4, '2013-04-21 16:49:00', 'FTP_Loads', 17, 'update', 'first_thread_id:=>1'),
(1000000000622, 4, '2013-04-21 16:49:03', 'FTP_Loads', 17, 'update', 'second_number:0=>1'),
(1000000000623, 4, '2013-04-21 16:49:05', 'FTP_Loads', 17, 'update', 'second_thread_id:=>2'),
(1000000000624, 4, '2013-04-21 16:49:50', 'FTP_Loads', 16, 'delete', 'id:16, created_by:4, created_at:2013-04-21 16:33:42, updated_by:4, updated_at:2013-04-21 16:35:01, status:Active, ftp_id:130017, first_number:1, first_thread_id:1, second_number:1, second_thread_id:2'),
(1000000000625, 4, '2013-04-21 16:49:50', 'FTP_Sets', 37, 'delete', 'id:37, created_by:4, created_at:2013-04-21 16:39:37, updated_by:, updated_at:, status:Active, ftp_id:130017, setting_id:43, value:17'),
(1000000000626, 4, '2013-04-21 16:49:50', 'FTP_Threads', 27, 'delete', 'id:27, created_by:4, created_at:2013-04-21 16:32:18, updated_by:4, updated_at:2013-04-21 16:34:12, status:Active, ftp_id:130017, thread_id:1, percent:60.00'),
(1000000000627, 4, '2013-04-21 16:49:50', 'FTPs', 130017, 'delete', 'id:130017, created_by:4, created_at:2013-04-21 16:23:46, updated_by:4, updated_at:2013-04-21 16:32:04, status:Active, code:130017, product_id:, machine_id:1, diameter:9, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:100 Acrilico, draw:, photo:'),
(1000000000628, 4, '2013-04-21 17:06:37', 'FTP_Loads', 17, 'update', 'first_thread_id:1=>2'),
(1000000000629, 4, '2013-04-21 17:06:49', 'FTP_Threads', 29, 'update', 'updated_by:=>4, percent:0.00=>60.00'),
(1000000000630, 4, '2013-04-21 17:06:50', 'FTP_Threads', 29, 'update', 'thread_id:=>1'),
(1000000000631, 4, '2013-04-21 17:06:58', 'FTP_Threads', 30, 'insert', 'id:30, created_by:4, created_at:2013-04-21 17:06:58, updated_by:, updated_at:, status:Active, ftp_id:130007, thread_id:, percent:0.00'),
(1000000000632, 4, '2013-04-21 17:06:58', 'FTP_Loads', 19, 'insert', 'id:19, created_by:4, created_at:2013-04-21 17:06:58, updated_by:, updated_at:, status:Active, ftp_id:130007, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000633, 4, '2013-04-21 17:10:44', 'FTP_Threads', 31, 'insert', 'id:31, created_by:4, created_at:2013-04-21 17:10:44, updated_by:, updated_at:, status:Active, ftp_id:130008, thread_id:, percent:0.00'),
(1000000000634, 4, '2013-04-21 17:10:47', 'FTP_Threads', 31, 'update', 'updated_by:=>4, percent:0.00=>10.00'),
(1000000000635, 4, '2013-04-21 17:10:49', 'FTP_Threads', 31, 'update', 'thread_id:=>4'),
(1000000000636, 4, '2013-04-21 17:10:55', 'FTP_Threads', 29, 'update', 'percent:60.00=>50.00'),
(1000000000637, 4, '2013-04-21 17:19:30', 'FTP_Threads', 15, 'delete', 'id:15, created_by:4, created_at:2013-04-21 06:26:11, updated_by:4, updated_at:2013-04-21 06:36:40, status:Active, ftp_id:10001, thread_id:3, percent:40.00'),
(1000000000638, 4, '2013-04-21 17:21:21', 'FTP_Loads', 18, 'update', 'updated_by:=>4, first_thread_id:=>2'),
(1000000000639, 4, '2013-04-21 17:21:26', 'FTP_Loads', 18, 'update', 'first_number:0=>2'),
(1000000000640, 4, '2013-04-21 17:21:28', 'FTP_Loads', 18, 'update', 'second_number:0=>3'),
(1000000000641, 4, '2013-04-21 17:21:29', 'FTP_Loads', 18, 'update', 'second_thread_id:=>1'),
(1000000000642, 4, '2013-04-21 17:21:43', 'FTPs', 130008, 'delete', 'id:130008, created_by:4, created_at:2013-04-21 16:09:05, updated_by:4, updated_at:2013-04-21 16:19:49, status:Active, code:130008, product_id:, machine_id:1, diameter:8, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000643, 4, '2013-04-21 17:22:07', 'FTPs', 130007, 'delete', 'id:130007, created_by:4, created_at:2013-04-21 16:08:02, updated_by:4, updated_at:2013-04-21 16:19:49, status:Active, code:130007, product_id:, machine_id:1, diameter:999, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000644, 4, '2013-04-21 17:24:44', 'FTP_Threads', 32, 'insert', 'id:32, created_by:4, created_at:2013-04-21 17:24:44, updated_by:, updated_at:, status:Active, ftp_id:130006, thread_id:, percent:0.00'),
(1000000000645, 4, '2013-04-21 17:24:49', 'FTPs', 130006, 'delete', 'id:130006, created_by:4, created_at:2013-04-21 16:07:23, updated_by:4, updated_at:2013-04-21 16:19:48, status:Active, code:130006, product_id:, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000646, 4, '2013-04-21 17:27:33', 'FTP_Threads', 33, 'insert', 'id:33, created_by:4, created_at:2013-04-21 17:27:33, updated_by:, updated_at:, status:Active, ftp_id:130005, thread_id:, percent:0.00'),
(1000000000647, 4, '2013-04-21 17:27:38', 'FTPs', 130005, 'delete', 'id:130005, created_by:4, created_at:2013-04-21 16:01:44, updated_by:4, updated_at:2013-04-21 16:19:47, status:Active, code:130005, product_id:, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:, draw:, photo:'),
(1000000000648, 4, '2013-04-21 17:27:43', 'FTPs', 130004, 'delete', 'id:130004, created_by:4, created_at:2013-04-20 15:27:32, updated_by:4, updated_at:2013-04-21 16:19:47, status:Active, code:130004, product_id:, machine_id:1, diameter:0, density:0, inputs:0, speed:0, turns:0, weight:0, width:0, lanes:0, yield:0, needling:0, peso:12.50, has_break:No, composition:100 Acrilico, draw:, photo:'),
(1000000000649, 4, '2013-04-21 17:34:55', 'FTP_Threads', 34, 'insert', 'id:34, created_by:4, created_at:2013-04-21 17:34:55, updated_by:, updated_at:, status:Active, ftp_id:10006, thread_id:, percent:0.00'),
(1000000000650, 4, '2013-04-21 17:34:57', 'FTP_Loads', 20, 'insert', 'id:20, created_by:4, created_at:2013-04-21 17:34:57, updated_by:, updated_at:, status:Active, ftp_id:10006, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000651, 4, '2013-04-22 15:28:28', 'Controls', 1000000271, 'insert', 'id:1000000271, created_at:2013-04-22 15:28:28, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:User Resources, name:Cylinders, value:'),
(1000000000652, 4, '2013-04-22 15:44:06', 'Cylinders', 1, 'insert', 'id:1, created_by:4, created_at:2013-04-22 15:44:06, updated_by:, updated_at:, status:Active, machine_id:1, is_current:No, name:'),
(1000000000653, 4, '2013-04-22 16:39:05', 'Cylinders', 2, 'insert', 'id:2, created_by:4, created_at:2013-04-22 16:39:05, updated_by:, updated_at:, status:Active, machine_id:1, is_current:No, name:'),
(1000000000654, 4, '2013-04-22 16:39:09', 'Cylinders', 2, 'delete', 'id:2, created_by:4, created_at:2013-04-22 16:39:05, updated_by:, updated_at:, status:Active, machine_id:1, is_current:No, name:'),
(1000000000655, 4, '2013-04-22 16:39:11', 'Cylinders', 3, 'insert', 'id:3, created_by:4, created_at:2013-04-22 16:39:11, updated_by:, updated_at:, status:Active, machine_id:1, is_current:No, name:'),
(1000000000656, 4, '2013-04-22 16:39:12', 'Cylinders', 4, 'insert', 'id:4, created_by:4, created_at:2013-04-22 16:39:12, updated_by:, updated_at:, status:Active, machine_id:1, is_current:No, name:'),
(1000000000657, 4, '2013-04-22 16:39:13', 'Cylinders', 4, 'delete', 'id:4, created_by:4, created_at:2013-04-22 16:39:12, updated_by:, updated_at:, status:Active, machine_id:1, is_current:No, name:'),
(1000000000658, 4, '2013-04-22 17:04:05', 'Cylinders', 1, 'update', 'name:=>xxxxx'),
(1000000000659, 4, '2013-04-22 17:04:11', 'Cylinders', 3, 'update', 'updated_by:=>4, name:=>ccccc'),
(1000000000660, 4, '2013-04-22 17:09:03', 'Cylinders', 5, 'insert', 'id:5, created_by:4, created_at:2013-04-22 17:09:03, updated_by:, updated_at:, status:Active, machine_id:2, is_current:No, name:'),
(1000000000661, 4, '2013-04-22 17:09:04', 'Cylinders', 6, 'insert', 'id:6, created_by:4, created_at:2013-04-22 17:09:04, updated_by:, updated_at:, status:Active, machine_id:3, is_current:No, name:'),
(1000000000662, 4, '2013-04-22 17:09:05', 'Cylinders', 7, 'insert', 'id:7, created_by:4, created_at:2013-04-22 17:09:05, updated_by:, updated_at:, status:Active, machine_id:4, is_current:No, name:'),
(1000000000663, 4, '2013-04-22 17:09:50', 'Cylinders', 3, 'update', 'is_current:No=>Yes'),
(1000000000664, 4, '2013-04-22 17:09:56', 'Cylinders', 3, 'update', 'name:ccccc=>Altesa'),
(1000000000665, 4, '2013-04-22 17:10:06', 'Cylinders', 5, 'update', 'updated_by:=>4, is_current:No=>Yes, name:=>null'),
(1000000000666, 4, '2013-04-22 17:10:08', 'Cylinders', 5, 'update', 'name:null=>Ana'),
(1000000000667, 4, '2013-04-22 17:10:14', 'Cylinders', 6, 'update', 'updated_by:=>4, is_current:No=>Yes, name:=>null'),
(1000000000668, 4, '2013-04-22 17:10:19', 'Cylinders', 6, 'update', 'name:null=>Angelica'),
(1000000000669, 4, '2013-04-22 17:10:25', 'Cylinders', 7, 'update', 'updated_by:=>4, is_current:No=>Yes, name:=>null'),
(1000000000670, 4, '2013-04-22 17:10:29', 'Cylinders', 7, 'update', 'name:null=>Angelina'),
(1000000000671, 4, '2013-04-22 17:10:46', 'Cylinders', 3, 'update', 'name:Altesa=>Altesa 1'),
(1000000000672, 4, '2013-04-22 17:10:47', 'Cylinders', 8, 'insert', 'id:8, created_by:4, created_at:2013-04-22 17:10:47, updated_by:, updated_at:, status:Active, machine_id:1, is_current:No, name:'),
(1000000000673, 4, '2013-04-22 17:10:50', 'Cylinders', 8, 'update', 'updated_by:=>4'),
(1000000000674, 4, '2013-04-22 17:10:54', 'Cylinders', 8, 'update', 'name:=>Altesa 2'),
(1000000000675, 4, '2013-04-22 17:10:57', 'Cylinders', 9, 'insert', 'id:9, created_by:4, created_at:2013-04-22 17:10:57, updated_by:, updated_at:, status:Active, machine_id:1, is_current:No, name:'),
(1000000000676, 4, '2013-04-22 17:10:59', 'Cylinders', 9, 'update', 'updated_by:=>4'),
(1000000000677, 4, '2013-04-22 17:11:03', 'Cylinders', 9, 'update', 'name:=>Altesa 3'),
(1000000000678, 4, '2013-04-22 18:57:38', 'Machines', 2, 'delete', 'id:2, created_at:2013-04-10 21:40:59, created_by:4, updated_at:2013-04-21 09:03:03, updated_by:4, status:Active, name:Ana, machine_type:Circular, machine_family:Family 2, machine_brand:Brand2, diameter:120, width:210, density:140, inputs:60, lanes:4, repair_date:2013-04-12, return_date:2013-04-13'),
(1000000000679, 4, '2013-04-22 19:30:33', 'Configs', 86, 'insert', 'id:86, created_at:2013-04-22 19:30:33, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000680, 4, '2013-04-22 19:30:42', 'Configs', 87, 'insert', 'id:87, created_at:2013-04-22 19:30:42, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:xxxxx, name:x1, value:'),
(1000000000681, 4, '2013-04-22 19:30:46', 'Configs', 88, 'insert', 'id:88, created_at:2013-04-22 19:30:46, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:xxxxx, name:x2, value:'),
(1000000000682, 4, '2013-04-22 19:30:50', 'Configs', 89, 'insert', 'id:89, created_at:2013-04-22 19:30:50, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:xxxxx, name:x3, value:'),
(1000000000683, 4, '2013-04-22 19:31:35', 'Configs', 86, 'delete', 'id:86, created_at:2013-04-22 19:30:33, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000684, 4, '2013-04-22 19:33:17', 'Configs', 90, 'insert', 'id:90, created_at:2013-04-22 19:33:17, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000685, 4, '2013-04-22 19:33:31', 'Configs', 90, 'delete', 'id:90, created_at:2013-04-22 19:33:17, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000686, 4, '2013-04-22 19:34:07', 'Configs', 91, 'insert', 'id:91, created_at:2013-04-22 19:34:07, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000687, 4, '2013-04-22 19:34:20', 'Configs', 91, 'delete', 'id:91, created_at:2013-04-22 19:34:07, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000688, 4, '2013-04-22 19:35:02', 'Configs', 92, 'insert', 'id:92, created_at:2013-04-22 19:35:02, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000689, 4, '2013-04-22 19:35:07', 'Configs', 92, 'delete', 'id:92, created_at:2013-04-22 19:35:02, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000690, 4, '2013-04-22 19:36:35', 'Configs', 93, 'insert', 'id:93, created_at:2013-04-22 19:36:35, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000691, 4, '2013-04-22 19:36:44', 'Configs', 93, 'delete', 'id:93, created_at:2013-04-22 19:36:35, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000692, 4, '2013-04-22 19:37:53', 'Configs', 94, 'insert', 'id:94, created_at:2013-04-22 19:37:53, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000693, 4, '2013-04-22 19:38:04', 'Configs', 94, 'delete', 'id:94, created_at:2013-04-22 19:37:53, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000694, 4, '2013-04-22 19:40:49', 'Configs', 95, 'insert', 'id:95, created_at:2013-04-22 19:40:49, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000695, 4, '2013-04-22 19:40:59', 'Configs', 95, 'delete', 'id:95, created_at:2013-04-22 19:40:49, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000696, 4, '2013-04-22 19:45:27', 'Configs', 96, 'insert', 'id:96, created_at:2013-04-22 19:45:27, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000697, 4, '2013-04-22 19:45:39', 'Configs', 96, 'delete', 'id:96, created_at:2013-04-22 19:45:27, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:Root, name:xxxxx, value:'),
(1000000000698, 4, '2013-04-24 19:42:57', 'Contacts', 8, 'insert', 'id:8, created_at:2013-04-24 19:42:57, created_by:4, updated_at:, updated_by:, status:Active, company_id:, support_id:, is_company:no, is_customer:no, is_taxable:yes, photo:, first_name:Pat, last_name:Jan, full_name:Pat Jan, tags:, job_position:, phone:, mobile:714-801-5753, fax:, email:pat.jan@jkysoftware.com, website:, street1:, street2:, city:, state:AC, zip:, country:BR, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000699, 4, '2013-04-24 19:45:44', 'Contacts', 7, 'update', 'first_name:=>Susan, last_name:=>Jan, mobile:714-801-5756=>714-801-5753, email:=>susan.jan@hotmail.com'),
(1000000000700, 4, '2013-04-24 21:40:53', 'Permissions', 3, 'insert', 'id:3, created_by:4, created_at:2013-04-24 21:40:53, updated_by:, updated_at:, status:Active, user_role:Admin, user_resource:Permissions, user_action:Denied'),
(1000000000701, 4, '2013-04-24 21:41:16', 'Permissions', 4, 'insert', 'id:4, created_by:4, created_at:2013-04-24 21:41:16, updated_by:, updated_at:, status:Active, user_role:Admin, user_resource:Controls, user_action:Denied'),
(1000000000702, 4, '2013-04-25 15:40:01', 'Controls', 1000000272, 'insert', 'id:1000000272, created_at:2013-04-25 15:40:01, created_by:4, updated_at:, updated_by:, status:Active, company_id:1, sequence:50, group_set:User Resources, name:All, value:'),
(1000000000703, 4, '2013-04-26 04:32:39', 'FTPs', 10001, 'update', 'machine_id:2=>1'),
(1000000000704, 4, '2013-04-26 06:12:06', 'Contacts', 9, 'insert', 'id:9, created_at:2013-04-26 06:12:06, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:Pat, last_name:jan, full_name:Pat jan, tags:, job_position:, phone:, mobile:714-801-1006, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000705, 4, '2013-04-26 06:15:58', 'Contacts', 10, 'insert', 'id:10, created_at:2013-04-26 06:15:58, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:Pat, last_name:Jan, full_name:Pat Jan, tags:, job_position:, phone:, mobile:714-714-1006, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000706, 4, '2013-04-26 06:33:21', 'Contacts', 10, 'delete', 'id:10, created_at:2013-04-26 06:15:58, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:Pat, last_name:Jan, full_name:Pat Jan, tags:, job_position:, phone:, mobile:714-714-1006, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000707, 4, '2013-04-26 06:33:32', 'Contacts', 9, 'update', 'updated_by:=>4'),
(1000000000708, 4, '2013-04-26 06:34:04', 'Contacts', 11, 'insert', 'id:11, created_at:2013-04-26 06:34:04, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New, last_name:User1, full_name:New User1, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000709, 4, '2013-04-26 06:34:28', 'Contacts', 12, 'insert', 'id:12, created_at:2013-04-26 06:34:28, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New, last_name:User2, full_name:New User2, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000710, 4, '2013-04-26 18:59:35', 'Contacts', 11, 'delete', 'id:11, created_at:2013-04-26 06:34:04, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New, last_name:User1, full_name:New User1, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000711, 4, '2013-04-26 18:59:41', 'Contacts', 12, 'delete', 'id:12, created_at:2013-04-26 06:34:28, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New, last_name:User2, full_name:New User2, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000712, 4, '2013-04-26 19:03:07', 'Contacts', 13, 'insert', 'id:13, created_at:2013-04-26 19:03:07, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New, last_name:User1, full_name:New User1, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000713, 4, '2013-04-26 19:03:16', 'Contacts', 14, 'insert', 'id:14, created_at:2013-04-26 19:03:16, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New User2, last_name:, full_name:New User2 , tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000714, 4, '2013-04-26 19:03:47', 'Contacts', 14, 'update', 'updated_by:=>4, first_name:New User2=>New, last_name:=>User2, full_name:New User2 =>New User2'),
(1000000000715, 4, '2013-04-26 19:03:58', 'Contacts', 15, 'insert', 'id:15, created_at:2013-04-26 19:03:58, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New, last_name:User3, full_name:New User3, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000716, 4, '2013-04-26 19:56:43', 'Contacts', 8, 'update', 'updated_by:=>4'),
(1000000000717, 4, '2013-04-26 20:13:37', 'JKY_Users', 6, 'insert', 'id:6, created_by:4, created_at:2013-04-26 20:13:37, updated_by:, updated_at:, status:Active, contact_id:, start_date:, end_date:, user_name:patjan2, user_type:User, user_role:Teacher, user_key:, password:'),
(1000000000718, 4, '2013-04-26 20:55:26', 'JKY_Users', 7, 'insert', 'id:7, created_by:4, created_at:2013-04-26 20:55:26, updated_by:, updated_at:, status:Active, contact_id:8, start_date:, end_date:, user_name:patjan2, user_type:User, user_role:Visitor, user_key:, password:'),
(1000000000719, 4, '2013-04-26 21:03:57', 'JKY_Users', 8, 'insert', 'id:8, created_by:4, created_at:2013-04-26 21:03:57, updated_by:, updated_at:, status:Active, contact_id:9, start_date:, end_date:, user_name:patjan3, user_type:User, user_role:Guest, user_key:, password:'),
(1000000000720, 4, '2013-04-26 21:04:38', 'Contacts', 13, 'update', 'updated_by:=>4'),
(1000000000721, 4, '2013-04-26 21:04:38', 'JKY_Users', 9, 'insert', 'id:9, created_by:4, created_at:2013-04-26 21:04:38, updated_by:, updated_at:, status:Active, contact_id:13, start_date:, end_date:, user_name:, user_type:User, user_role:Visitor, user_key:, password:'),
(1000000000722, 4, '2013-04-27 07:03:56', 'Threads', 5, 'insert', 'id:5, created_at:2013-04-27 07:03:56, created_by:4, updated_at:, updated_by:, status:Active, code:, name:30/1 Qualquer Fio, thread_group:0, thread_color:0, composition:0'),
(1000000000723, 4, '2013-04-27 07:06:47', 'Cylinders', 10, 'insert', 'id:10, created_by:4, created_at:2013-04-27 07:06:47, updated_by:, updated_at:, status:Active, machine_id:1, is_current:No, name:'),
(1000000000724, 4, '2013-04-27 07:07:08', 'Cylinders', 10, 'update', 'updated_by:=>4, is_current:No=>0, name:=>Cilindro X'),
(1000000000725, 4, '2013-04-27 07:07:16', 'Cylinders', 10, 'update', 'is_current:0=>No'),
(1000000000726, 4, '2013-04-27 07:07:33', 'Cylinders', 10, 'delete', 'id:10, created_by:4, created_at:2013-04-27 07:06:47, updated_by:4, updated_at:2013-04-27 07:07:16, status:Active, machine_id:1, is_current:No, name:Cilindro X'),
(1000000000727, 4, '2013-04-27 07:10:28', 'FTPs', 10001, 'update', 'composition:30 Elastano, 50 Acrilico, 20 Acrilico=>40 Elastano, 60 Acrilico'),
(1000000000728, 4, '2013-04-27 07:11:20', 'FTP_Threads', 35, 'insert', 'id:35, created_by:4, created_at:2013-04-27 07:11:20, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000729, 4, '2013-04-27 07:11:25', 'FTP_Threads', 35, 'update', 'updated_by:=>4, thread_id:=>4'),
(1000000000730, 4, '2013-04-27 07:11:29', 'FTP_Threads', 35, 'update', 'percent:0.00=>200.00'),
(1000000000731, 4, '2013-04-27 07:11:34', 'FTP_Threads', 35, 'update', 'percent:200.00=>20.00'),
(1000000000732, 4, '2013-04-27 07:11:37', 'FTP_Threads', 36, 'insert', 'id:36, created_by:4, created_at:2013-04-27 07:11:37, updated_by:, updated_at:, status:Active, ftp_id:10001, thread_id:, percent:0.00'),
(1000000000733, 4, '2013-04-27 07:11:51', 'FTP_Threads', 36, 'update', 'updated_by:=>4, thread_id:=>5'),
(1000000000734, 4, '2013-04-27 07:11:57', 'FTP_Threads', 36, 'update', 'percent:0.00=>20.00'),
(1000000000735, 4, '2013-04-27 07:12:30', 'FTP_Loads', 2, 'update', 'updated_by:=>4, second_thread_id:3=>4'),
(1000000000736, 4, '2013-04-27 07:12:38', 'FTP_Loads', 21, 'insert', 'id:21, created_by:4, created_at:2013-04-27 07:12:38, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000737, 4, '2013-04-27 07:12:44', 'FTP_Loads', 21, 'delete', 'id:21, created_by:4, created_at:2013-04-27 07:12:38, updated_by:, updated_at:, status:Active, ftp_id:10001, first_number:0, first_thread_id:, second_number:0, second_thread_id:'),
(1000000000738, 4, '2013-04-27 07:16:22', 'JKY_Users', 3, 'update', 'updated_by:=>4, user_role:Guest=>Admin'),
(1000000000739, 4, '2013-04-27 09:18:05', 'Contacts', 13, 'delete', 'id:13, created_at:2013-04-26 19:03:07, created_by:4, updated_at:2013-04-26 21:08:02, updated_by:4, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New, last_name:User1, full_name:New User1, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000740, 4, '2013-04-27 09:18:09', 'Contacts', 14, 'delete', 'id:14, created_at:2013-04-26 19:03:16, created_by:4, updated_at:2013-04-26 19:03:47, updated_by:4, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New, last_name:User2, full_name:New User2, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000741, 4, '2013-04-27 09:18:15', 'Contacts', 15, 'delete', 'id:15, created_at:2013-04-26 19:03:58, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New, last_name:User3, full_name:New User3, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000742, 4, '2013-04-27 09:27:21', 'JKY_Users', 2, 'update', 'updated_by:=>4'),
(1000000000743, 4, '2013-04-27 09:27:34', 'JKY_Users', 1, 'update', 'updated_by:=>4'),
(1000000000744, 4, '2013-04-27 09:27:35', 'JKY_Users', 7, 'update', 'updated_by:=>4'),
(1000000000745, 4, '2013-04-27 09:27:36', 'JKY_Users', 8, 'update', 'updated_by:=>4'),
(1000000000746, 4, '2013-04-27 09:28:48', 'JKY_Users', 10, 'insert', 'id:10, created_by:4, created_at:2013-04-27 09:28:48, updated_by:, updated_at:, status:Active, contact_id:7, start_date:, end_date:, user_name:susanjan, user_type:User, user_role:Visitor, user_key:, password:'),
(1000000000747, 4, '2013-04-27 09:29:10', 'JKY_Users', 7, 'update', 'user_role:Visitor=>Captain'),
(1000000000748, 4, '2013-04-27 09:29:24', 'JKY_Users', 7, 'update', 'user_role:Captain=>Leader'),
(1000000000749, 4, '2013-04-27 10:22:02', 'Contacts', 16, 'insert', 'id:16, created_at:2013-04-27 10:22:02, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:new1, last_name:user, full_name:new1 user, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000750, 4, '2013-04-27 10:22:02', 'JKY_Users', 2, 'update', 'contact_id:5=>16, user_name:joeljan=>new1, user_role:Support=>Visitor'),
(1000000000751, 4, '2013-04-27 12:56:31', 'Contacts', 17, 'insert', 'id:17, created_at:2013-04-27 12:56:31, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New1, last_name:User, full_name:New1 User, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000752, 4, '2013-04-27 13:19:33', 'Contacts', 18, 'insert', 'id:18, created_at:2013-04-27 13:19:33, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New2, last_name:User, full_name:New2 User, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000753, 4, '2013-04-27 13:19:33', 'JKY_Users', 11, 'insert', 'id:11, created_by:4, created_at:2013-04-27 13:19:33, updated_by:, updated_at:, status:Active, contact_id:18, start_date:, end_date:, user_name:new2, user_type:User, user_role:Guest, user_key:, password:'),
(1000000000754, 4, '2013-04-27 13:20:19', 'Contacts', 19, 'insert', 'id:19, created_at:2013-04-27 13:20:19, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New4, last_name:User, full_name:New4 User, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000755, 4, '2013-04-27 13:20:19', 'JKY_Users', 12, 'insert', 'id:12, created_by:4, created_at:2013-04-27 13:20:19, updated_by:, updated_at:, status:Active, contact_id:19, start_date:, end_date:, user_name:new4, user_type:User, user_role:Visitor, user_key:, password:'),
(1000000000756, 4, '2013-04-27 13:20:35', 'Contacts', 20, 'insert', 'id:20, created_at:2013-04-27 13:20:35, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New5, last_name:User, full_name:New5 User, tags:, job_position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000757, 4, '2013-04-27 13:20:35', 'JKY_Users', 13, 'insert', 'id:13, created_by:4, created_at:2013-04-27 13:20:35, updated_by:, updated_at:, status:Active, contact_id:20, start_date:, end_date:, user_name:new5, user_type:User, user_role:Visitor, user_key:, password:'),
(1000000000758, 4, '2013-04-27 13:20:57', 'Contacts', 16, 'update', 'updated_by:=>4, first_name:new1=>New3, last_name:user=>User, full_name:new1 user=>New3 User'),
(1000000000759, 4, '2013-04-27 13:20:57', 'JKY_Users', 2, 'update', 'user_name:new1=>new3'),
(1000000000760, 4, '2013-04-27 13:21:23', 'Contacts', 17, 'update', 'updated_by:=>4'),
(1000000000761, 4, '2013-04-27 13:21:23', 'JKY_Users', 14, 'insert', 'id:14, created_by:4, created_at:2013-04-27 13:21:23, updated_by:, updated_at:, status:Active, contact_id:17, start_date:, end_date:, user_name:new1, user_type:User, user_role:Visitor, user_key:, password:'),
(1000000000762, 4, '2013-04-27 13:24:10', 'Contacts', 9, 'update', 'last_name:jan=>Jan, full_name:Pat jan=>Pat Jan'),
(1000000000763, 4, '2013-04-27 15:24:15', 'Contacts', 17, 'update', 'street1:=>undefined, street2:=>undefined, city:=>undefined, state:=>undefined, zip:=>undefined, country:=>undefined'),
(1000000000764, 4, '2013-04-27 15:25:55', 'Contacts', 17, 'update', 'street1:undefined=>Street1 New1, state:undefined=>AC, country:undefined=>BR'),
(1000000000765, 4, '2013-04-27 15:26:33', 'Contacts', 17, 'update', 'street2:undefined=>Street2 New2, city:undefined=>City New1, zip:undefined=>12345, country:BR=>US'),
(1000000000766, 4, '2013-04-27 15:32:32', 'Contacts', 18, 'update', 'updated_by:=>4, state:=>AC, country:=>BR'),
(1000000000767, 4, '2013-04-27 15:51:23', 'Contacts', 18, 'update', 'is_company:No=>yes, street1:=>Street1 New2, street2:=>Street2 New2, city:=>City New2, state:AC=>BA, zip:=>10002, country:BR=>US'),
(1000000000768, 4, '2013-04-27 19:50:01', 'Contacts', 16, 'delete', 'id:16, created_at:2013-04-27 10:22:02, created_by:4, updated_at:2013-04-27 13:20:57, updated_by:4, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New3, last_name:User, full_name:New3 User, tags:, position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000769, 4, '2013-04-27 19:50:05', 'Contacts', 19, 'delete', 'id:19, created_at:2013-04-27 13:20:19, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New4, last_name:User, full_name:New4 User, tags:, position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000770, 4, '2013-04-27 19:50:09', 'Contacts', 20, 'delete', 'id:20, created_at:2013-04-27 13:20:35, created_by:4, updated_at:, updated_by:, status:Active, company_id:3, support_id:, is_company:No, is_customer:No, is_taxable:Yes, photo:, first_name:New5, last_name:User, full_name:New5 User, tags:, position:, phone:, mobile:, fax:, email:, website:, street1:, street2:, city:, state:, zip:, country:, language:Portuguese, time_zone:-3, cnpj:, ie:, start_dt:, end_dt:, credit_limit:0.00, total_purchased:0.00, total_refunded:0.00, total_invoiced:0.00, total_paid:0.00'),
(1000000000771, 4, '2013-04-27 19:58:34', 'FTP_Loads', 12, 'update', 'first_thread_id:9=>1, second_thread_id:10=>'),
(1000000000772, 4, '2013-04-27 19:58:37', 'FTP_Loads', 12, 'update', 'second_thread_id:=>2');

-- --------------------------------------------------------

--
-- Table structure for table `jky_users`
--

CREATE TABLE IF NOT EXISTS `jky_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `contact_id` bigint(20) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `user_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_type` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'User',
  `user_role` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Guest',
  `user_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  KEY `contact` (`contact_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

--
-- Dumping data for table `jky_users`
--

INSERT INTO `jky_users` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `contact_id`, `start_date`, `end_date`, `user_name`, `user_type`, `user_role`, `user_key`, `password`) VALUES
(1, NULL, NULL, 4, '2013-04-27 09:27:34', 'Active', 4, '2012-09-24', NULL, 'patjan', 'Support', 'Support', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f'),
(2, NULL, NULL, 4, '2013-04-27 13:20:57', 'Active', 5, NULL, NULL, 'joeljan', 'Support', 'Support', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f'),
(3, NULL, NULL, 4, '2013-04-27 09:27:41', 'Active', 6, NULL, NULL, 'marcelo', 'User', 'Admin', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f'),
(7, 4, '2013-04-26 20:55:26', 4, '2013-04-27 09:29:24', 'Active', 8, NULL, NULL, 'patjan2', 'User', 'Leader', NULL, NULL),
(8, 4, '2013-04-26 21:03:57', 4, '2013-04-27 13:24:10', 'Active', 9, NULL, NULL, 'patjan3', 'User', 'Guest', NULL, NULL),
(10, 4, '2013-04-27 09:28:48', NULL, NULL, 'Active', 7, NULL, NULL, 'susanjan', 'User', 'Visitor', NULL, NULL),
(11, 4, '2013-04-27 13:19:33', NULL, NULL, 'Active', 18, NULL, NULL, 'new2', 'User', 'Guest', NULL, NULL),
(12, 4, '2013-04-27 13:20:19', NULL, NULL, 'Active', 19, NULL, NULL, 'new4', 'User', 'Visitor', NULL, NULL),
(13, 4, '2013-04-27 13:20:35', NULL, NULL, 'Active', 20, NULL, NULL, 'new5', 'User', 'Visitor', NULL, NULL),
(14, 4, '2013-04-27 13:21:23', NULL, NULL, 'Active', 17, NULL, NULL, 'new1', 'User', 'Visitor', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `machines`
--

CREATE TABLE IF NOT EXISTS `machines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `machine_type` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `machine_family` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `machine_brand` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `serial_number` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `diameter` int(11) DEFAULT '0',
  `width` int(11) DEFAULT '0',
  `density` int(11) DEFAULT '0',
  `inputs` int(11) DEFAULT '0',
  `lanes` int(11) DEFAULT '0',
  `purchase_date` date DEFAULT NULL,
  `repair_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `machines`
--

INSERT INTO `machines` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `name`, `machine_type`, `machine_family`, `machine_brand`, `serial_number`, `diameter`, `width`, `density`, `inputs`, `lanes`, `purchase_date`, `repair_date`, `return_date`) VALUES
(1, '2013-04-10 21:39:10', 4, '2013-04-22 15:13:42', 4, 'Active', 'Altesa', 'Circular', 'Family 1', 'Brand1', NULL, 100, 200, 300, 50, 6, NULL, '2013-04-10', '2013-04-11'),
(3, '2013-04-11 19:27:04', 4, '2013-04-21 09:02:52', 4, 'Active', 'Angelica', 'Circular', 'Family 2', 'Brand2', NULL, 100, 200, 300, 400, 500, NULL, '2013-04-13', '2013-04-14'),
(4, '2013-04-15 21:23:30', 4, '2013-04-21 09:03:13', 4, 'Active', 'Angelina', 'Retilinea', 'Family 3', 'Brand3', NULL, 0, 0, 0, 0, 0, NULL, '2013-04-15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `user_role` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_resource` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_action` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_role` (`user_role`,`user_resource`,`user_action`),
  KEY `user_action` (`user_action`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=19 ;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `user_role`, `user_resource`, `user_action`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', 'Support', 'All', 'All'),
(2, NULL, NULL, NULL, NULL, 'Active', 'Admin', 'All', 'All'),
(3, 4, '2013-04-25 15:02:08', NULL, NULL, 'Active', 'Admin', 'Permissions', 'Denied'),
(4, 4, '2013-04-25 15:07:08', NULL, NULL, 'Active', 'Admin', 'Controls', 'Denied'),
(5, 4, '2013-04-25 15:07:50', NULL, NULL, 'Active', 'Guest', 'Home', 'All'),
(6, 4, '2013-04-25 15:08:01', NULL, NULL, 'Active', 'Guest', 'Users', 'All'),
(7, 4, '2013-04-25 15:08:14', NULL, NULL, 'Active', 'Guest', 'My Info', 'All'),
(8, 4, '2013-04-25 15:09:08', NULL, NULL, 'Active', 'Guest', 'Tickets', 'All'),
(9, 4, '2013-04-25 15:09:24', NULL, NULL, 'Active', 'Member', 'Users', 'Update'),
(10, 4, '2013-04-25 15:09:45', NULL, NULL, 'Active', 'Member', 'Home', 'All'),
(11, 4, '2013-04-25 15:09:59', NULL, NULL, 'Active', 'Member', 'My Info', 'Update'),
(12, 4, '2013-04-25 15:10:09', NULL, NULL, 'Active', 'Member', 'Tickets', 'All'),
(13, 4, '2013-04-25 15:10:23', NULL, NULL, 'Active', 'Member', 'Services', 'Insert'),
(14, 4, '2013-04-25 15:21:09', NULL, NULL, 'Active', 'Visitor', 'Home', 'All'),
(15, 4, '2013-04-25 15:35:39', NULL, NULL, 'Active', 'Member', 'Services', 'Update'),
(16, 4, '2013-04-25 15:36:25', NULL, NULL, 'Active', 'Member', 'All', 'Denied'),
(17, 4, '2013-04-25 15:36:44', NULL, NULL, 'Active', 'Guest', 'All', 'Denied'),
(18, 4, '2013-04-25 15:37:20', NULL, NULL, 'Active', 'Visitor', 'All', 'Denied');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `code` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_type` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `code`, `name`, `product_type`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', '1', 'malha americana light', 'Tubular'),
(2, NULL, NULL, NULL, NULL, 'Active', '2', 'malha botone black USA', 'Tubular'),
(3, NULL, NULL, NULL, NULL, 'Active', '3', 'malha coquinho ralado', 'Tubular');

-- --------------------------------------------------------

--
-- Table structure for table `purchaselines`
--

CREATE TABLE IF NOT EXISTS `purchaselines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Draft',
  `purchase_id` bigint(20) DEFAULT NULL,
  `thread_id` bigint(20) DEFAULT NULL,
  `expected_dt` date DEFAULT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `expected_weight` decimal(10,2) DEFAULT '0.00',
  `received_weight` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `purchase` (`purchase_id`),
  KEY `thread` (`thread_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `purchaselines`
--


-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE IF NOT EXISTS `purchases` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Draft',
  `code` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source_doc` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ordered_at` datetime DEFAULT NULL,
  `expected_dt` date DEFAULT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `supplier_id` bigint(20) DEFAULT NULL,
  `supplier_ref` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_term` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `supplier` (`supplier_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `purchases`
--


-- --------------------------------------------------------

--
-- Table structure for table `threads`
--

CREATE TABLE IF NOT EXISTS `threads` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `code` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thread_group` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thread_color` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `composition` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `threads`
--

INSERT INTO `threads` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `code`, `name`, `thread_group`, `thread_color`, `composition`) VALUES
(1, '2013-04-18 21:21:20', 4, '2013-04-27 07:03:05', 4, 'Active', '267', '06/1 PAC Flame', 'PA Card/Pent', 'Cru', '50 Algodao'),
(2, '2013-04-18 21:22:03', 4, '2013-04-18 21:28:34', 4, 'Active', '284', '08/1 CO Card', 'CO Cardado/Penteado', 'Cru', '100 Algodao'),
(3, '2013-04-18 21:28:00', 4, NULL, NULL, 'Active', '281', '10/1 CO Card OE', 'Card/Pentado', 'Cru', '100 Algodao'),
(4, NULL, NULL, NULL, NULL, 'Active', '280', '10/1 PAC OE 70/30', 'PA Card/Pent', 'Cru', '100 Algodao'),
(5, '2013-04-27 07:03:56', 4, NULL, NULL, 'Active', '', '30/1 Qualquer Fio', '0', '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `company_id` bigint(20) DEFAULT NULL,
  `opened_by` bigint(20) DEFAULT NULL,
  `opened_at` datetime DEFAULT NULL,
  `assigned_by` bigint(20) DEFAULT NULL,
  `assigned_at` datetime DEFAULT NULL,
  `closed_by` bigint(20) DEFAULT NULL,
  `closed_at` datetime DEFAULT NULL,
  `priority` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `resolution` text COLLATE utf8_unicode_ci,
  `attachments` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `opened_by` (`opened_by`),
  KEY `opened_at` (`opened_at`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `tickets`
--


-- --------------------------------------------------------

--
-- Table structure for table `translations`
--

CREATE TABLE IF NOT EXISTS `translations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Active',
  `parent_id` bigint(20) DEFAULT NULL,
  `locale` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sentence` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `parent_id` (`parent_id`,`locale`),
  KEY `parent` (`parent_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `translations`
--

