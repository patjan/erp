<?php
require_once 'Constant.php';
require_once  'Utility.php';

define('PROGRAM_NAME'	,	'SynDB');
//define('LOCAL_SERVER'	,	'erp'  );					//	local server for test
//define('MAIN_SERVER'	,	'tecno.jkysoftware.com');	//	main server for production

/**
 *	Program:  SynDB
 *	 Author:	Pat Jan
 *	Command:	cd /htdocs/erp/application
 *				php SynDB.php
 *	 Domain:	get data from Host Server the Changes
 *				and flag on Host Server with locar server number
 *				and update only Local Server the Tables
 * 		Run:	started by Scheduled Tasks and run every 1 minutes
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

	$my_status  = get_system_key($my_local_db, PROGRAM_NAME);
	$my_elapsed = time() - ymdhms_epoch(substr($my_status, 8));
	if ('started' == substr($my_status, 0, 7)
	&&  $my_elapsed < 60*60) {
		log_message('running since ' . $my_status);
	}else{
		set_system_key($my_local_db, PROGRAM_NAME, 'started');
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
				$my_host_params['host'] = $my_server_host;		//	DB has the most updated
				$my_host_db = Zend_Db::factory('Pdo_Mysql', $my_host_params);
				$my_host_db->getConnection();
				log_message('OK, Server Host ' . $my_server_number . ' connected.');
				process_changes(SERVER_NUMBER, $my_local_db, $my_host_db);
			}catch(Exception $exp){
				log_message('error, Server Host ' . $my_server_number . ' not connected: ' . $exp->getMessage());
			}
		}

		$my_server_number = '9';
		if (SERVER_NUMBER < $my_server_number) {
			$my_active_minutes = get_system_key($my_local_db, 'Active Minutes');
			$my_reference_time = date('Y-m-d H:i:s', (time() - ($my_active_minutes * 60)));
			log_message('select reference time: ' . $my_reference_time);

			try{
				$my_host_params = get_db_params($my_server_number);
				$my_host_params['host'] = get_server_host($my_local_db, $my_server_number);
				$my_host_db = Zend_Db::factory('Pdo_Mysql', $my_host_params);
				$my_host_db->getConnection();
				log_message('OK, Server Host ' . $my_server_number . ' connected.');
				process_history($my_reference_time, $my_local_db, $my_host_db);
			}catch(Exception $exp){
				log_message('error, Server Host ' . $my_server_number . ' not connected: ' . $exp->getMessage());
			}
		}

		set_system_key($my_local_db, PROGRAM_NAME, 'stopped');
	}

}catch(Exception $exp){
	log_message('error, Local Server not connected: ' . $exp->getMessage());
}

log_message('end of program');
return;

// -----------------------------------------------------------------------------
function get_server_host($the_local_db, $the_server_number) {
	$my_sql = ''
		. 'SELECT value'
		. '  FROM Controls'
		. ' WHERE status = "Active"'
		. '   AND group_set = "Servers Host"'
		. '   AND name = "' . $the_server_number . '"'
		;
	return $the_local_db->fetchOne($my_sql);
}

function get_servers_host($the_server_number, $the_local_db) {
	$my_sql = ''
		. 'SELECT name, value'
		. '  FROM Controls'
		. ' WHERE status = "Active"'
		. '   AND group_set = "Servers Host"'
		. '   AND name != "' . $the_server_number . '"'
		;
	return $the_local_db->fetchAll($my_sql);
}

function get_history_rows($the_reference_time, $the_local_db) {
	$my_sql = ''
		. 'SELECT id, status, updated_at'
		. '  FROM Sales'
		. ' WHERE status IN ("Paid", "Closed")'
		. '   AND updated_at <= "' . $the_reference_time . '"'
		;
	return $the_local_db->fetchAll($my_sql);
}

function show_tables($the_server_number, $the_local_db, $the_host_db) {
	$my_sql = 'SHOW TABLES';
	$my_rows = $the_host_db->fetchAll($my_sql);
	foreach($my_rows as $my_row) {
		foreach($my_row as $my_key => $my_table_name) {
//			print '<br>' . $table_name;
			$my_sql = 'SELECT * FROM ' . $my_table_name;
			$result = $the_host_db->fetchAll($my_sql);
			log_message('Count of ' . $my_table_name . ': ' . count($result));
		}
	}
}

function process_changes($the_server_number, $the_local_db, $the_host_db) {
	$my_table = 'Changes';
	$my_sql = ''
		. 'SELECT *'
		. ' FROM ' . $my_table
		. ' WHERE servers IS NULL'
		. '    OR LOCATE("' . $the_server_number . ' ", servers) = 0'
		. ' ORDER BY table_name, table_id, updated_at'
		. ' LIMIT 500'
		;
	$my_changes = $the_host_db->fetchAll($my_sql);
	$my_count	= count($my_changes);
	log_message($my_table . ' has ' . $my_count . ' records');
	if ($my_count == 0)		return;

	$my_update	= '';
	foreach($my_changes as $my_change) {
		$my_id			= $my_change['id'			];
		$my_table_name	= $my_change['table_name'	];
		$my_table_id	= $my_change['table_id'		];
log_message($my_table . ': ' . $my_id . ', ' . $my_table_name . ': ' . $my_table_id);

		$my_sql = ''
			. 'SELECT *'
			. '  FROM ' . $my_table_name
			. ' WHERE id = ' . $my_table_id
			;
		$my_local_row = $the_local_db->fetchRow($my_sql);
//log_message(json_encode($my_local_row));

		$my_host_row = $the_host_db->fetchRow($my_sql);
//log_message(json_encode($my_host_row));

/**
 *		Skip DB syncronization for
 *		Controls: Servers Host or System Keys or System Numbers
 */
		if ($my_table_name == 'Controls') {
			if ($my_host_row['group_set'] == 'Servers Host'
			||  $my_host_row['group_set'] == 'System Keys'
			||  $my_host_row['group_set'] == 'System Numbers') {
				$my_sql = ''
					. 'UPDATE ' . $my_table
					. '   SET servers = CONCAT(servers, "' . $the_server_number . ' ")'
					. ' WHERE id = ' . $my_id
					;
				$the_host_db->query($my_sql);
				continue;
			}
		}

		$my_sql = '';
		if ($my_local_row) {
			if ($my_change['updated_at'] > $my_local_row['updated_at']) {
				if ($my_host_row) {
					log_message('Update');
					$my_sql = get_sql_replace($my_table_name, $my_host_row);
				}else{
					log_message('Delete');
					$my_sql = ''
						. 'DELETE FROM ' . $my_table_name
						. ' WHERE id = ' . $my_table_id
						;
				}
			}else{
				log_message('Outdated');
			}
		}else{
			if ($my_host_row) {
				log_message('Insert');
				$my_sql = get_sql_replace($my_table_name, $my_host_row);
			}else{
				log_message('Nothing');
			}
		}

		if ($my_sql != '') {
log_message('my_sql: ' . $my_sql);
			$the_local_db->query($my_sql);
		}
