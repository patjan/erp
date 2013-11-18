<?
/**
 *	Program:	Setip
 *   Author:	Pat Jan
 *	Command:	../index.php/Setip?data=9,123.123.123.123
 *
 *	This controller will be verify the source of Caller Server
 *	and update dynamic IP from Caller Server
 *	and return the list of active servers
 *
 *	[n:123.123.123.123
 *	, ...
 * 	,n:123.123.123.123
 *	]
 */
class	SetipController	extends	JKY_Controller {

public function init() {
	$this->_helper->layout()->disableLayout();
	$this->_helper->viewRenderer->setNoRender();
}

public function indexAction() {
	$my_datas = explode(',', $_REQUEST['data']);

	$my_data_server	= $my_datas[0];
	$my_data_ip		= $my_datas[1];
	$my_current_ip	= $_SERVER['REMOTE_ADDR'];

	$db = Zend_Registry::get('db');

	$sql= 'SELECT id'
		. '  FROM Controls'
		. ' WHERE status = "Active"'
		. '   AND group_set = "Servers Host"'
		. '   AND name  = "' . $my_data_server . '"'
		. '   AND value = "' . $my_data_ip . '"'
		;
	$my_id = $db->fetchOne($sql);

	if ($my_id) {
		if ($my_data_ip != $my_current_ip) {
			$sql= 'UPDATE Controls'
				. '   SET value = "' . $my_current_ip . '"'
				. ' WHERE id = ' . $my_id
				;
			$db->query($sql);
		}
		$sql= 'SELECT *'
			. '  FROM Controls'
			. ' WHERE group_set = "Servers Host"'
			;
		$my_rows = $db->fetchAll($sql);
		$my_data = array();
		foreach( $my_rows as $my_row) {
			$my_data[] = $my_row['name' ] . ':' . $my_row['value'];
		}
		echo implode(',', $my_data);
	}
}

}
?>