-- phpMyAdmin SQL Dump
-- version 3.3.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 26, 2013 at 10:43 PM
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
  KEY `sequence` (`company_id`,`sequence`),
  KEY `group_set` (`group_set`,`sequence`),
  KEY `name` (`name`,`sequence`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `configs`
--


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
  KEY `company` (`company_id`),
  KEY `first_name` (`first_name`),
  KEY `last_name` (`last_name`),
  KEY `full_name` (`full_name`),
  KEY `email` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `company_id`, `support_id`, `is_company`, `is_taxable`, `photo`, `first_name`, `last_name`, `full_name`, `tags`, `job_position`, `phone`, `mobile`, `fax`, `email`, `website`, `street1`, `street2`, `city`, `state`, `zip`, `country`, `language`, `time_zone`, `cnpj`, `ie`, `start_dt`, `end_dt`, `credit_limit`, `total_purchased`, `total_refunded`, `total_invoiced`, `total_paid`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', NULL, NULL, 'yes', 'no', NULL, NULL, NULL, 'JKY Software Corp.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'English', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(2, NULL, NULL, NULL, NULL, 'Active', NULL, NULL, 'yes', 'yes', NULL, NULL, NULL, 'Tecno Malhas', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(3, NULL, NULL, NULL, NULL, 'Active', NULL, NULL, 'yes', 'yes', NULL, NULL, NULL, 'DL Malhas', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(4, NULL, NULL, NULL, NULL, 'Active', 1, NULL, 'no', 'yes', NULL, 'Pat', 'Jan', 'Pat Jan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(5, NULL, NULL, NULL, NULL, 'Active', 1, NULL, 'no', 'yes', NULL, 'Joel', 'Jan', 'Joel Jan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00');

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
  KEY `sequence` (`company_id`,`sequence`),
  KEY `group_set` (`group_set`,`sequence`),
  KEY `name` (`name`,`sequence`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1000000248 ;

--
-- Dumping data for table `controls`
--

INSERT INTO `controls` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `company_id`, `sequence`, `group_set`, `name`, `value`) VALUES
(1000000008, '2011-05-09 19:51:49', 1000000001, '2012-08-13 11:07:15', 1000000001, 'Active', 1000000001, 50, 'System Keys', 'SMTP', ''),
(1000000002, NULL, NULL, '2011-05-09 20:17:27', 1000000001, 'Active', 1000000001, 0, 'Root', 'Status Codes', ''),
(1000000003, NULL, NULL, '2011-05-09 20:06:10', 1000000001, 'Active', 1000000001, 0, 'Root', 'System Defaults', ''),
(1000000004, NULL, NULL, '2011-05-09 20:17:29', 1000000001, 'Active', 1000000001, 0, 'Root', 'System Keys', ''),
(1000000005, NULL, NULL, '2011-09-14 09:12:46', 1000000001, 'Active', 1000000001, 100, 'System Keys', 'Time Zone', 'America/Los_Angeles'),
(1000000006, NULL, NULL, '2011-05-14 20:33:09', 1000000001, 'Active', 1000000001, 110, 'System Keys', 'Email Status', 'stopped at 2010-12-24 19:47:05'),
(1000000007, NULL, NULL, '2011-05-09 20:17:44', 1000000001, 'Active', 1000000001, 400, 'System Keys', 'Upload Max File Size', '30M'),
(1000000009, '2011-05-09 20:02:51', 1000000001, '2012-02-10 07:53:26', 1000000001, 'Active', 1000000001, 200, 'System Keys', 'Email From System', 'noreply;noreply@jkysoftware.com'),
(1000000010, '2011-05-09 20:05:41', 1000000001, '2011-05-09 20:17:24', 1000000001, 'Active', 1000000001, 0, 'Root', 'Root', ''),
(1000000012, '2011-05-12 18:01:11', 1000000001, '2011-09-14 08:40:22', 1000000001, 'Active', 1000000001, 0, 'Status Codes', 'active', ''),
(1000000013, '2011-05-12 18:01:25', 1000000001, '2011-09-14 08:40:26', 1000000001, 'Active', 1000000001, 0, 'Status Codes', 'inactive', ''),
(1000000020, '2011-05-12 18:05:24', 1000000001, '2011-11-18 05:17:58', 1000000001, 'Active', 1000000001, 50, 'System Defaults', 'User Role', 'guest'),
(1000000022, '2011-05-12 18:07:45', 1000000001, '2011-11-18 05:18:26', 1000000001, 'Active', 1000000001, 50, 'System Defaults', 'Company Country', 'US'),
(1000000027, '2011-05-12 18:41:49', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Root', 'User Roles', ''),
(1000000028, '2011-05-12 18:42:09', 1000000001, '2012-02-09 06:54:50', 1000000001, 'Active', 1000000001, 20, 'User Roles', 'guest', 'home.php'),
(1000000029, '2011-05-12 18:42:19', 1000000001, '2012-02-05 09:36:23', 1000000001, 'Active', 1000000001, 30, 'User Roles', 'member', 'myinfo2.php'),
(1000000030, '2011-05-12 18:42:33', 1000000001, '2012-02-09 06:54:59', 1000000001, 'Active', 1000000001, 40, 'User Roles', 'teacher', 'home.php'),
(1000000031, '2011-05-12 18:42:46', 1000000001, '2012-04-03 07:56:31', 1000000001, 'Active', 1000000001, 60, 'User Roles', 'leader', 'groups.php'),
(1000000032, '2011-05-12 18:43:01', 1000000001, '2012-02-08 09:57:45', 1000000001, 'Active', 1000000001, 70, 'User Roles', 'account', 'payments.php'),
(1000000033, '2011-05-12 18:43:10', 1000000001, '2012-08-19 07:01:39', 1000000001, 'Active', 1000000001, 80, 'User Roles', 'admin', 'summary.php'),
(1000000034, '2011-05-12 18:43:20', 1000000001, '2011-11-17 06:17:45', 1000000001, 'Active', 1000000001, 90, 'User Roles', 'support', 'controls'),
(1000000037, '2011-05-15 06:22:43', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Root', 'User Resources', ''),
(1000000038, '2011-05-15 06:24:21', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Comments', ''),
(1000000039, '2011-05-15 06:24:28', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Controls', ''),
(1000000040, '2011-05-15 06:24:45', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Companies', ''),
(1000000056, '2011-05-15 07:19:47', 1000000001, NULL, NULL, 'Active', 1000000001, 200, 'User Actions', 'Login', ''),
(1000000042, '2011-05-15 06:25:10', 1000000001, '2011-05-18 16:44:58', 1000000001, 'Active', 1000000001, 50, 'User Resources', 'Tickets', ''),
(1000000043, '2011-05-15 06:25:16', 1000000001, '2011-05-18 16:45:28', 1000000001, 'Active', 1000000001, 50, 'User Resources', 'Permissions', ''),
(1000000044, '2011-05-15 06:30:40', 1000000001, '2011-05-15 06:37:37', 1000000001, 'Active', 1000000001, 0, 'Root', 'User Actions', ''),
(1000000045, '2011-05-15 06:33:00', 1000000001, '2011-05-15 12:51:11', 1000000001, 'Active', 1000000001, 20, 'User Actions', 'Denied', ''),
(1000000046, '2011-05-15 06:33:07', 1000000001, '2011-05-15 07:13:57', 1000000001, 'Active', 1000000001, 10, 'User Actions', 'All', ''),
(1000000047, '2011-05-15 06:33:23', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'View', ''),
(1000000048, '2011-05-15 06:33:38', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Insert', ''),
(1000000049, '2011-05-15 06:33:45', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Update', ''),
(1000000050, '2011-05-15 06:33:52', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Delete', ''),
(1000000051, '2011-05-15 06:34:03', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Publish', ''),
(1000000062, '2011-05-18 16:46:14', 1000000001, '2011-09-10 06:32:19', 1000000001, 'Active', 1000000001, 50, 'Status Codes', 'history', ''),
(1000000054, '2011-05-15 07:17:23', 1000000001, '2012-02-08 09:57:31', 1000000001, 'Active', 1000000001, 50, 'User Roles', 'captain', 'groups.php'),
(1000000055, '2011-05-15 07:18:25', 1000000001, '2011-05-18 16:45:34', 1000000001, 'Active', 1000000001, 50, 'User Resources', 'Users', ''),
(1000000057, '2011-05-15 07:19:58', 1000000001, NULL, NULL, 'Active', 1000000001, 210, 'User Actions', 'Logout', ''),
(1000000058, '2011-05-15 07:20:08', 1000000001, '2011-05-15 07:20:17', 1000000001, 'Active', 1000000001, 220, 'User Actions', 'Update Profile', ''),
(1000000059, '2011-05-15 09:38:14', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Export', ''),
(1000000060, '2011-05-16 19:41:20', 1000000001, NULL, NULL, 'Active', 1000000001, 10, 'User Resources', 'Home', ''),
(1000000061, '2011-05-16 19:41:56', 1000000001, '2012-02-09 06:54:42', 1000000001, 'Active', 1000000001, 10, 'User Roles', 'visitor', 'home.php'),
(1000000064, '2011-05-25 16:53:58', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Root', 'Company Types', ''),
(1000000065, '2011-05-25 16:54:19', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'Company Types', 'Domain', ''),
(1000000066, '2011-05-25 16:54:26', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'Company Types', 'Company', ''),
(1000000067, '2011-05-25 16:54:44', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'Company Types', 'Individual', ''),
(1000000073, '2011-05-29 09:56:52', 1000000001, NULL, NULL, 'Active', 1000000001, 20, 'User Resources', 'Admin', ''),
(1000000076, NULL, NULL, NULL, NULL, 'Active', 1000000001, 0, 'Root', 'Template Types', ''),
(1000000077, NULL, NULL, NULL, NULL, 'Active', 1000000001, 0, 'Template Types', 'by time', ''),
(1000000078, NULL, NULL, NULL, NULL, 'Active', 1000000001, 0, 'Template Types', 'by event', ''),
(1000000079, NULL, NULL, NULL, NULL, 'Active', 1000000001, 0, 'Template Types', 'mass email', ''),
(1000000080, '2011-06-09 17:42:29', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Categories', ''),
(1000000081, '2011-06-09 17:42:42', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Templates', ''),
(1000000082, '2011-06-26 21:29:49', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Models', ''),
(1000000083, '2011-06-26 21:31:02', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Products', ''),
(1000000107, '2011-09-13 17:52:11', 1000000001, '2011-09-27 06:44:32', 1000000001, 'Active', 1000000001, 50, 'User Resources', 'Services', ''),
(1000000197, '2011-09-17 07:39:10', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Group Types', 'tw', ''),
(1000000195, '2011-09-17 07:38:33', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Root', 'Group Types', ''),
(1000000196, '2011-09-17 07:39:02', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Group Types', 'us', ''),
(1000000200, '2011-11-18 06:03:48', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'My Info', ''),
(1000000201, '2012-04-25 08:28:07', 1000000001, '2012-07-20 16:47:41', 1000000001, 'Active', 1000000001, 0, 'Root', 'Display Rows', ''),
(1000000202, '2012-04-25 08:28:23', 1000000001, NULL, NULL, 'Active', 1000000001, 10, 'Display Rows', '10', ''),
(1000000203, '2012-04-25 08:28:33', 1000000001, NULL, NULL, 'Active', 1000000001, 20, 'Display Rows', '20', ''),
(1000000204, '2012-04-25 08:29:25', 1000000001, NULL, NULL, 'Active', 1000000001, 30, 'Display Rows', '50', ''),
(1000000205, '2012-04-25 08:30:16', 1000000001, NULL, NULL, 'Active', 1000000001, 40, 'Display Rows', '100', ''),
(1000000206, '2012-04-25 08:30:32', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'Display Rows', '200', ''),
(1000000207, '2012-04-25 08:30:44', 1000000001, NULL, NULL, 'Active', 1000000001, 60, 'Display Rows', '500', ''),
(1000000208, '2012-04-25 08:30:54', 1000000001, NULL, NULL, 'Active', 1000000001, 70, 'Display Rows', '1000', ''),
(1000000226, '2012-05-06 11:56:30', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Settings', ''),
(1000000227, '2012-06-02 06:14:46', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Actions', 'Combine', ''),
(1000000230, '2012-07-10 07:23:19', 1000000001, '2012-07-10 07:23:27', 1000000001, 'Active', 1000000001, 50, 'User Resources', 'Translations', ''),
(1000000231, '2012-08-06 08:13:29', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Root', 'Priorities', ''),
(1000000232, '2012-08-06 08:13:46', 1000000001, NULL, NULL, 'Active', 1000000001, 10, 'Priorities', 'minor', ''),
(1000000233, '2012-08-06 08:17:25', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'Priorities', 'normal', ''),
(1000000234, '2012-08-06 08:17:34', 1000000001, NULL, NULL, 'Active', 1000000001, 90, 'Priorities', 'major', ''),
(1000000235, '2012-08-06 08:17:45', 1000000001, NULL, NULL, 'Active', 1000000001, 99, 'Priorities', 'critical', ''),
(1000000236, '2012-08-15 13:45:03', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Root', 'Summary', ''),
(1000000237, '2012-08-15 13:45:21', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Count by Age', ''),
(1000000238, '2012-08-15 13:45:31', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Count by Church', ''),
(1000000239, '2012-08-15 13:45:49', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Count by Gift', ''),
(1000000240, '2012-08-15 13:49:14', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Language English', ''),
(1000000241, '2012-08-15 13:49:24', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Language Mandarim', ''),
(1000000242, '2012-08-15 13:49:35', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Language Taiwanese', ''),
(1000000243, '2012-08-15 13:49:44', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Percentage Completed', ''),
(1000000247, '2012-08-17 19:36:19', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Count by School Year', ''),
(1000000245, '2012-08-15 13:50:03', 1000000001, NULL, NULL, 'Active', 1000000001, 0, 'Summary', 'Tshirt Size', ''),
(1000000246, '2012-08-15 13:51:00', 1000000001, NULL, NULL, 'Active', 1000000001, 50, 'User Resources', 'Summary', '');

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
  KEY `contact` (`contact_id`),
  KEY `user_name` (`user_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `jky_users`
--

INSERT INTO `jky_users` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `contact_id`, `start_date`, `end_date`, `user_name`, `user_type`, `user_role`, `user_key`, `password`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', 4, '2012-09-24', NULL, 'patjan', 'Support', 'Support', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f');

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
  KEY `user_role` (`user_role`),
  KEY `user_resource` (`user_resource`),
  KEY `user_action` (`user_action`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `user_role`, `user_resource`, `user_action`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', 'Support', 'All', 'All');

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

