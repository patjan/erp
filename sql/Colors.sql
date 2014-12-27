DROP   TABLE IF     EXISTS Colors;
CREATE TABLE IF NOT EXISTS Colors
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, color_code		VARCHAR(32)			DEFAULT NULL
, color_type		VARCHAR(32)			DEFAULT NULL
, color_name		VARCHAR(255)		DEFAULT NULL
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY	(id)
, UNIQUE		(color_code)
, KEY type		(color_type)
, KEY name		(color_name)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT INTO Colors (created_at, updated_at, status, color_code, color_name, color_type)
SELECT cores.Created, cores.Updated, cores.Status, cores.Codigo, cores.Nome, cores.Classific
  FROM cores
;

UPDATE Colors	SET status		= 'Active'		WHERE status	 = 'A';

UPDATE Colors	SET color_type	= 'Bco'			WHERE color_type = 'CL';
UPDATE Colors	SET color_type	= 'Clara'		WHERE color_type = 'MD';
UPDATE Colors	SET color_type	= 'Media'		WHERE color_type = 'EC';
UPDATE Colors	SET color_type	= 'Intermedia'	WHERE color_type = 'EP';
UPDATE Colors	SET color_type	= 'Escura'		WHERE color_type = 'SE';
UPDATE Colors	SET color_type	= 'Mescla'		WHERE color_type = 'MC';
UPDATE Colors	SET color_type	= 'Unico'		WHERE color_type = 'UN';
UPDATE Colors	SET color_type	= 'Branco'		WHERE color_type = 'BR';
UPDATE Colors	SET color_type	= 'Preto'		WHERE color_type = 'PR';
UPDATE Colors	SET color_type	= 'Fraca'		WHERE color_type = 'FC';
UPDATE Colors	SET color_type	= 'Forte'		WHERE color_type = 'FT';

UPDATE Colors	SET color_name	= LCASE(color_name);

ALTER TABLE Colors			ADD COLUMN remarks    			TEXT   			DEFAULT NULL  	AFTER color_name;