/*
		$my_servers = $my_change['servers'] . $the_server_number . ' ';

		if (strlen($my_servers) < SERVERS_LENGTH) {
			$my_sql = ''
				. 'UPDATE ' . $my_table
				. '   SET servers = CONCAT(servers, "' . $the_server_number . ' ")'
				. ' WHERE id = ' . $my_id
				;
		}else{
			$my_sql = ''
				. 'DELETE FROM Changes'
				. ' WHERE id = ' . $my_id
				;
		}
log_message('my_sql: ' . $my_sql);
		$the_host_db->query($my_sql);
		$my_update .= NL
			. 'UPDATE ' . $my_table
			. '   SET servers = CONCAT(servers, "' . $the_server_number . ' ")'
			. ' WHERE id = ' . $my_id . ';'
			;
 */

		$my_sql = ''
			. 'UPDATE ' . $my_table
			. '   SET servers = CONCAT(servers, "' . $the_server_number . ' ")'
			. ' WHERE id = ' . $my_id
			;
		$the_host_db->query($my_sql);
	}
//log_message('my_update: ' . $my_update);
//	$the_host_db->query($my_update);
}

function process_history($the_reference_time, $the_local_db, $the_host_db) {
	$my_history_rows = get_history_rows($the_reference_time, $the_local_db);
	log_message('number of rows: ' . count($my_history_rows));

	foreach($my_history_rows as $my_row) {
		$my_sql = ''
			. 'SELECT id, status, updated_at'
			. '  FROM Sales'
			. ' WHERE id = '			. $my_row['id']
			. '   AND status = "'		. $my_row['status'] . '"'	
			. '   AND updated_at = "'	. $my_row['updated_at'] . '"'	
			;
		$my_history = $the_host_db->fetchAll($my_sql);
		if (count($my_history) == 1) {
			$my_sql = 'DELETE SaleColors'
					. '  FROM SaleColors'
					. '  LEFT JOIN SaleLines ON SaleLines.id = SaleColors.parent_id'
					. ' WHERE SaleLines.parent_id = ' . $my_row['id']
					;
			$my_result = $the_local_db->query($my_sql);
			$my_sql = 'DELETE FROM SaleLines'
					. ' WHERE parent_id = '	. $my_row['id']
					;
			$my_result = $the_local_db->query($my_sql);
			$my_sql = 'DELETE FROM SaleOuts'
					. ' WHERE sale_id = '	. $my_row['id']
					;
			$my_result = $the_local_db->query($my_sql);
			$my_sql = 'DELETE FROM Receivables'
					. ' WHERE sale_id = '	. $my_row['id']
					;
			$my_result = $the_local_db->query($my_sql);
			$my_sql = 'DELETE FROM Sales'
					. ' WHERE id = '		. $my_row['id']
					;
			$my_result = $the_local_db->query($my_sql);
log_message('history recorded for: ' . $my_row['id']);
		}
	}
}

