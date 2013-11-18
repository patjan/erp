DROP   TABLE IF     EXISTS Comments;
CREATE TABLE IF NOT EXISTS Comments
( id                BIGINT UNSIGNED     NOT NULL AUTO_INCREMENT
, updated_by        BIGINT UNSIGNED     DEFAULT NULL
, updated_at        DATETIME            DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'	# Private Staff

, parent_name       VARCHAR(32)         DEFAULT NULL
, parent_id         BIGINT UNSIGNED     DEFAULT NULL

, created_name      VARCHAR(255)        DEFAULT NULL		# ???
, created_email     VARCHAR(255)        DEFAULT NULL		# ???
, comment           TEXT                DEFAULT NULL

, PRIMARY KEY  		( id )
, KEY parent_id		( parent_name, parent_id )
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;