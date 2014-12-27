DROP   TABLE IF     EXISTS Contacts;
CREATE TABLE IF NOT EXISTS Contacts
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, company_id		BIGINT				DEFAULT NULL
, support_id		BIGINT				DEFAULT NULL
, parent_id			BIGINT				DEFAULT NULL
, is_company		CHAR(3)				DEFAULT 'No'
, is_customer		CHAR(3)				DEFAULT 'No'
, is_supplier		CHAR(3)				DEFAULT 'No'
, is_dyer			CHAR(3)				DEFAULT 'No'
, is_partner		CHAR(3)				DEFAULT 'No'
, is_transport		CHAR(3)				DEFAULT 'No'
, is_taxable		CHAR(3)				DEFAULT 'Yes'
, icms_exemption	CHAR(3)				DEFAULT 'No'
, photo				VARCHAR(255)		DEFAULT NULL
, nick_name			VARCHAR(255)		DEFAULT NULL
, first_name		VARCHAR(255)		DEFAULT NULL
, last_name			VARCHAR(255)		DEFAULT NULL
, full_name			VARCHAR(255)		DEFAULT NULL
, tags				VARCHAR(255)		DEFAULT NULL
, position			VARCHAR(255)		DEFAULT NULL
, phone				VARCHAR(255)		DEFAULT NULL
, mobile			VARCHAR(255)		DEFAULT NULL
, fax				VARCHAR(255)		DEFAULT NULL
, skype				VARCHAR(255)		DEFAULT NULL
, nextel			VARCHAR(255)		DEFAULT NULL
, email				VARCHAR(255)		DEFAULT NULL
, website			VARCHAR(255)		DEFAULT NULL
, st_number			VARCHAR(255)		DEFAULT NULL	# numero
, st_cpl			VARCHAR(255)		DEFAULT NULL	# complemento
, street1			VARCHAR(255)		DEFAULT NULL	# rua
, street2			VARCHAR(255)		DEFAULT NULL	# bairro
, city				VARCHAR(255)		DEFAULT NULL	# cidade
, state				VARCHAR(255)		DEFAULT NULL	# estado
, zip				VARCHAR(255)		DEFAULT NULL	# cep
, country			VARCHAR(255)		DEFAULT NULL	# pais
, district			VARCHAR(255)		DEFAULT NULL	# municipio

, language			VARCHAR(255)		DEFAULT 'Portuguese'
, time_zone			VARCHAR(255)		DEFAULT '-3'
, cnpj				VARCHAR(255)		DEFAULT NULL
, ie				VARCHAR(255)		DEFAULT NULL
, im				VARCHAR(255)		DEFAULT NULL
, start_dt			date				DEFAULT NULL
, end_dt			date				DEFAULT NULL
, credit_limit		DECIMAL(10,2)		DEFAULT 0
, total_purchased	DECIMAL(10,2)		DEFAULT 0
, total_refunded	DECIMAL(10,2)		DEFAULT 0
, total_invoiced	DECIMAL(10,2)		DEFAULT 0
, total_paid		DECIMAL(10,2)		DEFAULT 0
, interest_rate		DECIMAL( 5,2)		DEFAULT NULL	# null => no agreement, 0 => 0%

, payment_type		VARCHAR(255)		DEFAULT NULL	# duplicata, assinar, cheque, somente em dinheiro
, payments			VARCHAR(255)		DEFAULT NULL	# 30 45 60
, alert				VARCHAR(255)		DEFAULT NULL	# 
, remarks			VARCHAR(255)		DEFAULT NULL
, extra_info		VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY(id)
, KEY company	(company_id	)
, KEY nick_name	(nick_name	)
, KEY first_name(first_name	)
, KEY last_name	(last_name	)
, KEY full_name (full_name	)
, KEY email		(email		)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;


ALTER TABLE Contacts	ADD COLUMN is_customer    		CHAR(3)   		DEFAULT 'No'  AFTER is_company;
ALTER TABLE Contacts	CHANGE job_position	position	VARCHAR(255)	DEFAULT NULL;
ALTER TABLE Contacts	ADD COLUMN is_supplier    		CHAR(3)   		DEFAULT 'No'  AFTER is_customer;

ALTER TABLE Contacts	ADD COLUMN nick_name			VARCHAR(255)	DEFAULT NULL  AFTER photo;
ALTER TABLE Contacts	ADD UNIQUE KEY	 nick_name	(nick_name);

ALTER TABLE Contacts	CHANGE is_supplier	is_supplier	CHAR(3)			DEFAULT 'No';
UPDATE		Contacts	SET is_supplier = 'No'		WHERE is_supplier = 'no';

ALTER TABLE Contacts	ADD COLUMN is_partner    		CHAR(3)   		DEFAULT 'No'  AFTER is_supplier;
ALTER TABLE Contacts	ADD COLUMN is_dyer	    		CHAR(3)   		DEFAULT 'No'  AFTER is_supplier;

ALTER TABLE Contacts	ADD COLUMN st_cpl				VARCHAR(255)	DEFAULT NULL  AFTER website;
ALTER TABLE Contacts	ADD COLUMN st_number			VARCHAR(255)	DEFAULT NULL  AFTER website;
ALTER TABLE Contacts	ADD COLUMN district				VARCHAR(255)	DEFAULT NULL  AFTER country;

ALTER TABLE Contacts	ADD COLUMN is_transport    		CHAR(3)   		DEFAULT 'No'  AFTER is_partner;

ALTER TABLE Contacts	ADD COLUMN parent_id    		BIGINT   		DEFAULT NULL  AFTER support_id;

ALTER TABLE Contacts	ADD COLUMN extra_info			VARCHAR(255)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts	ADD COLUMN remarks				VARCHAR(255)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts	ADD COLUMN alert				VARCHAR(255)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts	ADD COLUMN payments				VARCHAR(255)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts	ADD COLUMN im					VARCHAR(255)	DEFAULT NULL	AFTER ie;
ALTER TABLE Contacts	ADD COLUMN icms_exemption		CHAR(3)			DEFAULT 'No'	AFTER is_taxable;

ALTER TABLE Contacts	ADD COLUMN payment_type			VARCHAR(255)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts	ADD COLUMN interest_rate		DECIMAL(5,2)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts	ADD COLUMN nextel				VARCHAR(255)	DEFAULT NULL 	AFTER fax;
ALTER TABLE Contacts	ADD COLUMN skype				VARCHAR(255)	DEFAULT NULL 	AFTER fax;
