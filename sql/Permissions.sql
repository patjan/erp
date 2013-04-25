DROP   TABLE IF     EXISTS Permissions;
CREATE TABLE IF NOT EXISTS Permissions
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, user_role			VARCHAR(32)			DEFAULT NULL		// unique
, user_resource		VARCHAR(32)			DEFAULT NULL
, user_action		VARCHAR(32)			DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(user_role, user_resource, user_action)
, KEY user_role		(user_role		)
, KEY user_action	(user_action	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT INTO Permissions
( `id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `user_role`, `user_resource`, `user_action`) VALUES
( 1, NULL, NULL, NULL, NULL, 'active', 'support', 'All', 'All')
;