// -----------------------------------------------------------------------------
function get_db_params($the_server_number) {
	$my_params = array();

	switch($the_server_number) {
		 case('1')	:	$my_params = array
							('host'		=> '201.83.204.120'
							,'username'	=> 'root'
							,'password'	=> 'brazil18781'
							,'dbname'	=> 'erp'
							);
						break;
		 case('2')	:	$my_params = array
							('host'		=> '186.220.62.214'
							,'username'	=> 'root'
							,'password'	=> 'brazil18781'
							,'dbname'	=> 'erp'
							);
						break;
		 case('8')	:	$my_params = array
							('host'		=> '76.170.81.230'
							,'username'	=> 'db122232'
							,'password'	=> 'brazil.18781'
							,'dbname'	=> 'erp'
							);
						break;
		 case('9')	:	$my_params = array
							('host'		=> 'external-db.s122232.gridserver.com'
							,'username'	=> 'db122232'
							,'password'	=> 'brazil.18781'
							,'dbname'	=> 'db122232_tecno'
							);
						break;
	}
	return $my_params;
}

function get_sql_replace($the_table_name, $the_row) {
	$my_sql = 'REPLACE INTO ' . $the_table_name . ' SET ';
	$my_first = '';

	foreach($the_row as $my_name => $my_value) {
//var_dump($the_row);
		if (is_null($my_value)) {
			$my_sql .= $my_first . $my_name . ' = null';
		}else{
			if (is_numeric($my_value) and substr($my_value, 0, 1) != '0') {
				$my_sql .= $my_first . $my_name . ' = ' . $my_value;
			}else{
				$my_sql .= $my_first . $my_name . ' = "' . $my_value . '"';
			}
		}
		$my_first = ', ';
	}
	return $my_sql . ' ;';
}

# ------------------------------------------------------------------------------
#    set system key
# ------------------------------------------------------------------------------
function set_system_key($the_local_db, $the_name, $the_value) {
     $sql = 'UPDATE Controls'
          . '   SET value = "' . $the_value . ' ' . get_now() . '"'
//        . ' WHERE company_id   =  ' . get_session('control_company', COMPANY_ID)
          . ' WHERE group_set = "System Keys"'
          . '   AND name = "' . $the_name . '"'
          ;
     $the_local_db->query($sql);
}

# ------------------------------------------------------------------------------
#    get system key
# ------------------------------------------------------------------------------
function get_system_key($the_local_db, $the_name) {
     $sql = 'SELECT value'
          . '  FROM Controls'
//        . ' WHERE company_id   =  ' . get_session('control_company', COMPANY_ID)
          . ' WHERE group_set = "System Keys"'
          . '   AND name = "' . $the_name . '"'
          ;
     return $the_local_db->fetchOne($sql);
}

function log_message($message) {
	$date = date( 'Y-m-d' );
	$logFile = fopen( SERVER_BASE . PROGRAM_NAME . '/' . $date . '.txt', 'a' ) or die( 'cannot open log ' . PROGRAM_NAME . ' file' );
	fwrite( $logFile, get_now() . ' ' . $message . NL );
	fclose( $logFile );
//	print(get_now() . ' ' . $message . NL);
}

?>
