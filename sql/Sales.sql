DROP   TABLE IF     EXISTS Sales;
CREATE TABLE IF NOT EXISTS Sales
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, sale_number		VARCHAR(32)			DEFAULT NULL
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
, UNIQUE(sale_number)
, KEY customer 	(customer_id)
, KEY machine 	(machine_id)
, KEY dyer		(dyer_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='Sales', next_id=1, id_size=5;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='Sales', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='Sales', updated_by=1, updated_at=NOW();

