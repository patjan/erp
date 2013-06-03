DROP   TABLE IF     EXISTS Contacts;
CREATE TABLE IF NOT EXISTS Contacts
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, company_id		BIGINT				DEFAULT NULL
, support_id		BIGINT				DEFAULT NULL
, is_company		CHAR(3)				DEFAULT 'no'
, is_customer		CHAR(3)				DEFAULT 'no'
, is_taxable		CHAR(3)				DEFAULT 'yes'
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
, email				VARCHAR(255)		DEFAULT NULL
, website			VARCHAR(255)		DEFAULT NULL
, street1			VARCHAR(255)		DEFAULT NULL
, street2			VARCHAR(255)		DEFAULT NULL
, city				VARCHAR(255)		DEFAULT NULL
, state				VARCHAR(255)		DEFAULT NULL
, zip				VARCHAR(255)		DEFAULT NULL
, country			VARCHAR(255)		DEFAULT NULL
, language			VARCHAR(255)		DEFAULT 'Portuguese'
, time_zone			VARCHAR(255)		DEFAULT '-3'
, cnpj				VARCHAR(255)		DEFAULT NULL
, ie				VARCHAR(255)		DEFAULT NULL
, start_dt			date				DEFAULT NULL
, end_dt			date				DEFAULT NULL
, credit_limit		DECIMAL(10,2)		DEFAULT 0
, total_purchased	DECIMAL(10,2)		DEFAULT 0
, total_refunded	DECIMAL(10,2)		DEFAULT 0
, total_invoiced	DECIMAL(10,2)		DEFAULT 0
, total_paid		DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY company	(company_id	)
, KEY nick_name	(first_name	)
, KEY first_name(first_name	)
, KEY last_name	(last_name	)
, KEY full_name (full_name	)
, KEY email		(email		)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;


ALTER TABLE Contacts      ADD COLUMN is_customer    		CHAR(3)   		DEFAULT 'no'  AFTER is_company;
ALTER TABLE Contacts      CHANGE job_position	position	VARCHAR(255)	DEFAULT NULL;
ALTER TABLE Contacts      ADD COLUMN is_supplier    		CHAR(3)   		DEFAULT 'no'  AFTER is_customer;

ALTER TABLE Contacts      ADD COLUMN nick_name				VARCHAR(255)	DEFAULT NULL  AFTER photo;
ALTER TABLE Contacts      ADD UNIQUE KEY	 nick_name	(nick_name);
