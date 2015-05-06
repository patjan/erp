<?php
require_once 'Constant.php';
require_once  'Utility.php';

define('PROGRAM_NAME'	,	'ImportProdPrices');
//define('LOCAL_SERVER'	,	'erp'  );					//	local server for test
//define('MAIN_SERVER'	,	'tecno.jkysoftware.com');	//	main server for production

/**
 *	Program:	ImportProdPrices
 *	 Author:	Pat Jan
 *	Command:	cd /htdocs/erp/application
 *				php ImportProdPrices.php
 *	 Domain:	get data from Host Server the Prices and Tecidos
 *				and update only Local Server the ProdPrices
 * 		Run:	started on user command
 *
 *    Speed:   8000 transacoes por min ( USA )
 *              200 transacoes por min ( Brasil )
 *             Depende do tamanho de memoria do Cliente
 *             e' recomendado 256 MB no minimo.
 *
 *	This program will fetch it's previous IP
 *	send command [Setip] to main server using curl
 *	update all servers host from main server
 */
set_time_limit(0);
error_reporting(E_ALL);		//	report errors

ini_set('display_startup_errors', 'on');
ini_set('display_errors'		, 'on');
//ini_set('include_path'			, '../library');
ini_set('memory_limit', '256M');

date_default_timezone_set('America/Sao_Paulo');


//   Define path to application directory
defined( 'APPLICATION_PATH' ) or define( 'APPLICATION_PATH', realpath( dirname( __FILE__ )));

//   Ensure library/ is on include_path
set_include_path( implode( PATH_SEPARATOR, array( realpath( APPLICATION_PATH . LIBRARY ), get_include_path() )));


$program_name = $_SERVER['PHP_SELF'];
require_once 'Zend/Db.php';

log_bat('');
log_bat('start of program');

try{
	$my_params = array('host'=>DB_HOST, 'username'=>DB_USER, 'password'=>DB_PASS, 'dbname'=>DB_NAME);
	$my_local_db = Zend_Db::factory('Pdo_Mysql', $my_params);
	$my_local_db->getConnection();

	try{
		$my_remote_params = array
			('host'		=> '50.63.229.200'		//	GoDaddy
			,'username'	=> 'tecno2012'
			,'password'	=> 'Brazil#18781'
			,'dbname'	=> 'tecno2012'
			);
		$my_remote_db = Zend_Db::factory('Pdo_Mysql', $my_remote_params);
		$my_remote_db->getConnection();
		log_bat('OK, Remote Host ' . $my_remote_params['host'] . ' connected.');
		process_import($my_local_db, $my_remote_db);
	}catch(Exception $exp){
		log_bat('error, Remote Host ' . $my_remote_params['host'] . ' not connected: ' . $exp->getMessage());
	}

}catch(Exception $exp){
	log_bat('error, Local Server not connected: ' . $exp->getMessage());
}

log_bat('end of program');
return;

// -----------------------------------------------------------------------------
function process_import($the_local_db, $the_remote_db) {
	$my_sql = ''
		. 'SELECT Tecidos.Nome, Tecidos.TipoCone, Precos.Classific, Precos.Preco'
		. '  FROM Tecidos, Precos'
		. ' WHERE Tecidos.Id = Precos.Tecido'
		;
	$my_imports	= $the_remote_db->fetchAll($my_sql);
	$my_count	= count($my_imports);
	log_bat('import has ' . $my_count . ' records');
	if ($my_count == 0)		return;

	foreach($my_imports as $my_import) {
		$my_product_name	= $my_import['Nome'		];
		$my_cone_type		= $my_import['TipoCone'	];
		$my_color_code		= $my_import['Classific'];
		$my_product_price	= $my_import['Preco'	];

		$my_product_type =  '';
		switch($my_cone_type) {
			case 'T'	: $my_product_type = 'Tubular'	; break;
			case 'R'	: $my_product_type = 'Ramado'	; break;
		};

		$my_color_type = '';
		switch($my_color_code) {
			case 'CL'	: $my_color_type = 'Bco'		; break;
			case 'MD'	: $my_color_type = 'Clara'		; break;
			case 'EC'	: $my_color_type = 'Media'		; break;
			case 'EP'	: $my_color_type = 'Intermedia'	; break;
			case 'SE'	: $my_color_type = 'Escura'		; break;
			case 'MC'	: $my_color_type = 'Mescla'		; break;
			case 'UN'	: $my_color_type = 'Unico'		; break;
			case 'FC'	: $my_color_type = 'Fraca'		; break;
			case 'FT'	: $my_color_type = 'Forte'		; break;
		};

//log_bat($my_product_name . ', ' . $my_cone_type . ':' . $my_product_type . ', ' . $my_color_code . ':' . $my_color_type . ', ' . $my_product_price);

		if ($my_product_type === '')		continue;
		if ($my_color_type   === '')		continue;

		$my_sql = ''
			. 'SELECT *'
			. '  FROM Products'
			. ' WHERE product_name LIKE "' . $my_product_name	. '%"'
			. '   AND product_type LIKE "' . $my_product_type	. '"'
			;
		$my_local_row = $the_local_db->fetchRow($my_sql);
log_bat(json_encode($my_local_row));

		if ($my_local_row) {
			$my_product_id = $my_local_row['id'];

			$my_sql = ''
				. 'SELECT *'
				. '  FROM ProdPrices'
				. ' WHERE product_id =  ' . $my_product_id
				. '   AND color_type = "' . $my_color_type . '"'
				;
			$my_local_row = $the_local_db->fetchRow($my_sql);

			if (!$my_local_row) {
				$my_sql = ''
					. 'INSERT INTO ProdPrices'
					. '   SET updated_at = NOW()'
					. '     , status = "Active"'
					. '     ,    product_id =  ' . $my_product_id
					. '     ,    color_type = "' . $my_color_type . '"'
					. '     , current_price =  ' . $my_product_price
					;
				$my_local_row = $the_local_db->query($my_sql);
log_bat($my_sql);
			}
		}
	}
}

// -----------------------------------------------------------------------------
