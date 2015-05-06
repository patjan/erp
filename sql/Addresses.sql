DROP   TABLE IF     EXISTS Addresses;
CREATE TABLE IF NOT EXISTS Addresses
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, parent_name       VARCHAR(32)         DEFAULT NULL	# Contacts
, parent_id         BIGINT UNSIGNED     DEFAULT NULL
, cnpj				VARCHAR(255)		DEFAULT NULL
, st_number			VARCHAR(255)		DEFAULT NULL	# numero
, st_cpl			VARCHAR(255)		DEFAULT NULL	# complemento
, street1			VARCHAR(255)		DEFAULT NULL	# rua
, street2			VARCHAR(255)		DEFAULT NULL	# bairro
, city				VARCHAR(255)		DEFAULT NULL	# cidade
, state				VARCHAR(255)		DEFAULT NULL	# estado
, zip				VARCHAR(255)		DEFAULT NULL	# cep
, country			VARCHAR(255)		DEFAULT NULL	# pais
, district			VARCHAR(255)		DEFAULT NULL	# municipio

, remarks			VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY	(id)
, KEY parent_id		(parent_name, parent_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='Addresses', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='Addresses', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='Addresses', updated_by=1, updated_at=NOW();
