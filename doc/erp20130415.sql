-- phpMyAdmin SQL Dump
-- version 3.3.3
-- http://www.phpmyadmin.net
--
--
-- Host: localhost
-- Generation Time: Apr 15, 2013 at 06:26 PM
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=58 ;

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
(36, '2013-04-09 18:08:48', 4, '2013-04-09 18:09:04', 4, 'Active', 1, 50, 'Machine Brands', 'BRAND1', ''),
(37, '2013-04-09 18:08:50', 4, '2013-04-09 18:09:08', 4, 'Active', 1, 50, 'Machine Brands', 'BRAND2', ''),
(38, '2013-04-09 18:08:51', 4, '2013-04-09 18:09:12', 4, 'Active', 1, 50, 'Machine Brands', 'BRAND3', ''),
(42, '2013-04-14 15:24:47', 4, NULL, NULL, 'Active', 1, 50, 'Root', 'Settings', ''),
(43, '2013-04-14 15:26:03', 4, '2013-04-14 15:26:44', 4, 'Active', 1, 10, 'Settings', 'Ponto da Malha', ''),
(44, '2013-04-14 15:26:16', 4, '2013-04-14 15:26:49', 4, 'Active', 1, 11, 'Settings', 'Fita da Malha', ''),
(45, '2013-04-14 15:26:25', 4, '2013-04-14 15:26:53', 4, 'Active', 1, 12, 'Settings', 'LFA da Malha', ''),
(46, '2013-04-14 15:32:49', 4, NULL, NULL, 'Active', 1, 20, 'Settings', 'Ponto da Fang', ''),
(47, '2013-04-14 15:33:00', 4, NULL, NULL, 'Active', 1, 21, 'Settings', 'Fita da Fang', ''),
(48, '2013-04-14 15:33:13', 4, NULL, NULL, 'Active', 1, 22, 'Settings', 'LFA da Fang', ''),
(49, '2013-04-14 15:33:32', 4, NULL, NULL, 'Active', 1, 30, 'Settings', 'Fita da Lycra', ''),
(50, '2013-04-14 15:33:46', 4, NULL, NULL, 'Active', 1, 40, 'Settings', 'Ponto Central', ''),
(51, '2013-04-14 15:34:09', 4, NULL, NULL, 'Active', 1, 50, 'Settings', 'Ponto do Disco', ''),
(52, '2013-04-14 15:34:25', 4, NULL, NULL, 'Active', 1, 51, 'Settings', 'Altura do Disco', ''),
(53, '2013-04-14 15:34:38', 4, NULL, NULL, 'Active', 1, 52, 'Settings', 'Chave do Disco', ''),
(54, '2013-04-14 15:34:58', 4, NULL, NULL, 'Active', 1, 60, 'Settings', 'Frontura', ''),
(55, '2013-04-14 15:35:07', 4, NULL, NULL, 'Active', 1, 70, 'Settings', 'Puxador', '');

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
  `is_company` char(3) COLLATE utf8_unicode_ci DEFAULT 'no',
  `is_customer` char(3) COLLATE utf8_unicode_ci DEFAULT 'no',
  `is_taxable` char(3) COLLATE utf8_unicode_ci DEFAULT 'yes',
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tags` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `job_position` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
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
  UNIQUE KEY `full_name` (`full_name`),
  KEY `company` (`company_id`),
  KEY `first_name` (`first_name`),
  KEY `last_name` (`last_name`),
  KEY `email` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `company_id`, `support_id`, `is_company`, `is_customer`, `is_taxable`, `photo`, `first_name`, `last_name`, `full_name`, `tags`, `job_position`, `phone`, `mobile`, `fax`, `email`, `website`, `street1`, `street2`, `city`, `state`, `zip`, `country`, `language`, `time_zone`, `cnpj`, `ie`, `start_dt`, `end_dt`, `credit_limit`, `total_purchased`, `total_refunded`, `total_invoiced`, `total_paid`) VALUES
(1, NULL, NULL, '2013-04-10 21:38:04', 4, 'Active', NULL, NULL, 'yes', 'no', 'no', NULL, NULL, NULL, 'JKY Software Corp', NULL, NULL, '', '', '', 'pat.jan@jkysoftware.com', 'www.jkysoftware.com', '18781 Deep Well Rd', '', 'Santa Ana', 'CA', '92705', 'BR', 'English', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(2, NULL, NULL, '2013-04-10 21:38:06', 4, 'Active', NULL, NULL, 'yes', 'no', 'yes', NULL, NULL, NULL, 'Tecno Malhas', NULL, NULL, '11 2274.3833', '', '11 2274.3865', 'suporte@metatex.com.br', 'www.metatex.com.br', 'Rua Baceunas, 51', '', 'Parque da Mooca', 'SP', '03127-060', 'BR', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(3, NULL, NULL, '2013-04-10 19:08:34', 4, 'Active', NULL, NULL, 'yes', 'no', 'yes', NULL, NULL, NULL, 'DL Malhas', NULL, NULL, '', '', '', 'suporte@dlmalhas.com.br', '', '', '', '', 'AC', '', 'BR', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(4, NULL, NULL, '2013-04-10 19:07:25', 4, 'Active', 1, NULL, 'yes', 'no', 'yes', NULL, 'Pat', 'Jan', 'Pat Jan', NULL, NULL, '', '714-801-5752', '', 'pat_jan@hotmail.com', 'www.jkysoftware.com', '18781 Deep Well Rd', '', 'Santa Ana', 'CA', '92705', 'BR', 'Portuguese', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(5, NULL, NULL, '2013-04-10 19:08:26', 4, 'Active', 1, NULL, 'yes', 'no', 'yes', NULL, 'Joel', 'Jan', 'Joel Jan', NULL, NULL, '', '714-801-5757', '', 'joel_jan92@hotmail.com', 'www.jkysoftware.com', '18781 Deep Well Rd', '', 'Santa Ana ', 'CA', '92705', 'BR', 'Portuguese', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(6, NULL, NULL, '2013-04-10 19:08:29', 4, 'Active', NULL, NULL, 'yes', 'no', 'yes', NULL, 'Marcelo', 'Lodi', 'Marcelo Lodi', NULL, NULL, '', '', '', '', '', '', '', '', 'AC', '', 'BR', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(7, '2013-04-10 19:10:37', 4, '2013-04-10 21:38:02', 4, 'Active', NULL, NULL, 'yes', 'no', 'yes', NULL, NULL, NULL, 'Susan Jan', NULL, NULL, '', '714-801-5756', '', '', '', '', '', '', 'AC', '', 'BR', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1000000264 ;

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
(1000000263, '2013-04-14 15:43:40', 4, '2013-04-14 16:29:48', 4, 'Active', 1, 50, 'System Numbers', 'Next FTP number', '10006');

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
  `has_break` char(3) COLLATE utf8_unicode_ci DEFAULT 'no',
  `composition` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `draw` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `product` (`product_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10006 ;

