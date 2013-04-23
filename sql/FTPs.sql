DROP   TABLE IF     EXISTS FTPs;
CREATE TABLE IF NOT EXISTS FTPs
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, code				VARCHAR(32)			DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, machine_id		BIGINT				DEFAULT NULL
, diameter			INT(11)				DEFAULT 0		# Diametro (cm)
, density			INT(11)				DEFAULT 0		# Finura
, inputs			INT(11)				DEFAULT 0		# Alimentos
, speed		   		INT(11)				DEFAULT 0		# RPM
, turns		   		INT(11)				DEFAULT 0		# Voltas
, weight	   		INT(11)				DEFAULT 0		# Gramatura
, width				INT(11)				DEFAULT 0		# Largura (cm)
, lanes				INT(11)				DEFAULT 0		# Trilhos
, yield				INT(11)				DEFAULT 0		# Rendimento
, needling			INT(11)				DEFAULT 0		# Agulhamento
, peso				DECIMAL(5,2)		DEFAULT 0		# Peso da Peca (12.5) (Kg)
, has_break			CHAR(3)				DEFAULT 'no'	# Tem falha
, composition		VARCHAR(255)		DEFAULT ''		# Composicao: 96 Polyester, 4 Elastano
, draw				VARCHAR(255)		DEFAULT NULL	# Desenho
, photo				VARCHAR(255)		DEFAULT NULL	# Foto

, PRIMARY KEY(id)
, UNIQUE(code)
, KEY product(product_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;