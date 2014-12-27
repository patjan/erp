<?
/**
 *	Process all [Ajax] functions
 *	This controller will be used to interface client to mysql using Ajax
 *	@author: Pat Jan
 *
 *	status = 'ok'
 *	status = 'error'
 *
 *	message = 'table name	[X...x] is undefined'
 *	message = 'method name	[X...x] is undefined'
 *	message = 'error on server'				(only for no support)
 *	message = 'error on mysql: x...x'		(only for support)
 *	message = 'duplicate id'
 *
 */
class	TestController	extends	JKY_Controller {

public function init() {
	$this->_helper->layout()->disableLayout();
	$this->_helper->viewRenderer->setNoRender();

	$params = array
		('host' => 'localhost'
		,'username' => 'root'
		,'password' => 'brazil18781'
		,'dbname' => 'erp'
		);
	$params = array
		('host'		=> 'erphquser.db.8682013.hostedresource.com'
		,'username'	=> 'erphquser'
		,'password'	=> 'ERP1@password'
		,'dbname'	=> 'erphquser'
		);
	$params = array
		('host'		=> 'external-db.s122232.gridserver.com'
		,'username'	=> 'db122232'
		,'password'	=> 'brazil.18781'
		,'dbname'	=> 'db122232_erp'
		);

	$db = Zend_Db::factory('PDO_MYSQL', $params);
/*
	print '<br><br>';
	$sql = 'SELECT * FROM Controls WHERE id = 1000000010';
	$result = $db->fetchAll($sql);
	var_dump($result);

	$sql = 'UPDATE Controls SET value = 'Pat Jan' WHERE id = 1000000010';
	$result = $db->query($sql);

	print '<br><br>';
	$sql = 'SELECT * FROM Controls WHERE id = 1000000010';
	$result = $db->fetchAll($sql);
	var_dump($result);


	$sql = 'SHOW TABLES';
	$rows = $db->fetchAll($sql);
//	var_dump($rows);

	foreach($rows as $row) {
		foreach($row as $key => $table_name) {
//			print '<br>' . $table_name;
			$sql = 'SELECT * FROM ' . $table_name;
			$result = $db->fetchAll($sql);
			print '<br>' . get_now() . ' Count of ' . $table_name . ': ' . count($result);
		}

	}

 */

	$sql= 'UPDATE Changes'
		. '   SET updated_at ="' . get_now() . '"'
		. ' WHERE id = 1000000001'
		;
	$result = $db->query($sql);
	$sql= 'UPDATE Changes'
		. '   SET updated_at ="' . get_now() . '"'
		. ' WHERE id = 1000000002'
		;
	$result = $db->query($sql);
	$sql= 'UPDATE Changes'
		. '   SET updated_at ="' . get_now() . '"'
		. ' WHERE id = 1000000003'
		;
	$result = $db->query($sql);
	$sql= 'UPDATE Changes'
		. '   SET updated_at ="' . get_now() . '"'
		. ' WHERE id = 1000000004'
		;
	$result = $db->query($sql);

	$sql = 'SELECT * FROM Changes';
	$rows = $db->fetchAll($sql);
	foreach($rows as $row) {
		print '<br>Changes: ' . $row['updated_at'];
	}

}
}

?>