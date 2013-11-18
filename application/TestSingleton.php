<?php
require_once 'Constant.php';
require_once 'Utility.php';
require_once 'Singleton.php';

define('PROGRAM_NAME'	,	'SynDB');
define('LOCAL_SERVER'	,	'erp');						//	local server for test
define('MAIN_SERVER'	,	'erp.jkysoftware.com');		//	main server for production

class TestDB extends Singleton {
	public function run() {
		set_time_limit(0);
		error_reporting(E_ALL);		//	report errors

		ini_set('display_startup_errors', 'on');
		ini_set('display_errors'		, 'on');

		date_default_timezone_set('America/Sao_Paulo');

		$program_name = $_SERVER['PHP_SELF'];
		//require_once 'Zend/Db.php';

		$this->log_message('');
		$this->log_message('start of program');

		try{
		//	$my_params = array('host'=>DB_HOST, 'username'=>DB_USER, 'password'=>DB_PASS, 'dbname'=>DB_NAME);
		//	$my_params = array('host'=>'177.33.255.216', 'username'=>'root', 'password'=>'brazil18781', 'dbname'=>'erp');
		//	$my_params = array('host'=>'external-db.s122232.gridserver.com', 'username'=>'db122232', 'password'=>'brazil.18781', 'dbname'=>'db122232_erp');
		//	$my_local_db = Zend_Db::factory('PDO_MYSQL', $my_params);

			$my_host	= 'external-db.s122232.gridserver.com';
			$my_username= 'db122232';
			$my_password= 'brazil.18781';
			$my_dbname	= 'db122232_erp';

			$my_host	= '201.83.200.78';
			$my_username= 'root';
			$my_password= 'brazil18781';
			$my_dbname	= 'erp';

			$my_host	= '127.0.0.1';
			$my_username= 'root';
			$my_password= 'brazil18781';
			$my_dbname	= 'erp';

			$my_host_db = mysql_connect($my_host, $my_username, $my_password);
			if ($my_host_db) {
				$this->log_message('OK, Remote host ' . $my_host . ' connected.');

				$my_sql = 'USE ' . $my_dbname;
				mysql_query($my_sql, $my_host_db);

				$my_sql = ''
					. 'SELECT *'
		//			. '  FROM Boxes'
					. '  FROM Changes'
		//			. ' WHERE servers IS NOT NULL'
		//			. ' LIMIT 200'
					;
				$my_rows  = mysql_query($my_sql, $my_host_db);
				$my_count = mysql_num_rows($my_rows);
				$this->log_message('Count: ' . $my_count);
				for ($i=$my_count; $i>0; $i--) {
					 $my_row = mysql_fetch_array($my_rows);
		//			 $this->log_message($i . ': ' . $my_row['barcode'] . ', ' . $my_row['updated_at'] . ', ' . $my_row['average_weight']);
					 $this->log_message($i . ': ' . $my_row['table_name'] . ', ' . $my_row['table_id']);
				}
			} else {
				$this->log_message('error, Remote host ' . $my_host . ' not connected');
			}
		}catch(Exception $exp){
			$this->log_message('error, Local database not connected: ' . $exp->getMessage());
		}

		$this->log_message('end of program');
		return;
	}

// -----------------------------------------------------------------------------
	private function get_servers_host($the_db, $the_server_number) {
		$sql= 'SELECT name, value'
			. '  FROM Controls'
			. ' WHERE status = "Active"'
			. '   AND group_set = "Servers Host"'
			. '   AND name != "' . $the_server_number . '"'
			;
		$my_servers_host = $the_db->fetchAll($sql);
		return $my_servers_host;
	}

	private function process_changes($the_db) {
		$sql = 'SHOW TABLES';
		$rows = $the_db->fetchAll($sql);
		foreach($rows as $row) {
			foreach($row as $key => $table_name) {
	//			print '<br>' . $table_name;
				$sql = 'SELECT * FROM ' . $table_name;
				$result = $the_db->fetchAll($sql);
				$this->log_message('Count of ' . $table_name . ': ' . count($result));
			}
		}
	}

// -----------------------------------------------------------------------------
	private function get_db_params($the_server_number) {
		$my_params = array();

		switch($the_server_number) {
			 case('1')	:	$my_params = array
								('host'		=> '201.83.200.78'
								,'username'	=> 'root'
								,'password'	=> 'brazil18781'
								,'dbname'	=> 'erp'
								);
							break;
			 case('2')	:	$my_params = array
								('host'		=> '177.33.255.216'
								,'username'	=> 'root'
								,'password'	=> 'brazil18781'
								,'dbname'	=> 'erp'
								);
							break;
			 case('8')	:	$my_params = array
								('host'		=> '172.248.88.107'
								,'username'	=> 'db122232'
								,'password'	=> 'brazil.18781'
								,'dbname'	=> 'erp'
								);
							break;
			 case('9')	:	$my_params = array
								('host'		=> 'external-db.s122232.gridserver.com'
								,'username'	=> 'db122232'
								,'password'	=> 'brazil.18781'
								,'dbname'	=> 'db122232_erp'
								);
							break;
		}
		return $my_params;
	}

// -----------------------------------------------------------------------------

	private function log_message($message) {
		$date = date( 'Y-m-d' );
		$logFile = fopen( SERVER_BASE . PROGRAM_NAME . '/' . $date . '.txt', 'a' ) or die( 'cannot open log ' . PROGRAM_NAME . ' folder' );
		fwrite( $logFile, get_now() . ' ' . $message . NL );
		fclose( $logFile );
		print(get_now() . ' ' . $message . NL);
	}
}

$firstObj = Singleton::getInstance();
var_dump($firstObj === Singleton::getInstance());	// true

$secondObj = TestDB::getInstance();
var_dump($secondObj === Singleton::getInstance());	// false

var_dump($secondObj === TestDB::getInstance());		// true

$secondObj->run();
?>
