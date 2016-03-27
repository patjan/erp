DROP   TABLE IF     EXISTS NFEs;
CREATE TABLE IF NOT EXISTS NFEs
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, nfe_key			VARCHAR(64)			DEFAULT NULL
, nfe_number		BIGINT				DEFAULT NULL
, vendor_id			BIGINT				DEFAULT NULL
, vendor_cnpj		VARCHAR(255)		DEFAULT NULL
, vendor_name     	VARCHAR(255)		DEFAULT NULL
, vendor_type		VARCHAR(32)			DEFAULT 'Tinturaria'
, operation_name	VARCHAR(255)		DEFAULT NULL
, invoice_date		DATE				DEFAULT NULL
, invoice_pieces	INT					DEFAULT 0
, invoice_weight	DECIMAL(10,2)		DEFAULT 0
, invoice_amount	DECIMAL(10,2)		DEFAULT 0
, gross_weight		DECIMAL(10,2)		DEFAULT 0
, package_type		VARCHAR(255)		DEFAULT NULL
, received_pieces	INT					DEFAULT 0
, received_weight	DECIMAL(10,2)		DEFAULT 0
, received_amount	DECIMAL(10,2)		DEFAULT 0

, vBC				DECIMAL(10,2)		DEFAULT NULL
, vBCST				DECIMAL(10,2)		DEFAULT NULL
, vCOFINS			DECIMAL(10,2)		DEFAULT NULL
, vDesc				DECIMAL(10,2)		DEFAULT NULL
, vFrete			DECIMAL(10,2)		DEFAULT NULL
, vICMS				DECIMAL(10,2)		DEFAULT NULL
, vICMSDeson		DECIMAL(10,2)		DEFAULT NULL
, vII				DECIMAL(10,2)		DEFAULT NULL
, vIPI				DECIMAL(10,2)		DEFAULT NULL
, vNF				DECIMAL(10,2)		DEFAULT NULL
, vOutro			DECIMAL(10,2)		DEFAULT NULL
, vPIS				DECIMAL(10,2)		DEFAULT NULL
, vProd				DECIMAL(10,2)		DEFAULT NULL
, vST				DECIMAL(10,2)		DEFAULT NULL
, vSeg				DECIMAL(10,2)		DEFAULT NULL
, modFrete			INT					DEFAULT NULL

, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, UNIQUE(nfe_key)
, KEY vendor 	(vendor_id)
, KEY nfe_number(nfe_number)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;


DROP   TABLE IF     EXISTS NFEItems;
CREATE TABLE IF NOT EXISTS NFEItems
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, nfe_id			BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, cProd				VARCHAR(32)			DEFAULT NULL
, xProd		     	VARCHAR(255)		DEFAULT NULL
, NCM				VARCHAR(255)		DEFAULT NULL
, CFOP				VARCHAR(255)		DEFAULT NULL
, uCom				VARCHAR(32)			DEFAULT NULL
, qCom				DECIMAL(10,2)		DEFAULT NULL
, vUnCom			DECIMAL(10,4)		DEFAULT NULL
, vProd				DECIMAL(10,2)		DEFAULT NULL

, indTot			INT					DEFAULT NULL
, uTrib				VARCHAR(32)			DEFAULT NULL
, qTrib				DECIMAL(10,2)		DEFAULT NULL
, vUnTrib			DECIMAL(10,4)		DEFAULT NULL
, vBC_ICMS			DECIMAL(10,2)		DEFAULT NULL
, CST_ICMS			VARCHAR(32)			DEFAULT NULL
, orig				INT					DEFAULT NULL
, modBC				INT					DEFAULT NULL
, pICMS				DECIMAL(10,2)		DEFAULT NULL
, vICMS				DECIMAL(10,2)		DEFAULT NULL
, vBC_PIS			DECIMAL(10,2)		DEFAULT NULL
, CST_PIS			VARCHAR(32)			DEFAULT NULL
, pPIS				DECIMAL(10,2)		DEFAULT NULL
, vPIS				DECIMAL(10,2)		DEFAULT NULL
, vBC_COFINS		DECIMAL(10,2)		DEFAULT NULL
, CST_COFINS		VARCHAR(32)			DEFAULT NULL
, pCOFINS			DECIMAL(10,2)		DEFAULT NULL
, vCOFINS			DECIMAL(10,2)		DEFAULT NULL
, CST_IPI			VARCHAR(32)			DEFAULT NULL
, cEnq				INT					DEFAULT NULL
, clEnq				INT					DEFAULT NULL
, vTotTrib			DECIMAL(10,2)		DEFAULT NULL

, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, KEY nfe	 	(nfe_id)
, KEY cProd		(cProd)
, KEY xProd		(xProd)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;


DROP   TABLE IF     EXISTS NFEBills;
CREATE TABLE IF NOT EXISTS NFEBills
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, nfe_id			BIGINT				DEFAULT NULL
, bill_number		VARCHAR(255)		DEFAULT NULL
, bill_amount		DECIMAL(10,2)		DEFAULT 0
, maturity_date		DATE				DEFAULT NULL

, PRIMARY KEY(id)
, KEY nfe			(nfe_id)
, KEY bill_number	(bill_number)
, KEY maturity_date	(maturity_date)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='NFEs', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='NFes', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='NFEs', updated_by=1, updated_at=NOW();

INSERT NextIds	SET table_name='NFEItems', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='NFeItems', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='NFEItems', updated_by=1, updated_at=NOW();

INSERT NextIds	SET table_name='NFEBills', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='NFeBills', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='NFEBills', updated_by=1, updated_at=NOW();

