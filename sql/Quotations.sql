DROP   TABLE IF     EXISTS Quotations;
CREATE TABLE IF NOT EXISTS Quotations
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, quotation_number	VARCHAR(32)			DEFAULT NULL
, customer_id		BIGINT				DEFAULT NULL
, contact_id		BIGINT				DEFAULT NULL
, salesman_id		BIGINT				DEFAULT NULL

, machine_id		BIGINT				DEFAULT NULL
, dyer_id			BIGINT				DEFAULT NULL

, dyer_ref      	VARCHAR(32)			DEFAULT NULL

, diameter			INT					DEFAULT 0		# Diametro (cm)
, weight_from		INT					DEFAULT 0		# Gramatura (gr)
, weight_to			INT					DEFAULT 0		# Gramatura (gr)
, width_from		INT					DEFAULT 0		# Largura (cm)
, width_to			INT					DEFAULT 0		# Largura (cm)
, peso				DECIMAL(10,2)		DEFAULT 0		# Peso da Peca (12.5) (Kg)

, advanced_amount	DECIMAL(10,2)		DEFAULT 0
, quoted_amount		DECIMAL(10,2)		DEFAULT 0
, discount_amount	DECIMAL(10,2)		DEFAULT 0
, payments			VARCHAR(255)		DEFAULT NULL	# 30 45 60

, product_type		VARCHAR(32)			DEFAULT NULL
, punho_id			BIGINT				DEFAULT NULL
, punho_percent		INTEGER				DEFAULT 0
, punho_units		INTEGER				DEFAULT 0		# per one quoted piece
, gola_id			BIGINT				DEFAULT NULL
, gola_percent		INTEGER				DEFAULT 0
, gola_units		INTEGER				DEFAULT 0		# per one quoted piece
, galao_id			BIGINT				DEFAULT NULL
, galao_percent		INTEGER				DEFAULT 0
, galao_units		INTEGER				DEFAULT 0		# per one quoted piece

, quoted_at			DATETIME			DEFAULT NULL
, needed_at			DATETIME			DEFAULT NULL
, produced_from_date	DATE				DEFAULT NULL	# produced date
, produce_to_date		DATE				DEFAULT NULL	# expected date
, delivered_date	DATE				DEFAULT NULL
, quoted_pieces		INT					DEFAULT 0
, produced_pieces	INT					DEFAULT 0
, delivered_pieces	INT					DEFAULT 0
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, UNIQUE(quotation_number)
, KEY customer 	(customer_id)
, KEY salesman 	(salesman_id)
, KEY contact 	(contact_id)
, KEY machine 	(machine_id)
, KEY dyer		(dyer_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

ALTER TABLE Quotations		ADD COLUMN needed_at		DATETIME		DEFAULT NULL	AFTER quoted_at;

ALTER TABLE Quotations		CHANGE	punho_perc			punho_percent	INTEGER			DEFAULT 0;
ALTER TABLE Quotations		CHANGE	gola_perc			gola_percent	INTEGER			DEFAULT 0;
ALTER TABLE Quotations		CHANGE	galao_perc			galao_percent	INTEGER			DEFAULT 0;
ALTER TABLE Quotations		ADD COLUMN punho_units		INTEGER		DEFAULT 0	AFTER punho_percent;
ALTER TABLE Quotations		ADD COLUMN gola_units		INTEGER		DEFAULT 0	AFTER gola_percent;
ALTER TABLE Quotations		ADD COLUMN galao_units		INTEGER		DEFAULT 0	AFTER galao_percent;

ALTER TABLE Quotations		ADD COLUMN contact_id				BIGINT			DEFAULT NULL	AFTER customer_id;
ALTER TABLE Quotations		CHANGE	weight		weight_from		INTEGER			DEFAULT 0;
ALTER TABLE Quotations		ADD COLUMN weight_to				INTEGER			DEFAULT 0		AFTER weight_from;
ALTER TABLE Quotations		CHANGE	width		width_from		INTEGER			DEFAULT 0;
ALTER TABLE Quotations		ADD COLUMN width_to					INTEGER			DEFAULT 0		AFTER width_from;
ALTER TABLE Quotations		CHANGE	has_break	product_type	VARCHAR(32)		DEFAULT '';

ALTER TABLE Quotations		ADD COLUMN discount_amount			DECIMAL(10,2)	DEFAULT 0		AFTER peso;
ALTER TABLE Quotations		ADD COLUMN quoted_amount			DECIMAL(10,2)	DEFAULT 0		AFTER peso;

ALTER TABLE Quotations		ADD COLUMN advanced_amount			DECIMAL(10,2)	DEFAULT 0		AFTER peso;
ALTER TABLE Quotations		ADD COLUMN payments					VARCHAR(255)	DEFAULT NULL	AFTER discount_amount;

ALTER TABLE Quotations		ADD COLUMN salesman_id				BIGINT			DEFAULT NULL	AFTER contact_id;

ALTER TABLE Quotations		ADD COLUMN expected_date			DATE			DEFAULT NULL	AFTER produced_date;

ALTER TABLE Quotations		DROP machine_id		;
ALTER TABLE Quotations		DROP dyer_id		;
ALTER TABLE Quotations		DROP diameter		;
ALTER TABLE Quotations		DROP weight_from	;
ALTER TABLE Quotations		DROP weight_to		;
ALTER TABLE Quotations		DROP width_from		;
ALTER TABLE Quotations		DROP width_to		;
ALTER TABLE Quotations		DROP peso			;
ALTER TABLE Quotations		DROP product_type	;
ALTER TABLE Quotations		DROP punho_id		;
ALTER TABLE Quotations		DROP punho_percent	;
ALTER TABLE Quotations		DROP punho_units	;
ALTER TABLE Quotations		DROP gola_id		;
ALTER TABLE Quotations		DROP gola_percent	;
ALTER TABLE Quotations		DROP gola_units		;
ALTER TABLE Quotations		DROP galao_id		;
ALTER TABLE Quotations		DROP galao_percent	;
ALTER TABLE Quotations		DROP galao_units	;

ALTER TABLE Quotations		CHANGE	produced_date	produce_from_date	DATE		DEFAULT NULL;
ALTER TABLE Quotations		CHANGE	expected_date	produce_to_date		DATE		DEFAULT NULL;
UPDATE		Quotations		SET 	produce_from_date = produce_to_date; 
UPDATE		Quotations		SET 	produce_to_date = delivered_date;
UPDATE		Quotations		SET 	delivered_date = NULL;

ALTER TABLE Quotations	ADD INDEX salesman		(salesman_id	);
ALTER TABLE Quotations	ADD INDEX contact		(contact_id		);
