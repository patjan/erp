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

	$my_status = get_system_key($my_local_db);
	if ('started' == substr($my_status, 0, 7)) {
		log_message('running since ' . $my_status);
	}else{
		set_system_key($my_local_db, 'started');
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
		set_system_key($my_local_db, 'stopped');
	}

}catch(Exception $exp){
	log_message('error, Local Server not connected: ' . $exp->getMessage());
}

log_message('end of program');
return;

// -----------------------------------------------------------------------------
function get_servers_host($the_server_number, $the_local_db) {
	$my_sql = ''
		. 'SELECT name, value'
		. '  FROM Controls'
		. ' WHERE status = "Active"'
		. '   AND group_set = "Servers Host"'
		. '   AND name != "' . $the_server_number . '"'
		;
	$my_servers_host = $the_local_db->fetchAll($my_sql);
	return $my_servers_host;
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
		. ' ORDER BY table_name, table_id, created_at'
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
			if ($my_change['created_at'] > $my_local_row['updated_at']) {
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
			if (is_numeric($my_value)) {
				$my_sql .= $my_first . $my_name . ' = ' . $my_value;
			}else{
				$my_sql .= $my_first . $my_name . ' = "' . $my_value . '"';
			}
		}
		$my_first = ', ';
	}
	return $my_sql . ' ;';
}

// -----------------------------------------------------------------------------------------
function DeleteHistory( $LocalLink )
{
     $TempoAtivo = XGetParametro( $LocalLink, 'Tempo Ativo' );

//   $TempoDe = date( 'Y-m-d ' ) . ( date( 'H' ) - $TempoAtivo ) . date( ':i:s' ) ;
     $TempoDe = date( 'Y-m-d H:i:s', ( time() - ( $TempoAtivo * 60 )));

     Display( 'Tempo De: ' . $TempoDe );

     $SQL = 'SELECT Id, Status, Updated'
          . '  FROM Tecno.Fichas'
          . ' WHERE Status != "A" AND Updated <= "' . $TempoDe . '"'
          ;
     $Select = mysql_query( $SQL, $LocalLink );
     if( $Select )
          $NumberRows = mysql_num_rows( $Select );
     else $NumberRows = 0;

     if( $NumberRows == 0 )
          return;

     Display( 'NumberRows: ' . $NumberRows );

     for( $I = $NumberRows; $I > 0; $I-- )
     {
//        if(( $I % 10 ) == 0 )
//             echo "\n\r" . GetNow() . ' D Registros: ' . $I . '      ' ;

          $Record = mysql_fetch_array( $Select );
          $Id       = $Record[ 'Id'          ];
          $Status   = $Record[ 'Status'      ];
          $Updated  = $Record[ 'Updated'     ];

// echo "\n\r" . 'Id: ' . $Id . ', Status: ' . $Status . ', Updated: ' . $Updated;

//        Verificar se o registro existe no Remota
//        Este SQL demora bastante no Brasil ( 0.300 sec ), US ( 0.007 sec )
          $RSQL = 'SELECT Id, Status, Updated'
               . '  FROM tecno2012.Fichas'
//             . '  FROM Remota.Fichas'
               . ' WHERE Id = ' . $Id
               . '   AND Status  = "' . $Status  . '"'
               . '   AND Updated = "' . $Updated . '"'
               ;
          $RResult  = SendSQL( $RSQL );
          $Reply    = substr( $RResult, 7, 2 );
          $NumRows  = substr( $RResult, 10 );
// echo "\n\r" . 'RResult: ' . $RResult . ', Reply: ' . $Reply . ', NumRows: ' . $NumRows;

          if( $Reply == 'OK' && $NumRows > 0 )
          {
               //   Se o registro existe, gerar SQL Deletes
               $LSQL = 'DELETE FROM Tecno.Fichas WHERE Id = ' . $Id . ';';
               $LResult = mysql_query( $LSQL, $LocalLink );
               $LSQL = 'DELETE FROM Tecno.FicItems WHERE Ficha = ' . $Id . ';';
               $LResult = mysql_query( $LSQL, $LocalLink );
               $LSQL = 'DELETE FROM Tecno.Transacoes WHERE Ficha = ' . $Id . ';';
               $LResult = mysql_query( $LSQL, $LocalLink );
          }
     }
echo "\n\r" . GetNow() . ' D Registros: ' . $NumberRows;
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
//	print(get_now() . ' ' . $message . NL);
}

function OnlyString( $String )
{
     $myString = '';
     for( $I = 0; $I < strlen( $String ); $I++ )
     {
          $C = $String[ $I ];
          if( $C == ' ' || ( $C >= '0' && $C <= '9' ) || ( $C >= 'a' && $C <= 'z' ) || ( $C >= 'A' && $C <= 'Z' ) )
               $myString .= $C;
     }
     return $myString;
}

?>
