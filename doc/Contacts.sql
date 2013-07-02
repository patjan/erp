-- phpMyAdmin SQL Dump
-- version 3.5.8.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 02, 2013 at 09:55 AM
-- Server version: 5.5.23
-- PHP Version: 5.3.21

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `erp`
--

-- --------------------------------------------------------

--
-- Table structure for table `Contacts`
--

CREATE TABLE IF NOT EXISTS `Contacts` (
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
  `is_supplier` char(3) COLLATE utf8_unicode_ci DEFAULT 'No',
  `is_taxable` char(3) COLLATE utf8_unicode_ci DEFAULT 'Yes',
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nick_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
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
  UNIQUE KEY `nick_name` (`nick_name`),
  KEY `company` (`company_id`),
  KEY `first_name` (`first_name`),
  KEY `last_name` (`last_name`),
  KEY `email` (`email`),
  KEY `full_name` (`full_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=74 ;

--
-- Dumping data for table `Contacts`
--

INSERT INTO `Contacts` (`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`, `company_id`, `support_id`, `is_company`, `is_customer`, `is_supplier`, `is_taxable`, `photo`, `nick_name`, `first_name`, `last_name`, `full_name`, `tags`, `position`, `phone`, `mobile`, `fax`, `email`, `website`, `street1`, `street2`, `city`, `state`, `zip`, `country`, `language`, `time_zone`, `cnpj`, `ie`, `start_dt`, `end_dt`, `credit_limit`, `total_purchased`, `total_refunded`, `total_invoiced`, `total_paid`) VALUES
(1, NULL, NULL, '2013-06-09 18:18:16', 1, 'Active', NULL, NULL, 'Yes', 'No', 'No', 'No', 'JKY.gif,2013-06-09 18:18:17,1975', 'JKY', NULL, NULL, 'JKY Software Corp', '', '', '', '', '', 'pat.jan@jkysoftware.com', 'www.jkysoftware.com', '18781 Deep Well Rd', '', 'Santa Ana', '', '92705', 'US', 'English', '-8', '', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(2, NULL, NULL, '2013-06-03 21:40:27', 1, 'Active', NULL, NULL, 'Yes', 'No', 'No', 'Yes', NULL, 'Tecno', NULL, NULL, 'Tecno Malhas', '', '', '11 2274.3833', '', '11 2274.3865', 'suporte@metatex.com.br', 'www.metatex.com.br', 'Rua Baceunas, 51', '', 'Parque da Mooca', 'SP', '03127-060', 'BR', 'Portuguese', '-3', '', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(3, NULL, NULL, '2013-06-03 21:39:59', 1, 'Active', NULL, NULL, 'Yes', 'No', 'No', 'Yes', NULL, 'DL', NULL, NULL, 'DL Malhas', '', '', '', '', '', 'suporte@dlmalhas.com.br', '', '', '', '', 'AC', '', 'BR', 'Portuguese', '-3', '', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(4, NULL, NULL, '2013-06-22 21:44:42', 1, 'Active', 3, NULL, 'No', 'No', 'No', 'Yes', 'patjan.jpg,2013-06-22 21:44:39,423406', 'Pat', 'Pat', 'Jan', 'Pat Jan', NULL, 'Web Developer', 'null', '714-801-5752', 'null', 'pat_jan@hotmail.com', 'www.jkysoftware.com', '18781 Deep Well Rd', 'null', 'Santa Ana', 'CA', '92705', 'US', 'Portuguese', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(5, NULL, NULL, '2013-06-06 21:48:54', 1, 'Active', 3, NULL, 'No', 'No', 'No', 'Yes', 'joeljan.jpg,2013-06-06 21:48:57,140109', 'Joel', 'Joel', 'Jan', 'Joel Jan', NULL, 'Web Developer', 'null', '714-801-5757', 'null', 'joeljan92@hotmail.com', 'www.jkysoftware.com', '18781 Deep Well Rd', 'null', 'Santa Ana', 'CA', '92705', 'US', 'Portuguese', '-8', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(6, NULL, NULL, '2013-06-03 21:38:48', 1, 'Active', 3, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Marcelo', 'Marcelo', 'Lodi', 'Marcelo Lodi', NULL, NULL, '', '', '', '', '', '', '', '', 'AC', '', 'BR', 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(33, '2013-05-18 06:52:10', 1, '2013-06-03 21:34:09', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Avanti', NULL, NULL, 'Avanti Industria Comercio Importacao e Exportacao Ltda', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '03681757/0001-86', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(34, '2013-05-18 06:52:57', 1, '2013-06-03 21:34:21', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Cocamar', NULL, NULL, 'Cocamar Cooperativa Agroindustrial', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '79114450/0027-02', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(35, '2013-05-18 06:53:23', 1, '2013-06-07 07:21:13', 26, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Nova Esp', NULL, NULL, 'Cooperativa Nova Esperanca', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '02756023/0001-56', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(36, '2013-05-18 06:54:25', 1, '2013-06-03 21:27:45', 1, 'Active', NULL, NULL, 'Yes', 'Yes', 'No', 'Yes', NULL, 'Confeccoes', NULL, NULL, 'Confeccoes Ltda', 'Distribuidor', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(37, '2013-05-18 06:54:52', 1, '2013-06-03 21:27:57', 1, 'Active', NULL, NULL, 'Yes', 'Yes', 'No', 'Yes', NULL, 'Multimidia', NULL, NULL, 'Multimidia Ltda-me', 'Distribuidor', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(38, '2013-05-18 06:55:29', 1, '2013-06-03 21:27:31', 1, 'Active', NULL, NULL, 'Yes', 'Yes', 'No', 'Yes', NULL, 'AM', NULL, NULL, 'A & M Noroeste Texil Ltda', 'Distribuidor', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(39, '2013-05-27 11:36:15', 3, '2013-06-03 21:37:52', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'TBM', NULL, NULL, 'TBM Textil Bezerra de Menezes S/A', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '07671092/0001-80', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(40, '2013-05-27 11:36:32', 3, '2013-06-03 21:35:37', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'CREAORA', NULL, NULL, 'CREORA ELASTANOS', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(41, '2013-05-27 11:36:46', 3, '2013-06-03 21:35:50', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Alpina', NULL, NULL, 'Fiacao Alpina Ltda', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '49418890/0001-45', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(42, '2013-05-30 13:18:47', 3, '2013-06-03 21:34:30', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Cocari', NULL, NULL, 'Cocari Cooperativa Agro e Industrial', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '78956968/0017-40', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(43, '2013-05-30 13:19:22', 3, '2013-06-21 11:43:25', 3, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Cotan', NULL, NULL, 'Coteminas S/A', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '07663140/0005-12', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(44, '2013-05-30 13:19:55', 3, '2013-06-07 07:22:00', 26, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Cotonificio', NULL, NULL, 'Cotonificio de Andira S/A', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '59108779/0001-06', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(45, '2013-05-30 13:22:22', 3, '2013-06-03 21:36:04', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Sao Bento', NULL, NULL, 'Fiacao Sao Bento  S/A', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '86046414/0001-77', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(46, '2013-05-30 13:22:53', 3, '2013-06-03 21:36:13', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Fiotex', NULL, NULL, 'Fiotex Industrial S/A', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '07648272/0001-41', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(47, '2013-05-30 13:23:31', 3, '2013-06-03 21:36:26', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Guabifios', NULL, NULL, 'Guabifios Produtos Texteis Ltda', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '06925672/0001-94', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(48, '2013-05-30 13:24:23', 3, '2013-06-03 21:36:39', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Huvispan', NULL, NULL, 'Huvispan Industria e Comercio de Fios Ltda', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '05810004/0001-59', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(49, '2013-05-30 13:25:01', 3, '2013-06-03 21:36:46', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Sueco', NULL, NULL, 'Industria Textil Sueco Ltda', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '62781778/0015-38', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(50, '2013-05-30 13:25:43', 3, '2013-06-03 21:36:55', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Keter', NULL, NULL, 'Keter Importacao e Exportacao Ltda', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '07428876/0003-44', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(51, '2013-05-30 13:26:30', 3, '2013-06-03 21:37:06', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Kurashiki', NULL, NULL, 'Kurashiki do Brasil Textil Ltda', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '89729156/0004-64', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(52, '2013-05-30 13:27:20', 3, '2013-06-03 21:37:18', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Link', NULL, NULL, 'Link Comercio Importacao e Exportacao Ltda', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '06089521/0001-43', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(53, '2013-05-30 13:28:15', 3, '2013-06-03 21:37:24', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Omi', NULL, NULL, 'Omi do Brasil Textil S/A', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '51422970/0001-16', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(54, '2013-05-30 13:28:46', 3, '2013-06-03 21:37:32', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Osasuna', NULL, NULL, 'Osasuna Participacoes Ltda', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '03941904/0001-00', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(55, '2013-05-30 13:29:24', 3, '2013-06-03 21:37:44', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Rapsodia', NULL, NULL, 'Rapsodia Importacao e Exportacao Ltda', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '05548499/0002-70', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(56, '2013-05-30 13:29:54', 3, '2013-06-03 21:37:59', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Tebasa', NULL, NULL, 'Tebasa S/A', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '07298995/0001-68', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(57, '2013-05-30 13:30:28', 3, '2013-06-03 21:38:07', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Sao Joao', NULL, NULL, 'Textil Sao Joao S/A', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '59760553/0001-95', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(58, '2013-05-30 13:31:07', 3, '2013-06-03 21:38:21', 1, 'Active', NULL, NULL, 'Yes', 'No', 'Yes', 'Yes', NULL, 'Uniao', NULL, NULL, 'Textil Uniao S/A', '', '', '', '', '', '', '', '', '', '', 'SP', '', 'BR', 'Portuguese', '-3', '07971955/0001-35', '', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(59, '2013-06-07 06:09:29', 1, '2013-06-07 06:12:21', 1, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'San', 'San', 'Liu', 'San Liu', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(60, '2013-06-07 06:10:02', 1, '2013-06-07 06:11:52', 1, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Helena', 'Helena', 'Liu', 'Helena Liu', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(61, '2013-06-07 06:10:28', 1, '2013-06-07 06:12:08', 1, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Juliana', 'Juliana', 'Liu', 'Juliana Liu', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(62, '2013-06-07 06:10:54', 1, '2013-06-07 06:11:40', 1, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Daniel', 'Daniel', 'Liu', 'Daniel Liu', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(63, '2013-06-07 06:20:32', 1, NULL, NULL, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Admin', 'Admin', 'User', 'Admin User', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(64, '2013-06-07 06:21:08', 1, NULL, NULL, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Visitor', 'Visitor', 'User', 'Visitor User', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(65, '2013-06-07 06:21:57', 1, NULL, NULL, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Guest', 'Guest', 'User', 'Guest User', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(66, '2013-06-07 06:22:23', 1, NULL, NULL, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Sales', 'Sales', 'User', 'Sales User', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(67, '2013-06-07 06:23:16', 1, NULL, NULL, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Sales Manager', 'Sales Manager', 'User', 'Sales Manager User', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(68, '2013-06-07 06:24:31', 1, NULL, NULL, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Maintenance', 'Maintenance', 'User', 'Maintenance User', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(69, '2013-06-07 06:25:11', 1, NULL, NULL, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Thread Manager', 'Thread Manager', 'User', 'Thread Manager User', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(70, '2013-06-07 06:25:38', 1, NULL, NULL, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Crus Manager', 'Crus Manager', 'User', 'Crus Manager User', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(71, '2013-06-19 05:35:34', 1, NULL, NULL, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Production', 'Production', 'User', 'Production User', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(72, '2013-06-21 06:00:42', 1, '2013-06-21 06:22:29', 1, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Purchases', 'Purchases', 'User', 'Purchases User', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00'),
(73, '2013-07-01 06:25:41', 3, NULL, NULL, 'Active', NULL, NULL, 'No', 'No', 'No', 'Yes', NULL, 'Dailson', 'Dailson', 'Souza', 'Dailson Souza', NULL, NULL, NULL, '', NULL, 'adm@dlmalhas.com.br', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Portuguese', '-3', NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
