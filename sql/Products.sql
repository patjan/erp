DROP   TABLE IF     EXISTS Products;
CREATE TABLE IF NOT EXISTS Products
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, parent_id			BIGINT				DEFAULT NULL
, family_id			BIGINT				DEFAULT NULL
, product_name		VARCHAR(255)		DEFAULT NULL
, product_type		VARCHAR(32)			DEFAULT 'Tubular'
, finishings		VARCHAR(255)		DEFAULT NULL
, washings			VARCHAR(255)		DEFAULT NULL
, start_date		DATE				DEFAULT NULL
, peso				DECIMAL(5,2)		DEFAULT 0		# Peso da Peca (12.5) (Kg)
, units				INT(11)				DEFAULT 1		# Unidades por Peca
, ncm				VARCHAR(32)			DEFAULT NULL
, cone_type			VARCHAR(32)			DEFAULT NULL
, photo				VARCHAR(255)		DEFAULT NULL

, weight_customer	VARCHAR(32)			DEFAULT NULL	# Gramatura (gr) de - ate | largula X altura
, weight_dyer		VARCHAR(32)			DEFAULT NULL	# Gramatura (gr)
, width_customer	VARCHAR(32)			DEFAULT NULL	# Largura   (cm) de - ate | largula X altura
, width_dyer		VARCHAR(32)			DEFAULT NULL	# Largura   (cm)
, yield				DECIMAL(10,2)		DEFAULT 0		# Rendimento (Kg/Mt)
, remarks			TEXT				DEFAULT	NULL

, UNIQUE(product_name)
, PRIMARY KEY(id)
, KEY parent_id		(parent_id)
, KEY product_type	(product_type)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS ProdPrices;
CREATE TABLE IF NOT EXISTS ProdPrices
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'		/*	History, Future	*/

, product_id		BIGINT				DEFAULT NULL
, color_type		VARCHAR(32)			DEFAULT NULL
, current_price		DECIMAL(10,2)		DEFAULT 0
, new_price			DECIMAL(10,2)		DEFAULT 0
, effective_date	DATE				DEFAULT NULL

, PRIMARY KEY	(id)
, KEY product	(product_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS ProdColors;
CREATE TABLE IF NOT EXISTS ProdColors
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'		/*	History, Future	*/

, product_id		BIGINT				DEFAULT NULL
, color_id			BIGINT				DEFAULT NULL
, target			INT					DEFAULT 0

, PRIMARY KEY	(id)
, KEY product	(product_id)
, KEY color		(color_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='Products', next_id=1, id_size=5;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='Products', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='Products', updated_by=1, updated_at=NOW();

INSERT NextIds	SET table_name='ProdPrices', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='ProdPrices', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='ProdPrices', updated_by=1, updated_at=NOW();

INSERT NextIds	SET table_name='ProdColors', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='ProdColors', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='ProdColors', updated_by=1, updated_at=NOW();


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

ALTER TABLE Products		CHANGE weight_from	weight_customer	VARCHAR(32)		DEFAULT NULL	;
ALTER TABLE Products		CHANGE weight_to	weight_to		VARCHAR(32)		DEFAULT NULL	;
ALTER TABLE Products		CHANGE weight_dyer	weight_dyer		VARCHAR(32)		DEFAULT NULL	;
ALTER TABLE Products		CHANGE width_from	width_customer	VARCHAR(32)		DEFAULT NULL	;
ALTER TABLE Products		CHANGE width_to		width_to		VARCHAR(32)		DEFAULT NULL	;
ALTER TABLE Products		CHANGE width_dyer	width_dyer		VARCHAR(32)		DEFAULT NULL	;
UPDATE Products	SET weight_customer = NULL	WHERE weight_customer	= '0';
UPDATE Products	SET weight_dyer		= NULL	WHERE weight_dyer		= '0';
UPDATE Products	SET width_customer	= NULL	WHERE width_customer	= '0';
UPDATE Products	SET width_dyer		= NULL	WHERE width_dyer		= '0';
UPDATE Products	SET weight_customer = CONCAT(weight_customer, ' - ', weight_to)	WHERE weight_customer	IS NOT NULL;
UPDATE Products	SET width_customer  = CONCAT(width_customer , ' - ', width_to )	WHERE width_customer	IS NOT NULL;
ALTER TABLE Products		DROP weight_to	;
ALTER TABLE Products		DROP width_to	;

ALTER TABLE Products	ADD INDEX parent_id		(parent_id		);
ALTER TABLE Products	ADD INDEX product_type	(product_type	);