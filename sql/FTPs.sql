DROP   TABLE IF     EXISTS FTPs;
CREATE TABLE IF NOT EXISTS FTPs
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, ftp_number		VARCHAR(32)			DEFAULT NULL
, start_date		DATE				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, machine_id		BIGINT				DEFAULT NULL
, collection		VARCHAR(32)			DEFAULT NULL
, nick_name			VARCHAR(255)		DEFAULT NULL
, diameter			INT(11)				DEFAULT 0		# Diametro (cm)
, density			INT(11)				DEFAULT 0		# Finura
, inputs			INT(11)				DEFAULT 0		# Alimentos
, speed		   		INT(11)				DEFAULT 0		# RPM
, turns		   		INT(11)				DEFAULT 0		# Voltas
, weight	   		INT(11)				DEFAULT 0		# Gramatura (gr)
, width				INT(11)				DEFAULT 0		# Largura (cm)
, units				INT(11)				DEFAULT 1		# Unidades por Peca
, peso				DECIMAL(5,2)		DEFAULT 0		# Peso da Peca (12.5) (Kg)
, has_break			CHAR(3)				DEFAULT 'No'	# Tem falha
, composition		VARCHAR(255)		DEFAULT ''		# Composicao: 96 Polyester, 4 Elastano
, draw				VARCHAR(255)		DEFAULT NULL	# Desenho
, photo				VARCHAR(255)		DEFAULT NULL	# Foto

, PRIMARY KEY(id)
, UNIQUE(ftp_number)
, KEY product(product_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT Controls SET group_set='System Numbers', status='Active', sequence=  50, name='Next FTP Number', value='100001', created_by=1, created_at=NOW();

ALTER TABLE FTPs		CHANGE	code		number		VARCHAR(32)		DEFAULT NULL;
ALTER TABLE FTPs		CHANGE	needling	needling	VARCHAR(32)		DEFAULT NULL;
ALTER TABLE FTPs		CHANGE	yield		elasticity	INT(11)			DEFAULT 0;

ALTER TABLE FTPs		ADD		start_date				DATE			DEFAULT NULL	AFTER number;
ALTER TABLE FTPs		ADD		collection				VARCHAR(32)		DEFAULT NULL	AFTER machine_id;
ALTER TABLE FTPs		DROP	lanes;
ALTER TABLE FTPs		DROP	elasticity;
ALTER TABLE FTPs		DROP	needling;

ALTER TABLE FTPs		ADD		nick_name				VARCHAR(255)	DEFAULT NULL	AFTER collection;

ALTER TABLE FTPs		CHANGE	number		ftp_number	VARCHAR(32)		DEFAULT NULL;

ALTER TABLE FTPs		ADD		units					INT(11)			DEFAULT 1		AFTER width;
UPDATE		FTPs		SET		units = 1;
