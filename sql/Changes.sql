DROP   TABLE IF     EXISTS Changes;
CREATE TABLE IF NOT EXISTS Changes
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_at		VARCHAR(32)			DEFAULT NULL	# yyyy-mm-dd hh:mm:ss.uuuuuu (from PHP)
, table_name		VARCHAR(32)			DEFAULT NULL
, table_id			BIGINT				DEFAULT NULL
, servers			VARCHAR(32)			DEFAULT ''		# 1 2 9

, PRIMARY KEY(id)
, KEY created_at(created_at)
, KEY name_id(table_name, table_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1000000001
;

UPDATE		Changes			SET		servers = '';
UPDATE		Changes			SET		servers = ''	WHERE table_name = 'Batches';

ALTER TABLE Changes			CHANGE	servers			servers			VARCHAR(32)		DEFAULT '';
ALTER TABLE Changes			CHANGE	created_at		updated_at		VARCHAR(32)		DEFAULT NULL;

ALTER TABLE Changes			ADD KEY name_id(table_name, table_id);
