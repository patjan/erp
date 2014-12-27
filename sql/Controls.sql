DROP   TABLE IF     EXISTS Controls;
CREATE TABLE IF NOT EXISTS Controls
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, company_id		BIGINT				DEFAULT 1
, sequence			INTEGER				DEFAULT 0
, group_set			VARCHAR(32)			DEFAULT 'Root'
, name				VARCHAR(255)		DEFAULT NULL		/* unique by group_set */
, value				TEXT				DEFAULT NULL
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, UNIQUE(group_set, name)
, KEY sequence	(company_id	, sequence)
, KEY groupset	(group_set	, sequence)
, KEY name		(name		, sequence)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT INTO `controls` (`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `company_id`, `group_set`, `sequence`, `name`, `value`) VALUES
(1000000008, 1000000001, '2011-05-09 19:51:49', 1000000001, '2012-08-13 11:07:15', 'active', 1000000001, 'System Keys', 50, 'SMTP', ''),
(1000000002, NULL, NULL, 1000000001, '2011-05-09 20:17:27', 'active', 1000000001, 'Root', 0, 'Status Codes', ''),
(1000000003, NULL, NULL, 1000000001, '2011-05-09 20:06:10', 'active', 1000000001, 'Root', 0, 'System Defaults', ''),
(1000000004, NULL, NULL, 1000000001, '2011-05-09 20:17:29', 'active', 1000000001, 'Root', 0, 'System Keys', ''),
(1000000005, NULL, NULL, 1000000001, '2011-09-14 09:12:46', 'active', 1000000001, 'System Keys', 100, 'Time Zone', 'America/Los_Angeles'),
(1000000006, NULL, NULL, 1000000001, '2011-05-14 20:33:09', 'active', 1000000001, 'System Keys', 110, 'Email Status', 'stopped at 2010-12-24 19:47:05'),
(1000000007, NULL, NULL, 1000000001, '2011-05-09 20:17:44', 'active', 1000000001, 'System Keys', 400, 'Upload Max File Size', '30M'),
(1000000009, 1000000001, '2011-05-09 20:02:51', 1000000001, '2012-02-10 07:53:26', 'active', 1000000001, 'System Keys', 200, 'Email From System', 'noreply;noreply@jkysoftware.com'),
(1000000010, 1000000001, '2011-05-09 20:05:41', 1000000001, '2011-05-09 20:17:24', 'active', 1000000001, 'Root', 0, 'Root', ''),
(1000000012, 1000000001, '2011-05-12 18:01:11', 1000000001, '2011-09-14 08:40:22', 'active', 1000000001, 'Status Codes', 0, 'active', ''),
(1000000013, 1000000001, '2011-05-12 18:01:25', 1000000001, '2011-09-14 08:40:26', 'active', 1000000001, 'Status Codes', 0, 'inactive', ''),
(1000000020, 1000000001, '2011-05-12 18:05:24', 1000000001, '2011-11-18 05:17:58', 'active', 1000000001, 'System Defaults', 50, 'User Role', 'guest'),
(1000000022, 1000000001, '2011-05-12 18:07:45', 1000000001, '2011-11-18 05:18:26', 'active', 1000000001, 'System Defaults', 50, 'Company Country', 'US'),
(1000000027, 1000000001, '2011-05-12 18:41:49', NULL, NULL, 'active', 1000000001, 'Root', 0, 'User Roles', ''),
(1000000028, 1000000001, '2011-05-12 18:42:09', 1000000001, '2012-02-09 06:54:50', 'active', 1000000001, 'User Roles', 20, 'guest', 'home.php'),
(1000000029, 1000000001, '2011-05-12 18:42:19', 1000000001, '2012-02-05 09:36:23', 'active', 1000000001, 'User Roles', 30, 'member', 'myinfo2.php'),
(1000000030, 1000000001, '2011-05-12 18:42:33', 1000000001, '2012-02-09 06:54:59', 'active', 1000000001, 'User Roles', 40, 'teacher', 'home.php'),
(1000000031, 1000000001, '2011-05-12 18:42:46', 1000000001, '2012-04-03 07:56:31', 'active', 1000000001, 'User Roles', 60, 'leader', 'groups.php'),
(1000000032, 1000000001, '2011-05-12 18:43:01', 1000000001, '2012-02-08 09:57:45', 'active', 1000000001, 'User Roles', 70, 'account', 'payments.php'),
(1000000033, 1000000001, '2011-05-12 18:43:10', 1000000001, '2012-08-19 07:01:39', 'active', 1000000001, 'User Roles', 80, 'admin', 'summary.php'),
(1000000034, 1000000001, '2011-05-12 18:43:20', 1000000001, '2011-11-17 06:17:45', 'active', 1000000001, 'User Roles', 90, 'support', 'controls'),
(1000000037, 1000000001, '2011-05-15 06:22:43', NULL, NULL, 'active', 1000000001, 'Root', 0, 'User Resources', ''),
(1000000038, 1000000001, '2011-05-15 06:24:21', NULL, NULL, 'active', 1000000001, 'User Resources', 50, 'Comments', ''),
(1000000039, 1000000001, '2011-05-15 06:24:28', NULL, NULL, 'active', 1000000001, 'User Resources', 50, 'Controls', ''),
(1000000040, 1000000001, '2011-05-15 06:24:45', NULL, NULL, 'active', 1000000001, 'User Resources', 50, 'Companies', ''),
(1000000056, 1000000001, '2011-05-15 07:19:47', NULL, NULL, 'active', 1000000001, 'User Actions', 200, 'Login', ''),
(1000000042, 1000000001, '2011-05-15 06:25:10', 1000000001, '2011-05-18 16:44:58', 'active', 1000000001, 'User Resources', 50, 'Tickets', ''),
(1000000043, 1000000001, '2011-05-15 06:25:16', 1000000001, '2011-05-18 16:45:28', 'active', 1000000001, 'User Resources', 50, 'Permissions', ''),
(1000000044, 1000000001, '2011-05-15 06:30:40', 1000000001, '2011-05-15 06:37:37', 'active', 1000000001, 'Root', 0, 'User Actions', ''),
(1000000045, 1000000001, '2011-05-15 06:33:00', 1000000001, '2011-05-15 12:51:11', 'active', 1000000001, 'User Actions', 20, 'Denied', ''),
(1000000046, 1000000001, '2011-05-15 06:33:07', 1000000001, '2011-05-15 07:13:57', 'active', 1000000001, 'User Actions', 10, 'All', ''),
(1000000047, 1000000001, '2011-05-15 06:33:23', NULL, NULL, 'active', 1000000001, 'User Actions', 50, 'View', ''),
(1000000048, 1000000001, '2011-05-15 06:33:38', NULL, NULL, 'active', 1000000001, 'User Actions', 50, 'Insert', ''),
(1000000049, 1000000001, '2011-05-15 06:33:45', NULL, NULL, 'active', 1000000001, 'User Actions', 50, 'Update', ''),
(1000000050, 1000000001, '2011-05-15 06:33:52', NULL, NULL, 'active', 1000000001, 'User Actions', 50, 'Delete', ''),
(1000000051, 1000000001, '2011-05-15 06:34:03', NULL, NULL, 'active', 1000000001, 'User Actions', 50, 'Publish', ''),
(1000000062, 1000000001, '2011-05-18 16:46:14', 1000000001, '2011-09-10 06:32:19', 'active', 1000000001, 'Status Codes', 50, 'history', ''),
(1000000054, 1000000001, '2011-05-15 07:17:23', 1000000001, '2012-02-08 09:57:31', 'active', 1000000001, 'User Roles', 50, 'captain', 'groups.php'),
(1000000055, 1000000001, '2011-05-15 07:18:25', 1000000001, '2011-05-18 16:45:34', 'active', 1000000001, 'User Resources', 50, 'Users', ''),
(1000000057, 1000000001, '2011-05-15 07:19:58', NULL, NULL, 'active', 1000000001, 'User Actions', 210, 'Logout', ''),
(1000000058, 1000000001, '2011-05-15 07:20:08', 1000000001, '2011-05-15 07:20:17', 'active', 1000000001, 'User Actions', 220, 'Update Profile', ''),
(1000000059, 1000000001, '2011-05-15 09:38:14', NULL, NULL, 'active', 1000000001, 'User Actions', 50, 'Export', ''),
(1000000060, 1000000001, '2011-05-16 19:41:20', NULL, NULL, 'active', 1000000001, 'User Resources', 10, 'Home', ''),
(1000000061, 1000000001, '2011-05-16 19:41:56', 1000000001, '2012-02-09 06:54:42', 'active', 1000000001, 'User Roles', 10, 'visitor', 'home.php'),
(1000000064, 1000000001, '2011-05-25 16:53:58', NULL, NULL, 'active', 1000000001, 'Root', 0, 'Company Types', ''),
(1000000065, 1000000001, '2011-05-25 16:54:19', NULL, NULL, 'active', 1000000001, 'Company Types', 50, 'Domain', ''),
(1000000066, 1000000001, '2011-05-25 16:54:26', NULL, NULL, 'active', 1000000001, 'Company Types', 50, 'Company', ''),
(1000000067, 1000000001, '2011-05-25 16:54:44', NULL, NULL, 'active', 1000000001, 'Company Types', 50, 'Individual', ''),
(1000000073, 1000000001, '2011-05-29 09:56:52', NULL, NULL, 'active', 1000000001, 'User Resources', 20, 'Admin', ''),
(1000000076, NULL, NULL, NULL, NULL, 'active', 1000000001, 'Root', 0, 'Template Types', ''),
(1000000077, NULL, NULL, NULL, NULL, 'active', 1000000001, 'Template Types', 0, 'by time', ''),
(1000000078, NULL, NULL, NULL, NULL, 'active', 1000000001, 'Template Types', 0, 'by event', ''),
(1000000079, NULL, NULL, NULL, NULL, 'active', 1000000001, 'Template Types', 0, 'mass email', ''),
(1000000080, 1000000001, '2011-06-09 17:42:29', NULL, NULL, 'active', 1000000001, 'User Resources', 50, 'Categories', ''),
(1000000081, 1000000001, '2011-06-09 17:42:42', NULL, NULL, 'active', 1000000001, 'User Resources', 50, 'Templates', ''),
(1000000082, 1000000001, '2011-06-26 21:29:49', NULL, NULL, 'active', 1000000001, 'User Resources', 50, 'Models', ''),
(1000000083, 1000000001, '2011-06-26 21:31:02', NULL, NULL, 'active', 1000000001, 'User Resources', 50, 'Products', ''),
(1000000107, 1000000001, '2011-09-13 17:52:11', 1000000001, '2011-09-27 06:44:32', 'active', 1000000001, 'User Resources', 50, 'Services', ''),
(1000000197, 1000000001, '2011-09-17 07:39:10', NULL, NULL, 'active', 1000000001, 'Group Types', 0, 'tw', ''),
(1000000195, 1000000001, '2011-09-17 07:38:33', NULL, NULL, 'active', 1000000001, 'Root', 0, 'Group Types', ''),
(1000000196, 1000000001, '2011-09-17 07:39:02', NULL, NULL, 'active', 1000000001, 'Group Types', 0, 'us', ''),
(1000000200, 1000000001, '2011-11-18 06:03:48', NULL, NULL, 'active', 1000000001, 'User Resources', 50, 'My Info', ''),
(1000000201, 1000000001, '2012-04-25 08:28:07', 1000000001, '2012-07-20 16:47:41', 'active', 1000000001, 'Root', 0, 'Display Rows', ''),
(1000000202, 1000000001, '2012-04-25 08:28:23', NULL, NULL, 'active', 1000000001, 'Display Rows', 10, '10', ''),
(1000000203, 1000000001, '2012-04-25 08:28:33', NULL, NULL, 'active', 1000000001, 'Display Rows', 20, '20', ''),
(1000000204, 1000000001, '2012-04-25 08:29:25', NULL, NULL, 'active', 1000000001, 'Display Rows', 30, '50', ''),
(1000000205, 1000000001, '2012-04-25 08:30:16', NULL, NULL, 'active', 1000000001, 'Display Rows', 40, '100', ''),
(1000000206, 1000000001, '2012-04-25 08:30:32', NULL, NULL, 'active', 1000000001, 'Display Rows', 50, '200', ''),
(1000000207, 1000000001, '2012-04-25 08:30:44', NULL, NULL, 'active', 1000000001, 'Display Rows', 60, '500', ''),
(1000000208, 1000000001, '2012-04-25 08:30:54', NULL, NULL, 'active', 1000000001, 'Display Rows', 70, '1000', ''),
(1000000226, 1000000001, '2012-05-06 11:56:30', NULL, NULL, 'active', 1000000001, 'User Resources', 50, 'Settings', ''),
(1000000227, 1000000001, '2012-06-02 06:14:46', NULL, NULL, 'active', 1000000001, 'User Actions', 50, 'Combine', ''),
(1000000230, 1000000001, '2012-07-10 07:23:19', 1000000001, '2012-07-10 07:23:27', 'active', 1000000001, 'User Resources', 50, 'Translations', ''),
(1000000231, 1000000001, '2012-08-06 08:13:29', NULL, NULL, 'active', 1000000001, 'Root', 0, 'Priorities', ''),
(1000000232, 1000000001, '2012-08-06 08:13:46', NULL, NULL, 'active', 1000000001, 'Priorities', 10, 'minor', ''),
(1000000233, 1000000001, '2012-08-06 08:17:25', NULL, NULL, 'active', 1000000001, 'Priorities', 50, 'normal', ''),
(1000000234, 1000000001, '2012-08-06 08:17:34', NULL, NULL, 'active', 1000000001, 'Priorities', 90, 'major', ''),
(1000000235, 1000000001, '2012-08-06 08:17:45', NULL, NULL, 'active', 1000000001, 'Priorities', 99, 'critical', ''),
(1000000236, 1000000001, '2012-08-15 13:45:03', NULL, NULL, 'active', 1000000001, 'Root', 0, 'Summary', ''),
(1000000237, 1000000001, '2012-08-15 13:45:21', NULL, NULL, 'active', 1000000001, 'Summary', 0, 'Count by Age', ''),
(1000000238, 1000000001, '2012-08-15 13:45:31', NULL, NULL, 'active', 1000000001, 'Summary', 0, 'Count by Church', ''),
(1000000239, 1000000001, '2012-08-15 13:45:49', NULL, NULL, 'active', 1000000001, 'Summary', 0, 'Count by Gift', ''),
(1000000240, 1000000001, '2012-08-15 13:49:14', NULL, NULL, 'active', 1000000001, 'Summary', 0, 'Language English', ''),
(1000000241, 1000000001, '2012-08-15 13:49:24', NULL, NULL, 'active', 1000000001, 'Summary', 0, 'Language Mandarim', ''),
(1000000242, 1000000001, '2012-08-15 13:49:35', NULL, NULL, 'active', 1000000001, 'Summary', 0, 'Language Taiwanese', ''),
(1000000243, 1000000001, '2012-08-15 13:49:44', NULL, NULL, 'active', 1000000001, 'Summary', 0, 'Percentage Completed', ''),
(1000000247, 1000000001, '2012-08-17 19:36:19', NULL, NULL, 'active', 1000000001, 'Summary', 0, 'Count by School Year', ''),
(1000000245, 1000000001, '2012-08-15 13:50:03', NULL, NULL, 'active', 1000000001, 'Summary', 0, 'Tshirt Size', ''),
(1000000246, 1000000001, '2012-08-15 13:51:00', NULL, NULL, 'active', 1000000001, 'User Resources', 50, 'Summary', '');

ALTER TABLE Controls	ADD		remarks				TEXT		 	DEFAULT NULL	AFTER value;
