DROP   TABLE IF     EXISTS History;
CREATE TABLE IF NOT EXISTS History
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL

, parent_name       VARCHAR(32)         NULL
, parent_id         BIGINT UNSIGNED     NULL

, method			VARCHAR(32)         NULL        #   insert, update, delete
, history           TEXT                NULL        #   json format

, PRIMARY KEY(id)
, KEY parent   ( parent_name, parent_id )
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1000000001
;

