DROP   TABLE IF     EXISTS Products;
CREATE TABLE IF NOT EXISTS Products
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, parent_id			BIGINT				DEFAULT NULL
, product_name		VARCHAR(255)		DEFAULT NULL
, product_type		VARCHAR(32)			DEFAULT 'Tubular'
, finishings		VARCHAR(255)		DEFAULT NULL
, washings			VARCHAR(255)		DEFAULT NULL
, start_date		DATE				DEFAULT NULL
, peso				DECIMAL(5,2)		DEFAULT 0		# Peso da Peca (12.5) (Kg)
, units				INT(11)				DEFAULT 1		# Unidades por Peca
, cone_type			VARCHAR(32)			DEFAULT NULL
, photo				VARCHAR(255)		DEFAULT NULL

, weight_from		INT					DEFAULT 0		# Gramatura (gr)
, weight_to			INT					DEFAULT 0		# Gramatura (gr)
, weight_dyer		INT					DEFAULT 0		# Gramatura (gr)
, width_from		INT					DEFAULT 0		# Largura (cm)
, width_to			INT					DEFAULT 0		# Largura (cm)
, width_dyer		INT					DEFAULT 0		# Largura (cm)
, yield				DECIMAL(10,2)		DEFAULT 0		# Rendimento (Kg/Mt)


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

ALTER TABLE Products		CHANGE	start_date	start_at	DATETIME			DEFAULT NULL	;
ALTER TABLE Products		CHANGE	finishing	finishings	VARCHAR(255)		DEFAULT NULL	;

ALTER TABLE Products		ADD			washings				VARCHAR(255)	DEFAULT NULL	AFTER finishings;
ALTER TABLE Products		ADD COLUMN yield					DECIMAL(5,2)	DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN width_dyer				INTEGER			DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN width_to					INTEGER			DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN width_from				INTEGER			DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN weight_dyer				INTEGER			DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN weight_to				INTEGER			DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN weight_from				INTEGER			DEFAULT 0		AFTER photo;
