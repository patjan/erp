-- phpMyAdmin SQL Dump
-- version 3.3.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 08, 2013 at 04:37 PM
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=31 ;

--
-- Dumping data for table `configs`
--

INSERT INTO `configs` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `company_id`, `sequence`, `group_set`, `name`, `value`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', 3, 0, 'Root', 'Root', NULL),
(2, '2013-04-08 14:53:58', 4, NULL, NULL, 'Active', 1, 50, 'Root', 'Countries', ''),
(3, '2013-04-08 15:11:48', 4, NULL, NULL, 'Active', 1, 50, 'Root', 'States', ''),
(4, '2013-04-08 15:13:00', 4, '2013-04-08 15:13:23', 4, 'Active', 1, 50, 'Countries', 'US', 'United States'),
(5, '2013-04-08 15:13:45', 4, NULL, NULL, 'Active', 1, 50, 'Countries', 'BR', 'Brasil'),
(6, '2013-04-08 15:14:32', 4, NULL, NULL, 'Active', 1, 50, 'States', 'AC', 'Acre'),
(7, '2013-04-08 15:14:39', 4, NULL, NULL, 'Active', 1, 50, 'States', 'CA', 'California'),
(8, '2013-04-08 15:14:49', 4, NULL, NULL, 'Active', 1, 50, 'States', 'AL', 'Alagoas'),
(9, '2013-04-08 15:14:59', 4, NULL, NULL, 'Active', 1, 50, 'States', 'AP', 'Amapa'),
(10, '2013-04-08 15:15:51', 4, NULL, NULL, 'Active', 1, 50, 'States', 'AM', 'Amazonas'),
(11, '2013-04-08 15:15:59', 4, NULL, NULL, 'Active', 1, 50, 'States', 'BA', 'Bahia'),
(12, '2013-04-08 15:16:05', 4, NULL, NULL, 'Active', 1, 50, 'States', 'CE', 'Ceara'),
(13, '2013-04-08 15:16:16', 4, NULL, NULL, 'Active', 1, 50, 'States', 'DF', 'Distrito Federal'),
(14, '2013-04-08 15:16:27', 4, NULL, NULL, 'Active', 1, 50, 'States', 'ES', 'Espirito Santo'),
(15, '2013-04-08 15:16:36', 4, NULL, NULL, 'Active', 1, 50, 'States', 'GO', 'Goias'),
(16, '2013-04-08 15:16:48', 4, NULL, NULL, 'Active', 1, 50, 'States', 'MA', 'Maranhao'),
(17, '2013-04-08 15:16:59', 4, NULL, NULL, 'Active', 1, 50, 'States', 'MT', 'Mato Grosso'),
(18, '2013-04-08 15:17:09', 4, NULL, NULL, 'Active', 1, 50, 'States', 'MS', 'Mato Grosso do Sul'),
(19, '2013-04-08 15:17:15', 4, NULL, NULL, 'Active', 1, 50, 'States', 'MG', 'Minas Gerais'),
(20, '2013-04-08 15:17:28', 4, NULL, NULL, 'Active', 1, 50, 'States', 'PA', 'Para'),
(21, '2013-04-08 15:17:35', 4, NULL, NULL, 'Active', 1, 50, 'States', 'PB', 'Paraiba'),
(22, '2013-04-08 15:17:43', 4, NULL, NULL, 'Active', 1, 50, 'States', 'PE', 'Pernambuco'),
(23, '2013-04-08 15:17:50', 4, NULL, NULL, 'Active', 1, 50, 'States', 'PI', 'Piaui'),
(24, '2013-04-08 15:18:00', 4, NULL, NULL, 'Active', 1, 50, 'States', 'RJ', 'Rio de Janeiro'),
(25, '2013-04-08 15:18:14', 4, NULL, NULL, 'Active', 1, 50, 'States', 'RS', 'Rio Grande de Sul'),
(26, '2013-04-08 15:18:29', 4, NULL, NULL, 'Active', 1, 50, 'States', 'RO', 'Rondonia'),
(27, '2013-04-08 15:18:36', 4, NULL, NULL, 'Active', 1, 50, 'States', 'RR', 'Roraima'),
(28, '2013-04-08 15:18:43', 4, NULL, NULL, 'Active', 1, 50, 'States', 'SP', 'Sao Paulo'),
(29, '2013-04-08 15:18:49', 4, NULL, NULL, 'Active', 1, 50, 'States', 'SE', 'Sergipe'),
(30, '2013-04-08 15:18:59', 4, NULL, NULL, 'Active', 1, 50, 'States', 'TO', 'Tocantins');
