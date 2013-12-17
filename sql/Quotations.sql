DROP   TABLE IF     EXISTS Quotations;
CREATE TABLE IF NOT EXISTS Quotations
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, quotation_number	VARCHAR(32)			DEFAULT NULL
, customer_id		BIGINT				DEFAULT NULL
, machine_id		BIGINT				DEFAULT NULL
, dyer_id			BIGINT				DEFAULT NULL
, dyer_ref      	VARCHAR(32)			DEFAULT NULL
, diameter			INT					DEFAULT 0		# Diametro (cm)
, weight			INT					DEFAULT 0		# Gramatura (gr)
, width				INT					DEFAULT 0		# Largura (cm)
, peso				DECIMAL(10,2)		DEFAULT 0		# Peso da Peca (12.5) (Kg)
, has_break			CHAR(3)				DEFAULT 'No'	# Tem falha
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
, produced_date		DATE				DEFAULT NULL
, delivered_date	DATE				DEFAULT NULL
, quoted_pieces		INT					DEFAULT 0
, produced_pieces	INT					DEFAULT 0
, delivered_pieces	INT					DEFAULT 0
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, UNIQUE(quotation_number)
, KEY customer 	(customer_id)
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
