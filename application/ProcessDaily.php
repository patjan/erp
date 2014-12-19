<?php
require_once 'Constant.php';
require_once  'Utility.php';

define('PROGRAM_NAME'	,	'ProcessDaily');
//define('LOCAL_SERVER'	,	'erp'  );					//	local server for test
//define('MAIN_SERVER'	,	'tecno.jkysoftware.com');	//	main server for production

/**
 *	Program:	ProcessDaily
 *	 Author:	Pat Jan
 *	Command:	cd /htdocs/erp/application
 *				php ProcessDaily.php
 *	 Domain:	process batch DB updates
 *				and generate Changes to Update remote servers
 *				and keep log of all activities
 * 		Run:	started by Scheduled Tasks and run every 1 daily
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

log_message('');
log_message('start of program');

try{
	$my_params = array('host'=>DB_HOST, 'username'=>DB_USER, 'password'=>DB_PASS, 'dbname'=>DB_NAME);
	$my_local_db = Zend_Db::factory('Pdo_Mysql', $my_params);
	$my_local_db->getConnection();

	$my_status = get_system_key($my_local_db);
	if ('started' == substr($my_status, 0, 7)) {
		log_message('running since ' . $my_status);
	}else{
		set_system_key($my_local_db, 'started');

		update_products_new_price($my_local_db);
/*
		$my_servers_host = get_servers_host(SERVER_NUMBER, $my_local_db);
		foreach($my_servers_host as $my_host) {
			$my_server_number	= $my_host['name'	];
			$my_server_host		= $my_host['value'	];
			$my_message = 'number: ' . $my_server_number
						. ', host: ' . $my_server_host
						;
			log_message($my_message);

			try{
				$my_host_params = get_db_params($my_server_number);
				$my_host_params['host'] = $my_server_host;
				$my_host_db = Zend_Db::factory('Pdo_Mysql', $my_host_params);
				$my_host_db->getConnection();
				log_message('OK, Server Host ' . $my_server_number . ' connected.');
				process_changes(SERVER_NUMBER, $my_local_db, $my_host_db);
			}catch(Exception $exp){
				log_message('error, Server Host ' . $my_server_number . ' not connected: ' . $exp->getMessage());
			}
		}
*/
		set_system_key($my_local_db, 'stopped');
	}

}catch(Exception $exp){
	log_message('error, Local Server not connected: ' . $exp->getMessage());
}

log_message('end of program');
return;

// -----------------------------------------------------------------------------
function update_products_new_price($the_local_db) {
	$my_table = 'ProdPrices';
	$my_today = get_date();
	$my_sql = ''
		. 'SELECT ProdPrices.*'
		. '  FROM ProdPrices'
		. ' WHERE ProdPrices.effective_date IS NOT NULL'
		. '   AND ProdPrices.effective_date <= "' . $my_today . '"'
		. '   AND ProdPrices.new_price != 0'
		;
	log_message($my_sql);
	$my_rows	= $the_local_db->fetchAll($my_sql);
	$my_count	= count($my_rows);
	log_message('update products new price has ' . $my_count . ' records');
	if ($my_count == 0)		return;

	foreach($my_rows as $my_row) {
		$my_id			= $my_row['id'			];
		$my_new_price	= $my_row['new_price'	];

		$my_sql = ''
			. 'UPDATE ' . $my_table
			. '   SET updated_at = "' . get_now() . '"'
			. '     , current_price = ' . $my_new_price
			. '     , new_price	= 0'
			. '     , effective_date = NULL'
			. ' WHERE id = ' . $my_id
			;
log_message($my_sql);
		$my_result = $the_local_db->query($my_sql);
		insert_changes($the_local_db, $my_table, $my_id);
	}
}

// -----------------------------------------------------------------------------

# ------------------------------------------------------------------------------
#    set system key
# ------------------------------------------------------------------------------
function set_system_key($the_local_db, $the_value) {
     $sql = 'UPDATE Controls'
          . '   SET value = "' . $the_value . ' ' . get_now() . '"'
//        . ' WHERE company_id   =  ' . get_session('control_company', COMPANY_ID)
          . ' WHERE group_set = "System Keys"'
          . '   AND name = "' . PROGRAM_NAME . '"'
          ;
     $the_local_db->query($sql);
}

# ------------------------------------------------------------------------------
#    get system key
# ------------------------------------------------------------------------------
function get_system_key($the_local_db) {
     $sql = 'SELECT value'
          . '  FROM Controls'
//        . ' WHERE company_id   =  ' . get_session('control_company', COMPANY_ID)
          . ' WHERE group_set = "System Keys"'
          . '   AND name = "' . PROGRAM_NAME . '"'
          ;
     return $the_local_db->fetchOne($sql);
}

function log_message($message) {
	$date = date( 'Y-m-d' );
	$logFile = fopen( SERVER_BASE . PROGRAM_NAME . '/' . $date . '.txt', 'a' ) or die( 'cannot open log ' . PROGRAM_NAME . ' file' );
	fwrite( $logFile, get_now() . ' ' . $message . NL );
	fclose( $logFile );
	print(get_now() . ' ' . $message . NL);
}

function OnlyString( $String ) {
	$myString = '';
	for($I=0; $I<strlen($String); $I++) {
		$C = $String[$I];
		if ($C == ' '
		|| ($C >= '0' && $C <= '9')
		|| ($C >= 'a' && $C <= 'z')
		|| ($C >= 'A' && $C <= 'Z'))
			$myString .= $C;
	}
	return $myString;
}

?>
