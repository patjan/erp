<?php
require_once 'Constant.php';
require_once  'Utility.php';

define('PROGRAM_NAME'	,	'SynIP');
define('LOCAL_SERVER'	,	'erp');						//	local server for test
define('MAIN_SERVER'	,	'erp.jkysoftware.com');		//	main server for production

/**
 *	Program:	SynIP.php
 *	 Author:	Pat Jan
 *	Command:	cd /htdocs/erp/application
 *				php SynIP.php
 *	 Domain:	process only on local server
 * 		Run:	started by Scheduled Tasks and run every 10 minutes
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

date_default_timezone_set('America/Sao_Paulo');

$program_name = $_SERVER['PHP_SELF'];
require_once 'Zend/Db.php';

log_message('');
log_message('start of program');

try{
	$my_params = array('host'=>DB_HOST, 'username'=>DB_USER, 'password'=>DB_PASS, 'dbname'=>DB_NAME);
	$my_local_db = Zend_Db::factory('PDO_MYSQL', $my_params);
	$my_local_db->getConnection();

	$my_status = get_system_key($my_local_db);
	if ('started' == substr($my_status, 0, 7)) {
		log_message('running since ' . $my_status);
	}else{
		set_system_key($my_local_db, 'started');
		$my_previous_ip = get_previous_ip(SERVER_NUMBER, $my_local_db);
		set_ip(SERVER_NUMBER, $my_local_db, $my_previous_ip);
		set_system_key($my_local_db, 'stopped');
	}

}catch(Exception $exp){
	log_message('error, Local Server not connected: ' . $exp->getMessage());
}

log_message('end of program');
return;

// -----------------------------------------------------------------------------------------
function get_previous_ip($the_server_number, $the_local_db) {
	$sql= 'SELECT value'
		. '  FROM Controls'
		. ' WHERE status = "Active"'
		. '   AND group_set = "Servers Host"'
		. '   AND name = "' . $the_server_number . '"'
		;
	$my_previous_ip = $the_local_db->fetchOne($sql);
	return $my_previous_ip;
}

function set_ip($the_server_number, $the_local_db, $the_previous_ip) {
	$cURL = curl_init('http://' . MAIN_SERVER . '/index.php/Setip');
	curl_setopt($cURL, CURLOPT_POST, 1);
	curl_setopt($cURL, CURLOPT_POSTFIELDS, 'data=' . $the_server_number . ',' . $the_previous_ip);
	curl_setopt($cURL, CURLOPT_RETURNTRANSFER, 1);
	$my_data = curl_exec($cURL);
	curl_close($cURL);
//var_dump($my_data);
	if ($my_data == '') {
		log_message('error, no reply from main server: ' . MAIN_SERVER);
	}else{
		update_servers_host($the_local_db, $my_data);
	}
}

function update_servers_host($the_local_db, $the_data) {
	$my_hosts = explode(',', $the_data);
	foreach($my_hosts as $my_host) {
		$my_info = explode(':', $my_host);
		$my_server = $my_info[0];
		$my_new_ip = $my_info[1];
		if (strlen($my_server) == 1
		and strlen($my_new_ip) <= 15) {
			$sql= 'UPDATE Controls'
				. '   SET value = "' . $my_new_ip . '"'
				. ' WHERE group_set = "Servers Host"'
				. '   AND name  = "' . $my_server . '"'
				;
			log_message($sql);
			$the_local_db->query($sql);
		}
	}
}

// -----------------------------------------------------------------------------------------
function build_db($the_server) {
	switch($the_server) {
		 case('1')	:	$params = array
							('host'		=> '201.83.200.83'
							,'username'	=> 'root'
							,'password'	=> 'brazil18781'
							,'dbname'	=> 'erp'
							);
						break;
		 case('2')	:	$params = array
							('host'		=> '201.81.20.19'
							,'username'	=> 'root'
							,'password'	=> 'brazil18781'
							,'dbname'	=> 'erp'
							);
						break;
		 case('8')	:	$params = array
							('host'		=> '172.248.88.107'
							,'username'	=> 'root'
							,'password'	=> 'brazil18781'
							,'dbname'	=> 'erp'
							);
						break;
		 case('9')	:	$params = array
							('host'		=> 'external-db.s122232.gridserver.com'
							,'username'	=> 'db122232'
							,'password'	=> 'brazil.18781'
							,'dbname'	=> 'db122232_erp'
							);
						break;
	}
	return Zend_Db::factory('PDO_MYSQL', $params);
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
	$logFile = fopen( SERVER_BASE . PROGRAM_NAME . '/' . $date . '.txt', 'a' ) or die( 'cannot open log ' . PROGRAM_NAME . ' folder' );
	fwrite( $logFile, get_now() . ' ' . $message . NL );
	fclose( $logFile );
//	print(get_now() . ' ' . $message . NL);
}

function EncryptHash( $String )
{
	$Encrypted = MD5( $String );
	return $Encrypted;
}

function OnlyString( $String )
{
	$myString = '';
	for( $I = 0; $I < strlen( $String ); $I++ )
	{
		$C = $String[ $I ];
		if(	$C == ' ' || ( $C >= '0' && $C <= '9' ) || ( $C >= 'a' && $C <= 'z' ) || ( $C >= 'A' && $C <= 'Z' ) )
			$myString .= $C;
	}
	return $myString;
}

?>
