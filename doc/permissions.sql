-- phpMyAdmin SQL Dump
-- version 3.3.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 25, 2013 at 03:38 PM
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
