DROP   TABLE IF     EXISTS JKY_Users;
CREATE TABLE IF NOT EXISTS JKY_Users
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, contact_id		BIGINT				DEFAULT NULL
, start_date		DATE				DEFAULT NULL
, end_date			DATE				DEFAULT NULL
, user_name			VARCHAR(255)		NOT NULL		// unique
, user_type 		VARCHAR(32)			DEFAULT 'User'
, user_role 		VARCHAR(32)			DEFAULT 'Guest'
, user_key 			VARCHAR(255)		DEFAULT NULL
, password			VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(user_name)
, KEY contact		(contact_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT INTO JKY_Users
(`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `contact_id`, `start_date`, `end_date`, `user_name`, `user_type`, `user_role`, `user_key`, `password`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', 4, '2012-09-24', NULL, 'patjan', 'Support', 'Support', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f');
INSERT INTO JKY_Users
(`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `contact_id`, `start_date`, `end_date`, `user_name`, `user_type`, `user_role`, `user_key`, `password`) VALUES
(2, NULL, NULL, NULL, NULL, 'Active', 5, '2012-09-24', NULL, 'joeljan', 'Support', 'Support', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f');
