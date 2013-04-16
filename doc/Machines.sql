-- phpMyAdmin SQL Dump
-- version 3.3.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 15, 2013 at 09:31 PM
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
  `repair_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `machines`
--

INSERT INTO `machines` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `name`, `machine_type`, `machine_brand`, `diameter`, `width`, `density`, `inputs`, `lanes`, `repair_date`, `return_date`) VALUES
(1, '2013-04-10 21:39:10', 4, '2013-04-15 21:25:08', 4, 'Active', 'Altesa', 'undefined', 'BRAND1', 100, 200, 300, 50, 6, '2013-04-10', '2013-04-11'),
(2, '2013-04-10 21:40:59', 4, '2013-04-15 21:25:09', 4, 'Active', 'Ana', 'undefined', 'BRAND1', 120, 210, 140, 60, 4, '2013-04-12', '2013-04-13'),
(3, '2013-04-11 19:27:04', 4, '2013-04-15 21:25:11', 4, 'Active', 'Angelica', 'undefined', 'BRAND1', 100, 200, 300, 400, 500, '2013-04-13', '2013-04-14'),
(4, '2013-04-15 21:23:30', 4, '2013-04-15 21:25:23', 4, 'Active', 'Angelina', 'undefined', 'BRAND1', 0, 0, 0, 0, 0, '2013-04-15', NULL);
