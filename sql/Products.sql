DROP   TABLE IF     EXISTS Products;
CREATE TABLE IF NOT EXISTS Products
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, parent_id			BIGINT				DEFAULT NULL
, product_name		VARCHAR(255)		DEFAULT NULL
, product_type		VARCHAR(32)			DEFAULT 'Tubular'
, finishing			VARCHAR(255)		DEFAULT NULL
, start_date		DATE				DEFAULT NULL
, peso				DECIMAL(5,2)		DEFAULT 0		# Peso da Peca (12.5) (Kg)
, units				INT(11)				DEFAULT 1		# Unidades por Peca
, cone_type			VARCHAR(32)			DEFAULT NULL
, photo				VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(product_name)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
ALTER TABLE Products		ADD COLUMN photo			VARCHAR(255)		DEFAULT NULL	AFTER start_date;
ALTER TABLE Products		CHANGE name product_name	VARCHAR(255)		DEFAULT NULL	;
ALTER TABLE Products		ADD		units					INT(11)			DEFAULT 1		AFTER start_date;
ALTER TABLE Products		ADD		peso					DECIMAL(5,2)	DEFAULT 0		AFTER start_date;

ALTER TABLE Products		ADD		cone_type				VARCHAR(32)		DEFAULT NULL	AFTER units;

ALTER TABLE Products		ADD COLUMN parent_id    		BIGINT   		DEFAULT NULL  	AFTER status;

ALTER TABLE Products		ADD		finishing				VARCHAR(255)	DEFAULT NULL	AFTER product_type;