--
-- Dumping data for table `ftps`
--

INSERT INTO `ftps` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `code`, `product_id`, `machine_id`, `diameter`, `density`, `inputs`, `speed`, `turns`, `weight`, `width`, `lanes`, `yield`, `needling`, `has_break`, `composition`, `draw`, `photo`) VALUES
(10002, 4, '2013-04-13 19:29:45', 4, '2013-04-14 08:04:32', 'Active', '10002', 2, 1, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 'no', NULL, NULL, NULL),
(10003, 4, '2013-04-13 19:33:27', 4, '2013-04-15 05:59:57', 'Active', '10003', 3, 3, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 'yes', NULL, NULL, NULL),
(10001, NULL, NULL, NULL, NULL, 'Active', '10001', 1, 1, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'no', NULL, NULL, NULL),
(10004, 4, '2013-04-14 16:30:02', NULL, NULL, 'Active', '10004', NULL, 1, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0', NULL, NULL, NULL),
(10005, 4, '2013-04-14 21:55:38', NULL, NULL, 'Active', '10005', NULL, 3, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0', NULL, NULL, NULL);

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
  `sequence` int(11) DEFAULT '0',
  `first_number` int(11) DEFAULT '0',
  `first_thread_id` bigint(20) DEFAULT NULL,
  `second_number` int(11) DEFAULT '0',
  `second_thread_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `ftp_loads`
--


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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `ftp_sets`
--


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
  `sequence` int(11) DEFAULT '0',
  `percentage` decimal(6,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ftp_id` (`ftp_id`,`thread_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `ftp_threads`
--


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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1000000000195 ;

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
(1000000000194, 4, '2013-04-15 06:22:31', 'FTPs', 10001, 'delete', 'id:10001, created_by:4, created_at:2013-04-13 19:29:33, updated_by:4, updated_at:2013-04-14 08:04:59, status:Active, code:10001, product_id:1, machine_id:2, diameter:100, density:110, inputs:120, speed:130, turns:140, weight:150, width:160, lanes:170, yield:180, needling:190, has_break:yes, composition:, draw:, photo:');

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
  `user_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_type` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'User',
  `user_role` varchar(32) COLLATE utf8_unicode_ci DEFAULT 'Guest',
  `user_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  KEY `contact` (`contact_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `jky_users`
--

INSERT INTO `jky_users` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `contact_id`, `start_date`, `end_date`, `user_name`, `user_type`, `user_role`, `user_key`, `password`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', 4, '2012-09-24', NULL, 'patjan', 'Support', 'Support', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f'),
(2, NULL, NULL, NULL, NULL, 'Active', 5, NULL, NULL, 'joeljan', 'Support', 'Support', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f'),
(3, NULL, NULL, NULL, NULL, 'Active', 6, NULL, NULL, 'marcelo', 'User', 'Guest', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f');

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
  `machine_brand` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `diameter` int(11) DEFAULT '0',
  `width` int(11) DEFAULT '0',
  `density` int(11) DEFAULT '0',
  `inputs` int(11) DEFAULT '0',
  `lanes` int(11) DEFAULT '0',
  `repair_dt` date DEFAULT NULL,
  `return_dt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `machines`
--

INSERT INTO `machines` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `name`, `machine_type`, `machine_brand`, `diameter`, `width`, `density`, `inputs`, `lanes`, `repair_dt`, `return_dt`) VALUES
(1, '2013-04-10 21:39:10', 4, '2013-04-11 20:43:27', 4, 'Active', 'Altesa', 'CIRCULAR', 'Brand1', 100, 200, 300, 50, 6, NULL, NULL),
(2, '2013-04-10 21:40:59', 4, '2013-04-11 20:43:30', 4, 'Active', 'Ana', 'RETILINEA', 'Brand1', 120, 210, 140, 60, 4, NULL, NULL),
(3, '2013-04-11 19:27:04', 4, '2013-04-11 20:45:24', 4, 'Active', 'Angelica', 'RETILINEA', 'Brand3', 100, 200, 300, 400, 500, NULL, NULL);

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
  UNIQUE KEY `user_role` (`user_role`,`user_resource`),
  KEY `user_action` (`user_action`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `user_role`, `user_resource`, `user_action`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', 'Support', 'All', 'All'),
(2, NULL, NULL, NULL, NULL, 'Active', 'Admin', 'All', 'All');

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `threads`
--

