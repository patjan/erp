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
class	AjaxController
extends	JKY_Controller {

public function init() {
	$this->_helper->layout()->disableLayout();
	$this->_helper->viewRenderer->setNoRender();

//	set_session('user_level', MINIMUM_TO_BROWSE  );
//	set_session('user_level', MINIMUM_TO_SUPPORT );
//	set_session('user_role' , 'Support'  );
//	set_session('full_name' , 'Pat Jan'  );
//	set_session('user_id'	, 4 );
	set_permissions('Support');

	if (!is_session('control_company'	))		set_session('control_company'	, COMPANY_ID);
	if (!is_session('user_time'			))		set_session('user_time'			, date( 'Y-m-d H:i:s'));
	if (!is_session('user_role'			))		set_session('user_role'			, 'visitor');
	if (!is_session('event_id'			)) {
//		set_session('event_id'	, $this->get_last_id('Events', 'status="Active"'));
//		set_session('event_name', get_table_value('Events', 'event_name', get_session('event_id')));
	}
	if (!is_session('permissions'		))		set_permissions(get_session('user_role'));

}

public function indexAction() {
	try {
		$request	= Zend_Controller_Front::getInstance()->getRequest();
		$controller	= $request->getControllerName();
		$action		= $request->getActionName();
		logger($controller);

		$data = json_decode(get_request('data'), true);
//		$method = get_request('method');
		$method = $data['method'];
		switch ($method) {
			case 'set_language'		: $this->set_language	(); return;
			case 'get_language'		: $this->get_language	(); return;
			case 'set_session'		: $this->set_session	(); return;
			case 'get_session'		: $this->get_session	(); return;
			case 'get_options'		: $this->get_options	($data); return;
			case 'get_users'		: $this->get_users		(); return;
			case 'get_controls' 	: $this->get_controls	($data); return;
			case 'get_configs'		: $this->get_configs	($data); return;
			case 'get_categories'	: $this->get_categories	(); return;
			case 'get_profile'		: $this->get_profile	(); return;
			case 'get_contact'		: $this->get_contact	(); return;
			case 'get_contact_id'	: $this->get_contact_id	(); return;
			case 'get_user_id'		: $this->get_user_id	($data); return;
			case 'set_company_id'	: $this->set_company_id	(); return;
			case 'get_company_id'	: $this->get_company_id	(); return;
			case 'set_user_id'		: $this->set_user_id	(); return;
			case 'set_event_id'		: $this->set_event_id	(); return;
			case 'set_group_id'		: $this->set_group_id	(); return;

//			case 'get_user_screen'	: $this->get_user_screen(); return;
//			case 'get_header'		: $this->get_header		(); return;
//			case 'get_menus'		: $this->get_menus		(); return;

			case 'check_session'	: $this->check_session	(); return;
			case 'log_in'			: $this->log_in			($data); return;
			case 'log_out'			: $this->log_out		($data); return;
			case 'log_help'			: $this->log_help		(); return;
			case 'profile'			: $this->profile		($data); return;
			case 'sign_up'			: $this->sign_up		(); return;
			case 'confirm'			: $this->confirm		(); return;
			case 'reset'			: $this->reset			(); return;

			case 'send_email'		: $this->send_email		(); return;
			case 'send_receipt'		: $this->send_receipt	(); return;
		}

//		$table = get_request('table');
		$table = $data['table'];
		$user_action = get_user_action($table);
		if ($user_action == '') {
			$user_action = get_user_action('All');
		}

	set_session('user_action', $user_action);

	//	for undefined resource or denied user_action
	if ($user_action == '' or $user_action == 'Denied') {
		$this->echo_error('resource [' . $table . '] is denied with action: ' . $user_action);
		return;
	}

	if ($user_action != 'All') {
		switch ($method) {
/*
			case 'get_names'	: $required = 'View Insert Update Delete Export'; break;
			case 'get_id'		: $required = 'View Insert Update Delete Export'; break;
			case 'get_count'	: $required = 'View Insert Update Delete Export'; break;
			case 'get_value'	: $required = 'View Insert Update Delete Export'; break;
			case 'get_row'		: $required = 'View Insert Update Delete Export'; break;
			case 'get_rows'		: $required = 'View Insert Update Delete Export'; break;

			case 'get_index'	: $required = 'View Insert Update Delete Export'; break;
			case 'get_comments'	: $required = 'View Insert Update Delete Export'; break;
			case 'add_comment'	: $required = 'View Insert Update Delete Export'; break;
*/
			case 'get_names'	: $required = 'View'	; break;
			case 'get_id'		: $required = 'View'	; break;
			case 'get_ids'		: $required = 'View'	; break;
			case 'get_count'	: $required = 'View'	; break;
			case 'get_value'	: $required = 'View'	; break;
			case 'get_row'		: $required = 'View'	; break;
			case 'get_rows'		: $required = 'View'	; break;

			case 'get_index'	: $required = 'View'	; break;
			case 'get_comments'	: $required = 'View'	; break;
			case 'add_comment'	: $required = 'View'	; break;		//	???? Update

			case 'get_columns'	: $required = 'Export'	; break;

			case 'insert'		: $required = 'Insert'	; break;
			case 'update'		: $required = 'Update'	; break;
			case 'replace'		: $required = 'Update'	; break;
			case 'delete'		: $required = 'Delete'	; break;
			case 'delete_many'	: $required = 'Delete'	; break;
			case 'combine'		: $required = 'Combine'	; break;
			case 'publish'		: $required = 'Publish'	; break;
			case 'export'		: $required = 'Export'	; break;

			default				: $this->echo_error('method name [' . $method . '] is undefined'); return;
		}

//		for undefined user_action
//		if (strpos($required, $user_action) === false) {
			if ($required != 'View' and strpos($user_action, $required) === false) {
				$this->echo_error('method name [' . $method . '] is denied, action: ' . $user_action . ', required: ' . $required);
				return;
			}
	}

	switch( $method ) {
		case 'get_names'	: $this->get_names		($data); break;
		case 'get_id'		: $this->get_id			($data); break;
		case 'get_ids'		: $this->get_ids		($data); break;
		case 'get_count'	: $this->get_count		(); break;
		case 'get_value'	: $this->get_value		($data); break;
		case 'get_row'		: $this->get_row		($data); break;
		case 'get_rows'		: $this->get_rows		($data); break;
		case 'get_index'	: $this->get_index		($data); break;
		case 'get_comments'	: $this->get_comments	(); break;
		case 'add_comment'	: $this->add_comment	(); break;
		case 'get_columns'	: $this->get_columns	($data); break;
		case 'insert'		: $this->insert			($data); break;
		case 'update'		: $this->update			($data); break;
		case 'replace'		: $this->replace		($data); break;
		case 'delete'		: $this->delete			($data); break;
		case 'delete_many'	: $this->delete_many	($data); break;
		case 'combine'		: $this->combine		(); break;
		case 'publish'		: $this->publish		($data); break;
		case 'export'		: $this->get_index		($data); break;
		case 'refresh'		: $this->refresh		(); break;

		case 'set_amount'	: $this->set_amount		(); break;
		case 'reset_amount'	: $this->reset_amount	(); break;

		default				: $this->echo_error('method name [' . $method . '] is undefined'); return;
	}

//		process insert duplicate
//		process limit number of rows

	return;

	} catch(Exception $exp){
//		if (get_session('user_level') == MINIMUM_TO_SUPPORT) {
			$this->echo_error('' . $exp);
//		}else{
//			$this->echo_error('error on server');
//		}
	}
}

/**
 *	get security
 *	if
 *
 *	return where
 */
private function get_security($table, $where) {
	if (get_session('user_action') == 'All') {
		return $where;
	}

	switch($table) {
		case 'Contacts'		: return      'Contacts.id=' . get_session('user_id');
		case 'Services'		: return 'Services.user_id=' . get_session('user_id') . ' AND Services.event_id=' . get_session('event_id');
		default				: return $where;
	}
}

/**
 *	$.ajax({ method: get_names, table: x...x, field: x...x, key: x...x });
 *
 *	return: [ x...x, ..., x...x ]
 */
private function get_names($data) {
	$table = get_data($data, 'table');
	$field = get_data($data, 'field');
	$key   = get_data($data, 'key'	);
	$data  = '';

	if ($key != '') {
		$sql= 'SELECT ' . $field . ' AS value'
			. '  FROM ' . $table
			. ' WHERE ' . $field . ' LIKE "%' . $key . '%"'
			. ' ORDER BY ' . $field
			. ' LIMIT 0, 10'
			;
		$db   = Zend_Registry::get('db');
		$rows = $db->fetchAll($sql);

		$prepen = '';
		foreach($rows as $row) {
			$data  .= $prepen . '"' . $row['value'] . '"';
			$prepen = ', ';
		}
	}
	echo '[' . $data . ']';
}

/**
 *   $.ajax({ method: get_user_screen, name: x...x });
 *
 *   return: [ x...x, ..., x...x ]
 */
private function get_user_screen() {
	$name = get_request('name');

	$sql= 'SELECT value'
		. '  FROM Controls'
		. ' WHERE group_set  = "User Screens"'
		. '   AND control_name = "' . $name . '"'
		;
//$this->log_sql( null, 'get_user_screen', $sql );
	$db = Zend_Registry::get('db');
	$return = array();
	$return['status'] = 'ok';
	$return['page'	] = $db->fetchOne($sql);
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_id, table: x...x, where: x...x });
 *
 *	status: ok
 *	id: 9...9 (false)
 */
private function get_id($data) {
	$table = get_data($data, 'table');
	$where = $this->get_security($table, get_data($data, 'where'));

	if ($where == '') {
		$this->echo_error('missing [where] statement');
		return;
	}

	$sql= 'SELECT id'
		. '  FROM ' . $table
		. ' WHERE ' . $where
		;
$this->log_sql( $table, 'get_id', $sql );
	$db = Zend_Registry::get('db');
	$return = array();
	$return['status'] = 'ok';
	$return['id'	] = $db->fetchOne($sql);
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_ids, table: x...x });
 *
 *	return: [ x...x, ..., x...x ]
 */
private function get_ids($data) {
	$table = get_data($data, 'table');
	$sql= 'SELECT id, name'
		. '  FROM ' . $table
		. ' WHERE status = "Active"'
		. ' ORDER BY name'
		;
	$db = Zend_Registry::get('db');
	$return = array();
	$return['status'] = 'ok';
	$return['rows'	] = $db->fetchAll($sql);
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_count, table: x...x [, where: x...x] });
 *
 *	status: ok
 *	count: 9...9
 */
private function get_count($data) {
	$table = get_data($data, 'table');
	$where = $this->get_security($table, get_data($data, 'where'));

	if ($where != '') {
		$where = ' WHERE ' . $where;
	}

	$sql= 'SELECT COUNT(*) AS count'
		. '  FROM ' . $table
		. $where
		;

	$db = Zend_Registry::get('db');
	$return = array();
	$return['status'] = 'ok';
	$return['count'	] = $db->fetchOne($sql);
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_value, table: x...x, field:x...x, where: x...x });
 *
 *	status: ok
 *	value: x...x (false)
 */
private function get_value($data) {
	$table = get_data($data, 'table');
	$field = get_data($data, 'field');
	$where = $this->get_security($table, get_data($data, 'where'));

	if ($field == '') {
		$this->echo_error('missing [field] statement');
		return;
	}

	if ($where == '') {
		$this->echo_error('missing [where] statement');
		return;
	}

	$sql= 'SELECT ' . $field
		. '  FROM ' . $table
		. ' WHERE ' . $where
		;
	$db = Zend_Registry::get('db');
	$return = array();
	$return['status'] = 'ok';
	$return['value'	] = $db->fetchOne($sql);
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_row, table: x...x, where: x...x });
 *
 *	status: ok
 *	row: { x...x: y...y, ... } (false)
 */
private function get_row($data) {
	$table = get_data($data, 'table');
	$where = $this->get_security($table, get_data($data, 'where'));

	if ($where == '') {
		$this->echo_error('missing [where] statement');
		return;
	}

	$sql= 'SELECT ' . $table . '.*' . $this->set_new_fields($table)
		. '  FROM ' . $table		. $this->set_left_joins($table)
		. ' WHERE ' . $where
		;
//$this->log_sql( $table, 'get_row', $sql );
	$db  = Zend_Registry::get('db');
	$row = $db->fetchRow($sql);

	if ($table == 'Categories') {
		$sql = 'SELECT COUNT(*) FROM Categories WHERE parent_id = ' . $row['id'];
		$row['children'] = $db->fetchOne($sql);
	}

	$return = array();
	$return['status'] = 'ok';
	$return['row'	] = $row;
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_rows, table: x...x [, where: x...x] [, order_by: x...x] });
 *
 *	status: ok
 *	  rows: [{ x...x: y...y, ... } (false)
 *			,{ x...x: y...y, ... }
 *			,{ x...x: y...y, ... }
 *			]
 */
private function get_rows($data) {
	$table = get_data($data, 'table');
	$where = $this->get_security($table, get_data($data, 'where'));
	$order_by = get_data($data, 'order_by');

	if ($where		!= '')		$where		= ' WHERE '		. $where	;
	if ($order_by	!= '')		$order_by	= ' ORDER BY '	. $order_by	;

	$sql= 'SELECT ' . $table . '.*' . $this->set_new_fields($table)
		. '  FROM ' . $table		. $this->set_left_joins($table)
		. $where
		. $order_by
		;
//$this->log_sql($table, 'get_rows', $sql);
	$db   = Zend_Registry::get('db');
	$rows = $db->fetchAll($sql);

	if ($table == 'Categories') {
		$n = 0;
		foreach($rows as $row) {
			$sql = 'SELECT COUNT(*) FROM Categories WHERE parent_id = ' . $row['id'];
			$rows[$n]['children'] = $db->fetchOne($sql);
			$n++;
		}
	}

	$return = array();
	$return['status'] = 'ok';
	$return['rows'	] = $rows;
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_index, table: x...x, filter: x...x, select: x...x, display: x...x, order_by: x...x, specific: x...x });
 *
 *	status: ok
 *	  rows: [{ x...x: y...y, ... } (false)
 *			,{ x...x: y...y, ... }
 *			,{ x...x: y...y, ... }
 *			]
 */
private function get_index($data) {
	if (get_session('user_action') != 'All') {
		return;
	}

	$table		= get_data($data, 'table'	);
	$filter		= get_data($data, 'filter'	);
	$select		= get_data($data, 'select'	);
	$display	= get_data($data, 'display'	);
	$order_by	= get_data($data, 'order_by');
	$specific	= get_data($data, 'specific');

	$where = '';

	if ($specific != '') {
		$where .= $this->set_specific($table, $specific);
	}

	if ($select != 'All') {
		$where .= $this->set_select($table, $select);
	}

	if ($filter != '') {
		$filters = explode(' and ', $filter);
		foreach($filters as $filter)
			$where .= $this->set_where($table, $filter);
	}

	if (is_numeric( $display)) {
		$limit = ' LIMIT ' . $display;
	}else{
		$limit = '';
	}

	if ($table == 'FTP_Sets') {
		$sql= 'SELECT Configs.id as setting, Configs.name, FTP_Sets.id, FTP_Sets.value'
			. '  FROM Configs'
			. '  LEFT JOIN FTP_Sets'
			. '    ON FTP_Sets.setting_id = Configs.id' . $where
			. ' WHERE Configs.group_set = "Settings"'
			. ' ORDER BY Configs.sequence'
			;
	}else{
		if ($where    != '')	{$where		= ' WHERE 1 '  . $where   ;}
		if ($order_by != '')	{$order_by	= ' ORDER BY ' . $order_by;}

		$sql= 'SELECT ' . $table . '.*' . $this->set_new_fields($table)
			. '  FROM ' . $table		. $this->set_left_joins($table)
			. $where
			. $order_by
			. $limit
			;
	}
$this->log_sql($table, 'get_index', $sql);
     $db   = Zend_Registry::get('db');
     $rows = $db->fetchAll($sql);

	if ($table == 'Categories') {
		$n = 0;
		foreach($rows as $row) {
			$sql = 'SELECT COUNT(*) FROM Categories WHERE parent_id = ' . $row['id'];
			$rows[$n]['children'] = $db->fetchOne($sql);
			$n++;
		}
	}

	$return = array();
	$return['status'] = 'ok';
	$return['rows'	] = $rows;
	$this->echo_json($return);
}

private function set_specific($table, $specific) {
	$return = '';
	if ($table == 'Groups'			&& $specific == 'event_id'	)		$return .= ' AND   Groups.event_id   = ' . get_session('event_id');
	if ($table == 'Services'		&& $specific == 'event_id'	)		$return .= ' AND Services.event_id   = ' . get_session('event_id');
	if ($table == 'Services'		&& $specific == 'fee_amount')       $return .= ' AND Services.fee_amount > 0';
	if ($table == 'Translations'	&& $specific == 'locale'	)		$return .= ' AND Translations.locale = "en_us"';
//	if ($specific == 'parent_id')	$return .= ' AND Categories.parent_id = ' . get_session('parent_id');
	if ($table == 'Contacts'		&& $specific == 'is_customer'	)	$return .= ' AND Contacts.is_customer = "Yes"';
	if ($table == 'Contacts'		&& $specific == 'is_supplier'	)	$return .= ' AND Contacts.is_supplier = "Yes"';

	return $return;
}

private function set_select($table, $select) {
//	if ($select == '*' or $select == 'All')		return '';
	if ($select == 'All')		return '';

	$return = '';
	if ($table == 'Categories'	)	$return = ' AND         Parent.category      = "' . $select . '"';
	if ($table == 'Controls'	)	$return = ' AND       Controls.group_set     = "' . $select . '"';
	if ($table == 'Configs'		)	$return = ' AND        Configs.group_set     = "' . $select . '"';
	if ($table == 'Companies'	)	$return = ' AND      Companies.status        = "' . $select . '"';
	if ($table == 'Events'		)	$return = ' AND         Events.status        = "' . $select . '"';
	if ($table == 'Groups'		)	$return = ' AND         Groups.status        = "' . $select . '"';
	if ($table == 'Permissions'	)	$return = ' AND    Permissions.user_resource = "' . $select . '"';
	if ($table == 'Services'	)	$return = ' AND         Groups.id            = "' . $select . '"';
	if ($table == 'Settings'	)	$return = ' AND       Settings.setting_set   = "' . $select . '"';
	if ($table == 'Summary'		)	$return = ' AND        Summary.group_by      = "' . $select . '"';
	if ($table == 'Templates'	)	$return = ' AND      Templates.template_type = "' . $select . '"';
	if ($table == 'Tickets'		)	$return = ' AND        Tickets.status        = "' . $select . '"';
	if ($table == 'Translations')	$return = ' AND   Translations.status        = "' . $select . '"';

//	if ($table == 'Contacts'	)	$return = ' AND       Contacts.user_role		= "' . $select . '"';
	if ($table == 'Cylinders'	)	$return = ' AND      Cylinders.machine_id		=  ' . $select;
	if ($table == 'FTP_Loads'	)	$return = ' AND      FTP_Loads.ftp_id			=  ' . $select;
	if ($table == 'FTP_Threads'	)	$return = ' AND    FTP_Threads.ftp_id			=  ' . $select;
	if ($table == 'FTP_Sets'	)	$return = ' AND       FTP_Sets.ftp_id			=  ' . $select;

	return $return;
}

private function set_new_fields($table) {
	$return = '';
	if ($table == 'Categories'	)	$return = ',    Parent.category		AS   parent_name';
	if ($table == 'Companies'	)	$return = ',   Contact.full_name	AS  contact_name';
	if ($table == 'Templates'	)	$return = ',   Created.full_name	AS  created_name';
	if ($table == 'Tickets'		)	$return = ',    Opened.full_name	AS   opened_name'
											. ',    Closed.full_name	AS   closed_name'
											. ',  Assigned.full_name	AS assigned_name';

	if ($table == 'Contacts'	)	$return = ', JKY_Users.id			AS     user_id'
											. ', JKY_Users.user_name	AS     user_name'
											. ', JKY_Users.user_role	AS     user_role'
											. ', Companies.full_name	AS  company_name';
	if ($table == 'FTPs'		)	$return = ',  Products.name			AS			product'
											. ',  Machines.name			AS			machine';
	if ($table == 'FTP_Loads'	)	$return = ',   Thread1.name			AS    first_name'
											. ',   Thread2.name			AS   second_name';
	if ($table == 'FTP_Threads'	)	$return = ',   Threads.name			AS			name';
	if ($table == 'FTP_Sets'	)	$return = ',   Configs.sequence		AS			sequence'
											. ',   Configs.name			AS			name';

//	special code to append fields from Contacts to Services table
	if (get_request('method') == 'export') {
		if ($table   == 'Services') {
			$sql  = 'SHOW COLUMNS FROM Contacts WHERE Field != "id" AND Field != "created_by" AND Field != "created_at" AND Field != "updated_by" AND Field != "updated_at" AND Field != "status" AND Field != "completed"';
			$db   = Zend_Registry::get( 'db' );
			$cols = $db->fetchAll( $sql );
			foreach($cols as $col) {
				$return .= ', Contacts.' . $col['Field'] . ' AS ' . $col['Field'];
			}
		}
	}

	return $return;
}

private function set_left_joins($table) {
	$return = '';
	if ($table == 'Categories'	)	$return = '  LEFT JOIN  Categories AS Parent	ON    Parent.id = Categories.parent_id';
	if ($table == 'Companies'	)	$return = '  LEFT JOIN     Contacts AS Contact	ON   Contact.id =  Companies.contact_id';
	if ($table == 'Templates'	)	$return = '  LEFT JOIN     Contacts AS Created	ON   Created.id =  Templates.created_by';
	if ($table == 'Tickets'		)	$return = '  LEFT JOIN     Contacts AS Opened	ON    Opened.id =    Tickets.opened_by'
											. '  LEFT JOIN     Contacts AS Closed	ON    Closed.id =    Tickets.closed_by'
											. '  LEFT JOIN     Contacts AS Assigned	ON  Assigned.id =    Tickets.assigned_to';

	if ($table == 'Contacts'	)	$return = '  LEFT JOIN   JKY_Users AS JKY_Users	ON  Contacts.id =  JKY_Users.contact_id'
//											. '  LEFT JOIN    Contacts AS Companies	ON Companies.id =   Contacts.company_id AND Companies.is_company = "Yes"';
											. '  LEFT JOIN    Contacts AS Companies	ON Companies.id =   Contacts.company_id';
	if ($table == 'FTPs'		)	$return = '  LEFT JOIN    Products				ON  Products.id =		FTPS.product_id'
											. '  LEFT JOIN    Machines				ON  Machines.id =		FTPS.machine_id';
	if ($table == 'FTP_Loads'	)	$return = '  LEFT JOIN     Threads AS Thread1	ON   Thread1.id =  FTP_Loads.first_thread_id'
											. '  LEFT JOIN     Threads AS Thread2	ON   Thread2.id =  FTP_Loads.second_thread_id';
	if ($table == 'FTP_Threads'	)	$return = '  LEFT JOIN     Threads  			ON   Threads.id =FTP_Threads.thread_id';
	if ($table == 'FTP_Sets'	)	$return = '  LEFT JOIN     Configs  			ON   Configs.id =	FTP_Sets.setting_id';
	return $return;
}

private function set_where($table, $filter) {
	$filter = strtolower($filter);
	$filter = trim($filter);
	if ($filter == '') {
		return '';
	}

	$names = explode('=', $filter, 2);
	if (count($names) == 2) {
		$name  =        trim( $names[ 0 ]);
		$value = '"%' . trim( $names[ 1 ]) . '%"';

		if ($table == 'Categories') {
			if ($name == 'sequence'
			or	$name == 'category') {
				if ($value == '"%null%"') {
					return ' AND Categories.' . $name . ' IS NULL ';
				}else{
					return ' AND Categories.' . $name . ' LIKE ' . $value;
				}
			}else{
				if ($name == 'parent_name') {
					if ($value == '"%null%"') {
						return ' AND Categories.parent_id  IS NULL';
					}else{
						return ' AND     Parent.category   LIKE ' . $value;
					}
				}
			}
		}

		if ($table == 'Companies') {
			if ($name == 'company_name'
			or	$name == 'company_number'
			or	$name == 'phone'
			or	$name == 'fax'
			or	$name == 'street'
			or	$name == 'city'
			or	$name == 'state'
			or	$name == 'zip'
			or	$name == 'country') {
				if ($value == '"%null%"') {
					return ' AND Companies.' . $name . ' IS NULL ';
				}else{
					return ' AND Companies.' . $name . ' LIKE ' . $value;
				}
			}else{
				if ($name == 'contact_name') {
					if ($value == '"%null%"') {
						return ' AND Companies.contact_id  IS NULL';
					}else{
						return ' AND   Contact.full_name   LIKE ' . $value;
					}
				}
			}
		}

		if ($table == 'Controls') {
			if ($name == 'group_set'
			or	$name == 'sequence'
			or	$name == 'name'
			or	$name == 'value') {
				if ($value == '"%null%"') {
					return ' AND Controls.' . $name . ' IS NULL ';
				}else{
					return ' AND Controls.' . $name . ' LIKE ' . $value;
				}
			}
		}

		if ($table == 'Configs') {
			if ($name == 'group_set'
			or	$name == 'sequence'
			or	$name == 'name'
			or	$name == 'value') {
				if ($value == '"%null%"') {
					return ' AND Configs.' . $name . ' IS NULL ';
				}else{
					return ' AND Configs.' . $name . ' LIKE ' . $value;
				}
			}
		}

		if ($table == 'Permissions') {
			if ($name == 'user_role'
			or	$name == 'user_resource'
			or	$name == 'user_action'
			or	$name == 'status') {
				if ($value == '"%null%"') {
					return ' AND Permissions.' . $name . ' IS NULL ';
				}else{
					return ' AND Permissions.' . $name . ' LIKE ' . $value;
				}
			}
		}

		if ($table == 'Products') {
			if ($name == 'code'
			or	$name == 'name'
			or	$name == 'product_type'
			or	$name == 'start_date') {
				if ($value == '"%null%"') {
					return ' AND Products.' . $name . ' IS NULL ';
				}else{
					return ' AND Products.' . $name . ' LIKE ' . $value;
				}
			}
		}

		if ($table == 'Receives') {
			if ($name == 'receive_on'
			or	$name == 'receive_amount'
			or	$name == 'set_amount'
			or	$name == 'document'
			or	$name == 'full_name'
			or	$name == 'email'
			or	$name == 'street'
			or	$name == 'zip'
			or	$name == 'city'
			or	$name == 'state'
			or	$name == 'country') {
				if ($value == '"%null%"') {
					return ' AND Receives.' . $name . ' IS NULL ';
				}else{
					return ' AND Receives.' . $name . ' LIKE ' . $value;
				}
			}
		}

		if ($table == 'Templates') {
			if ($name == 'created_at'
			or	$name == 'template_name'
			or	$name == 'template_type'
			or	$name == 'template_subject'
			or	$name == 'template_body'
			or	$name == 'template_sql'
			or	$name == 'description'
			or	$name == 'status') {
				if ($value == '"%null%"') {
					return ' AND Templates.' . $name . ' IS NULL ';
				}else{
					return ' AND Templates.' . $name . ' LIKE ' . $value;
				}
			}else{
				if ($name == 'created_by') {
					if ($value == '"%null%"') {
						return ' AND Templates.created_by  IS NULL';
					}else{
						return ' AND   Created.full_name   LIKE ' . $value;
					}
				}
			}
		}

		if ($table == 'Tickets') {
			if ($name == 'opened_at'
			or	$name == 'priority'
			or	$name == 'category'
			or	$name == 'description'
			or	$name == 'resolution'
			or	$name == 'status') {
				if ($value == '"%null%"') {
					return ' AND Tickets.' . $name . ' IS NULL ';
				}else{
					return ' AND Tickets.' . $name . ' LIKE ' . $value;
				}
			}else{
				if ($name == 'opened_by') {
					if ($value == '"%null%"') {
						return ' AND  Tickets.opened_by    IS NULL';
					}else{
						return ' AND   Opened.full_name    LIKE ' . $value;
					}
				}
			}
		}

		if ($table == 'Translations') {
			if( $name == 'sentence'
			or	$name == 'status') {
				if ($value == '"%null%"') {
					return ' AND Translations.' . $name . ' IS NULL ';
				}else{
					return ' AND Translations.' . $name . ' LIKE ' . $value;
				}
			}
		}

		if ($table == 'Contacts') {
			if ($name == 'first_name'
			or	$name == 'last_name'
			or	$name == 'full_name'
			or	$name == 'email'
			or	$name == 'mobile'
			or	$name == 'phone'
			or	$name == 'street'
			or	$name == 'city'
			or	$name == 'state'
			or	$name == 'zip'
			or	$name == 'country') {
				if ($value == '"%null%"') {
					return ' AND Contacts.' . $name . ' IS NULL ';
				}else{
					return ' AND Contacts.' . $name . ' LIKE ' . $value;
				}
			}else{
				if ($name == 'company_name') {
					if ($value == '"%null%"') {
						return ' AND Contacts.company_id IS NULL';
					}else{
						return ' AND Companies.full_name LIKE ' . $value;
					}
				}
			}
		}

		if ($table == 'FTPs') {
			if ($name == 'code'
			or	$name == 'diameter'
			or	$name == 'density'
			or	$name == 'inputs'
			or	$name == 'speed'
			or	$name == 'turns'
			or	$name == 'weight'
			or	$name == 'width'
			or	$name == 'lanes'
			or	$name == 'yield'
			or	$name == 'needling'
			or	$name == 'peso'
			or	$name == 'composition') {
				if ($value == '"%null%"') {
					return ' AND FTPs.' . $name . ' IS NULL ';
				}else{
					return ' AND FTPs.' . $name . ' LIKE ' . $value;
				}
			}else{
				if ($name == 'product_name') {
					if ($value == '"%null%"') {
						return ' AND Contacts.product_id IS NULL';
					}else{
						return ' AND Products.name LIKE ' . $value;
					}
			}else{
				if ($name == 'machine_name') {
					if ($value == '"%null%"') {
						return ' AND Contacts.machine_id IS NULL';
					}else{
						return ' AND Machines.name LIKE ' . $value;
					}
				}
			}}
		}

		if ($table == 'Threads') {
			if ($name == 'code'
			or	$name == 'name'
			or	$name == 'thread_group'
			or	$name == 'thread_color'
			or	$name == 'composition') {
				if ($value == '"%null%"') {
					return ' AND Threads.' . $name . ' IS NULL ';
				}else{
					return ' AND Threads.' . $name . ' LIKE ' . $value;
				}
			}
		}

	}

	$filter = '"%' . $filter . '%"';

	if ($table == 'Categories') {
		$return = '       Categories.sequence			LIKE ' . $filter
				. ' OR    Categories.category			LIKE ' . $filter
				. ' OR        Parent.category			LIKE ' . $filter
				;
	}

	if ($table == 'Controls') {
		$return = '         Controls.sequence			LIKE ' . $filter
				. ' OR      Controls.name				LIKE ' . $filter
				. ' OR      Controls.value				LIKE ' . $filter
				;
	}

	if ($table == 'Configs') {
		$return = '          Configs.sequence			LIKE ' . $filter
				. ' OR       Configs.name				LIKE ' . $filter
				. ' OR       Configs.value				LIKE ' . $filter
				;
	}

	if ($table == 'Permissions') {
		$return = '      Permissions.user_role			LIKE ' . $filter
				. ' OR   Permissions.user_resource		LIKE ' . $filter
				. ' OR   Permissions.user_action		LIKE ' . $filter
				;
	}

	if ($table == 'Products') {
		$return = '    Products.code			LIKE ' . $filter
				. ' OR Products.name			LIKE ' . $filter
				. ' OR Products.product_type	LIKE ' . $filter
				. ' OR Products.start_date		LIKE ' . $filter
				;
	}

	if ($table == 'Receives') {
		$return = '         Receives.receive_on			LIKE ' . $filter
				. ' OR      Receives.receive_amount		LIKE ' . $filter
				. ' OR      Receives.full_name			LIKE ' . $filter
				;
	}

	if ($table == 'Templates') {
		$return = '        Templates.created_at			LIKE ' . $filter
				. ' or     Templates.template_name		LIKE ' . $filter
				. ' or     Templates.template_type		LIKE ' . $filter
				. ' or     Templates.template_subject	LIKE ' . $filter
				. ' or     Templates.template_body		LIKE ' . $filter
				. ' or     Templates.template_sql		LIKE ' . $filter
				. ' or     Templates.description		LIKE ' . $filter
				;
	}

	if ($table == 'Tickets') {
		$return = '           Tickets.opened_at			LIKE ' . $filter
				. ' OR        Tickets.priority			LIKE ' . $filter
				. ' OR        Tickets.category			LIKE ' . $filter
				. ' OR        Tickets.description		LIKE ' . $filter
				. ' OR        Tickets.resolution		LIKE ' . $filter
				. ' OR         Opened.full_name			LIKE ' . $filter
				;
	}

	if ($table == 'Translations') {
		$return = '     Translations.created_at			LIKE ' . $filter
				. ' OR  Translations.updated_at			LIKE ' . $filter
				. ' OR  Translations.sentence			LIKE ' . $filter
				;
}

	if ($table == 'Contacts') {
		$return = ' Contacts.first_name				LIKE ' . $filter
			. ' OR	Contacts.last_name				LIKE ' . $filter
			. ' OR	Contacts.full_name				LIKE ' . $filter
			. ' OR	Contacts.mobile					LIKE ' . $filter
			. ' OR	Contacts.email					LIKE ' . $filter
			. ' OR	Contacts.phone					LIKE ' . $filter
			. ' OR	Contacts.street1				LIKE ' . $filter
			. ' OR	Contacts.street2				LIKE ' . $filter
			. ' OR	Contacts.city					LIKE ' . $filter
			. ' OR	Contacts.state					LIKE ' . $filter
			. ' OR	Contacts.zip					LIKE ' . $filter
			. ' OR	Contacts.country				LIKE ' . $filter
			. ' OR	Companies.full_name				LIKE ' . $filter
			;
		}

	if ($table == 'FTPs') {
		$return = ' FTPS.code				LIKE ' . $filter
			. ' OR  FTPS.diameter			LIKE ' . $filter
			. ' OR  FTPS.density			LIKE ' . $filter
			. ' OR  FTPS.inputs				LIKE ' . $filter
			. ' OR  FTPS.speed				LIKE ' . $filter
			. ' OR  FTPS.turns				LIKE ' . $filter
			. ' OR  FTPS.weight				LIKE ' . $filter
			. ' OR  FTPS.width				LIKE ' . $filter
			. ' OR  FTPS.lanes				LIKE ' . $filter
			. ' OR  FTPS.yield				LIKE ' . $filter
			. ' OR  FTPS.needling			LIKE ' . $filter
			. ' OR  FTPS.peso				LIKE ' . $filter
			. ' OR  FTPS.composition		LIKE ' . $filter
			. ' OR  Products.name			LIKE ' . $filter
			. ' OR  Machines.name			LIKE ' . $filter
			;
		}

	if ($table == 'Threads') {
		$return = ' Threads.code					LIKE ' . $filter
			. ' OR	Threads.name					LIKE ' . $filter
			. ' OR	Threads.thread_group			LIKE ' . $filter
			. ' OR	Threads.thread_color			LIKE ' . $filter
			. ' OR	Threads.composition				LIKE ' . $filter
			;
		}

	return ' AND (' . $return . ')';
}

/**
 *	$.ajax({ method: get_comments, table: x...x, id: 9...9 });
 *
 *	status: ok
 *	  rows: [{ x...x: y...y, ... } (false)
 *			,{ x...x: y...y, ... }
 *			,{ x...x: y...y, ... }
 *			]
 */
private function get_comments() {
	$table	= get_request('table'	);
	$id		= get_request('id'		);

	$user_id	= get_session('user_id'  );
	$user_role	= get_session('user_role');
	if (strpos($user_role, 'staff'	)
	or	strpos($user_role, 'admin'	)
	or	strpos($user_role, 'support')) {
		$staff = 'true' ;
	}else{
		$staff = 'false';
	}

	$sql= 'SELECT *'
		. '  FROM Comments'
		. ' WHERE parent_name = "' . $table . '"'
		. '   AND parent_id   =  ' . $id
		. '   AND ( status IS NULL'
		. '    OR ( status = "private" AND created_by = ' . $user_id . ' )'
		. '    OR ( status = "staff"   AND ' . $staff . ' ) )'
		. ' ORDER BY created_at'
		;
//$this->log_sql($table, 'get_comments', $sql);
	$db = Zend_Registry::get('db');
	$return = array();
	$return['status'] = 'ok';
	$return['rows'	] = $db->fetchAll($sql);
	echo json_encode($return);
}

/**
 *	$.ajax({ method: add_comment, table: x...x, id: 9...9, comment: x...x });
 *
 *	status: ok
 *	  rows: [{ x...x: y...y, ... } (false)
 *			,{ x...x: y...y, ... }
 *			,{ x...x: y...y, ... }
 *			]
 */
private function add_comment() {
	$table	= get_request('table'	);
	$id		= get_request('id'		);
	$comment= get_request('comment'	);

	$sql = 'INSERT INTO Comments'
		. '   SET created_by  =  ' . get_session('user_id')
		. '     , created_at  =  NOW()'
		. '     , created_name= "' . get_session('full_name') . '"'
		. '     , parent_name = "' . $table . '"'
		. '     , parent_id   =  ' . $id
		. '     , comment     = "' . $comment . '"'
		;
//$this->log_sql($table, 'add_comment', $sql);
	$db = Zend_Registry::get('db');
	$return = array();
	$return['status'] = 'ok';
	$return['id'	] = $db->query($sql);
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_columns, table: x...x });
 *
 */
private function get_columns($data) {
	if (get_session('user_action') != 'All') {
		return;
	}

	$table	= get_data($data, 'table');
	$extra	= array();
	$col	= array();

	if ($table == 'Categories'	)	{	$col['Field'] =   'parent_name' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col;
										$col['Field'] =      'children' ; $col['Type'] = 'int(11)'       ; $extra[] = $col; }
	if ($table == 'Companies'	)	{	$col['Field'] =  'contact_name' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col; }
	if ($table == 'Services'	)	{	$col['Field'] =     'full_name' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col;
										$col['Field'] =        'avatar' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col;
										$col['Field'] =    'group_name' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col; }
	if ($table == 'Templates'	)	{	$col['Field'] =  'created_name' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col; }
	if ($table == 'Tickets'		)	{	$col['Field'] =   'opened_name' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col;
										$col['Field'] =   'closed_name' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col;
										$col['Field'] = 'assigned_name' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col; }
	if ($table == 'Contacts'	)	{	$col['Field'] =  'support_name' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col;
										$col['Field'] =  'company_name' ; $col['Type'] = 'varchar(255)'  ; $extra[] = $col; }

	$sql = 'SHOW COLUMNS FROM ' . $table;
//$this->log_sql($table, 'get_columns', $sql);
	$db   = Zend_Registry::get('db');
	$cols = $db->fetchAll($sql);

	$return = array();
	$return['status'] = 'ok';

//	special code to append fields from Contacts to Services table
	if ($table == 'Services') {
		$sql  = 'SHOW COLUMNS FROM Contacts WHERE Field != "id" AND Field != "created_by" AND Field != "created_at" AND Field != "updated_by" AND Field != "updated_at" AND Field != "status" AND Field != "completed"';
		$db   = Zend_Registry::get('db');
		$users= $db->fetchAll($sql);
		$return['columns'] = array_merge($extra, $cols, $users);
	}else{
		$return['columns'] = array_merge($extra, $cols);
	}

	echo json_encode($return);
}

/**
 *	$.ajax({ method: insert, table: x...x, set: x...x });
 *
 *	  status: ok
 *	inserted: 9...9
 */
private function insert($data) {
	$table	= get_data($data, 'table');
	$set	= get_data($data, 'set'  );
	$db		= Zend_Registry::get('db');

	if ($set == '') {
		$this->echo_error('missing [set] statement');
		return;
	}

	$set .= ', created_by='  . get_session('user_id');
	$set .= ', created_at="' . get_time() . '"';

	if ($table == 'Categories') {
		$set .= ',     company_id= ' . get_session('company_id');
	}

	if ($table == 'Companies') {
		$set .= ',      parent_id= ' . get_session('control_company', COMPANY_ID);
		$set .= ', company_number= ' . $this->getUniqueNumber($table, 'company_number');
	}

	if ($table == 'Services') {
		$sets  = explode(',', $set);
		$names = explode('=', $sets[0]); $user_id  = $names[1];
		$names = explode('=', $sets[1]); $event_id = $names[1];

		$sql = 'SELECT next_number FROM Events WHERE id = ' . $event_id;
		$helper_number = $db->fetchOne($sql);
		$sql = 'UPDATE Events SET next_number = next_number + 1 WHERE id = ' . $event_id;
		$db->query($sql);
		$set .= ', helper_number= ' . $helper_number;

		$sql = 'SELECT birth_date FROM Contacts  WHERE id = ' .  $user_id;
		$birth_date = $db->fetchOne($sql);
		$sql = 'SELECT start_date FROM Events WHERE id = ' . $event_id;
		$start_date = $db->fetchOne($sql);
		if ($birth_date) {
			$diff = abs(strtotime($start_date) - strtotime($birth_date));
			$set .= ', helper_age= ' . floor($diff / (365.25*60*60*24));
		}
	}

//	if ($table == 'Templates') {
//		$set .= ',     company_id= ' . get_session('control_company', COMPANY_ID);
//	}

	if ($table == 'Tickets') {
		$set .= ',     company_id= ' . get_session('control_company', COMPANY_ID);
		$set .= ',      opened_by= ' . get_session('user_id');
		$set .= ',      opened_at="' . get_time() . '"';
	}

	if ($table == 'Contacts') {
		$set .= ',     company_id= ' . get_session('company_id', COMPANY_ID);
//		$set .= ',        user_id= ' . $this->insert_user_jky();
//		$set .= ',    user_number= ' . $this->getUniqueNumber($table, 'user_number');
	}

	if ($table == 'FTPs') {
		$my_number = $this->get_next_number('Controls', 'Next FTP Number');
		$set .= ',   id= ' . $my_number;
		$set .= ', code= ' . $my_number;
	}

	$sql= 'INSERT ' . $table
		. '   SET ' . str_replace("*#", "&", $set)
		;
	$this->log_sql($table, 'insert', $sql);
	$return = array();
	try {
		$db->query($sql);
		$id = $db->lastInsertId();
		$this->log_sql($table, $id, $sql);
		$new = db_get_row($table, 'id = ' . $id);
		$this->history_log('insert', $table, $id, $new, null);
		$return['status' ] = 'ok';
		$return['message'] = 'new record (' . $id . ') added';
		$return['id'     ] = $id;
	} catch(Exception $exp) {
		$this->log_sql($table, null, $exp->getMessage());
		$return['status' ] = 'error';
		$return['message'] = $exp->getMessage();
	}
	echo json_encode($return);
}

private function insert_user_jky() {
	$sql = 'INSERT JKY_Users'
		. '   SET password = "' . MD5(date('Y-m-d H:i:s')) . '"'
		. '     , user_key = "' . MD5(date('Y-m-d H:i:s')) . '"'
		;
	$db  = Zend_Registry::get('db');
	$db->query($sql);
	return $db->lastInsertId();
}

/**
 *	$.ajax({ method: update, table: x...x, set: x...x, where: x...x });
 *
 *	 status: ok
 *	updated: 9...9
 */
private function update($data) {
	$table	= get_data($data, 'table');
	$set	= get_data($data, 'set'  );
	$where	= $this->get_security($table, get_data($data, 'where'));

	if ($set == '') {
		$this->echo_error('missing [set] statement');
		return;
	}

	if ($where == '') {
		$this->echo_error('missing [where] statement');
		return;
	}

	$id = $this->get_only_id($table, $where);
	if (!$id) {
		$this->echo_error('record not found');
		return;
	}

	$old = db_get_row($table, 'id = ' . $id);

	$set .= ', updated_by='  . get_session('user_id');
	$set .= ', updated_at="' . get_time() . '"';
	$sql= 'UPDATE ' . $table
		. '   SET ' . str_replace("*#", "&", $set)
		. ' WHERE id = ' . $id
		;
	$this->log_sql($table, $id, $sql);
	$return = array();
	try {
		$db = Zend_Registry::get('db');
		$db->query($sql);
		$new = db_get_row($table, 'id = ' . $id);
		$this->history_log('update', $table, $id, $new, $old);
		$return['status' ] = 'ok';
		$return['message'] = 'record (' . $id . ') updated';
		$return['id'     ] = $id;
	} catch(Exception $exp) {
		$this->log_sql($table, null, $exp->getMessage());
		$return['status' ] = 'error';
		$return['message'] = $exp->getMessage();
	}
	echo json_encode($return);
}

private function update_user_jky($id, $set) {
	$sql = 'UPDATE JKY_Users'
		. '   SET ' . str_replace("*#", "&", $set)
		. ' WHERE id = ' . $id
		;
	$db = Zend_Registry::get('db');
	$db->query($sql);
}

/*
 *	$.ajax({ method: replace, table: x...x, set: x...x, where: x...x });
 *
 *	 status: ok
 *	updated: 9...9
 */
private function replace($data) {
	$table	= get_data($data, 'table');
	$set	= get_data($data, 'set'  );
	$where	= $this->get_security($table, get_data($data, 'where'));

	if ($set == '') {
		$this->echo_error('missing [set] statement');
		return;
	}

	if ($where == '') {
		$this->echo_error('missing [where] statement');
		return;
	}

	$id = $this->get_only_id($table, $where);

	if (!$id) {
		$old = null;
	}else{
		$old = db_get_row($table, 'id = ' . $id);
	}

	$set .= ', updated_by='  . get_session('user_id');
	$set .= ', updated_at="' . get_time() . '"';
	$sql= 'REPLACE ' . $table
		. '   SET ' . str_replace("*#", "&", $set)
		. ' WHERE ' . $where
		;
	$this->log_sql($table, $id, $sql);
	$return = array();
	try {
		$db = Zend_Registry::get('db');
		$db->query($sql);
		$new = db_get_row($table, 'id = ' . $id);
		$this->history_log('replace', $table, $id, $new, $old);
		$return['status' ] = 'ok';
		$return['message'] = 'record (' . $id . ') replaced';
		$return['id'     ] = $id;
	} catch(Exception $exp) {
		$this->log_sql($table, null, $exp->getMessage());
		$return['status' ] = 'error';
		$return['message'] = $exp->getMessage();
	}
	echo json_encode($return);
}

/*
 *	$.ajax({ method: delete, table: x...x, set: x...x });
 *
 *	 status: ok
 *	deleted: 9...9
 */
private function delete($data) {
	$table = get_data($data, 'table');
	$where = $this->get_security($table, get_data($data, 'where'));

	if ($where == '') {
		$this->echo_error('missing [where] statement');
		return;
	}

	$return = array();
	$return['status'] = 'ok';

	$id = $this->get_only_id($table, $where);
	if ($id) {
		if ($table == 'Contacts') {
			$this->delete_jky_user($id);
		}

		$new = db_get_row($table, 'id = ' . $id);
		$this->history_log('delete', $table, $id, $new, null);

		$sql= 'DELETE'
			. '  FROM ' . $table
			. ' WHERE id = ' . $id
			;
		$this->log_sql($table, $id, $sql);
		$db = Zend_Registry::get('db');
		$db->query($sql);
		$return['message'] = 'record (' . $id . ') deleted';
	}else{
		$return['message'] = 'record already deleted';
	}
	echo json_encode($return);
}

private function delete_jky_user($id) {
	$sql= 'DELETE'
		. '  FROM JKY_Users'
		. ' WHERE id = ' . $id
		;
	$db = Zend_Registry::get('db');
	$db->query($sql);
}

/*
 *	$.ajax({ method: delete_many, table: x...x, set: x...x });
 *
 *	 status: ok
 *	deleted: 9...9
 */
private function delete_many($data) {
	$table = get_data($data, 'table');
	$where = $this->get_security($table, get_data($data, 'where'));
$this->log_sql($table, 'delete_many', $where);

	if ($where == '') {
		$this->echo_error('missing [where] statement');
		return;
	}

	$db = Zend_Registry::get('db');

	$sql= 'SELECT ' . $table . '.*'
		. '  FROM ' . $table
		. ' WHERE ' . $where
		;
$this->log_sql($table, 'delete_many', $sql);
	$rows = $db->fetchAll($sql);
	foreach($rows as $row) {
		$this->history_log('delete', $table, $row['id'], $row, null);
	}

	$return = array();
	$return['status'] = 'ok';

	$sql= 'DELETE'
		. '  FROM ' . $table
		. ' WHERE ' . $where
		;
	$this->log_sql($table, 'delete_many', $sql);
	$result = $db->query($sql);

	$return['message'] = 'record count (' . $result->rowCount() . ') deleted';
	echo json_encode($return);
}

/*
 *	$.ajax({ method: combine, table: x...x , source: x...x, target: x...x });
 *
 *	status: ok
 *	   row: { x...x: y...y, ... } (false)
 */
private function combine() {
	function replace( $s, &$t, $name, $empty ) {
		if(( $t[ $name ] == null  or $t[ $name ] == $empty )
		and( $s[ $name ] != null and $s[ $name ] != $empty )) {
			return ', ' . $name . '="' . $s[ $name ] . '"';
		}else{
			return '';
		}
	}

	if (get_session('user_action') != 'All') {
		return;
	}

	$table    = get_request( 'table'  );
	$source   = get_request( 'source' );
	$target   = get_request( 'target' );

	$db = Zend_Registry::get( 'db' );
	$s = $db->fetchRow( 'SELECT * FROM Contacts WHERE id = ' . $source );
	$t = $db->fetchRow( 'SELECT * FROM Contacts WHERE id = ' . $target );

	$error = '';
	if( !$s )      { $error = '<br>source record ' . $source . ' not found'; }
	if( !$t )      { $error = '<br>target record ' . $target . ' not found'; }

	if(  $error != '' ) {
	       $this->echo_error( $error );
	       return;
	}

	$set  = '';
	$set .= replace( $s, $t, 'user_title'   , '' );
	$set .= replace( $s, $t, 'official_name', '' );
	$set .= replace( $s, $t, 'special_name' , '' );
	$set .= replace( $s, $t, 'user_email'   , '' );
	$set .= replace( $s, $t, 'gender'       , '' );
	$set .= replace( $s, $t, 'birth_date'   , '' );
	$set .= replace( $s, $t, 'user_tags'    , '' );
	$set .= replace( $s, $t, 'mobile'       , '' );
	$set .= replace( $s, $t, 'phone'        , '' );
	$set .= replace( $s, $t, 'street'       , '' );
	$set .= replace( $s, $t, 'zip'          , '' );
	$set .= replace( $s, $t, 'city'         , '' );
	$set .= replace( $s, $t, 'state'        , '' );
	$set .= replace( $s, $t, 'country'      , '' );
	$set .= replace( $s, $t, 'medications'  , '' );
	$set .= replace( $s, $t, 'all_gifts'    , '' );
	$set .= replace( $s, $t, 'other_gifts'  , '' );

	  if(  $set != '' ) {
	       $sql = 'UPDATE Contacts'
		    . '   SET ' . substr( $set, 2 )
		    . ' WHERE id = ' . $target
		    ;
	       $this->log_sql( $table, $target, $sql );
	       $db->query( $sql );
	  }

	  $db->query( 'UPDATE Categories     SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Categories     SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );

	  $db->query( 'UPDATE Comments       SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Comments       SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );
	  $db->query( 'UPDATE Comments       SET    parent_id = ' . $target . ' WHERE   parent_id = ' . $source . ' AND parent_name = "Contacts"' );

	  $db->query( 'UPDATE Companies      SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Companies      SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );
	  $db->query( 'UPDATE Companies      SET    member_id = ' . $target . ' WHERE   member_id = ' . $source );
	  $db->query( 'UPDATE Companies      SET     owner_id = ' . $target . ' WHERE    owner_id = ' . $source );
	  $db->query( 'UPDATE Companies      SET   contact_id = ' . $target . ' WHERE  contact_id = ' . $source );
	  $db->query( 'UPDATE Companies      SET   support_id = ' . $target . ' WHERE  support_id = ' . $source );

	  $db->query( 'UPDATE Controls       SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Controls       SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );

	  $db->query( 'UPDATE Configs        SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Configs        SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );

	  $db->query( 'UPDATE Events         SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Events         SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );

	  $db->query( 'UPDATE Groups         SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Groups         SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );
	  $db->query( 'UPDATE Groups         SET    leader_id = ' . $target . ' WHERE   leader_id = ' . $source );

	  $db->query( 'UPDATE Permissions    SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Permissions    SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );

	  $db->query( 'UPDATE Services       SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Services       SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );
	  $db->query( 'UPDATE Services       SET      user_id = ' . $target . ' WHERE     user_id = ' . $source );      //   duplicates same event_id
	  $db->query( 'UPDATE Services       SET  assigned_by = ' . $target . ' WHERE assigned_by = ' . $source );

	  $db->query( 'UPDATE Settings       SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Settings       SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );

	  $db->query( 'UPDATE Templates      SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Templates      SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );

	  $db->query( 'UPDATE Tickets        SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Tickets        SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );
	  $db->query( 'UPDATE Tickets        SET    opened_by = ' . $target . ' WHERE   opened_by = ' . $source );
	  $db->query( 'UPDATE Tickets        SET  assigned_to = ' . $target . ' WHERE assigned_to = ' . $source );
	  $db->query( 'UPDATE Tickets        SET    closed_by = ' . $target . ' WHERE   closed_by = ' . $source );

	  $db->query( 'UPDATE Contacts          SET   created_by = ' . $target . ' WHERE  created_by = ' . $source );
	  $db->query( 'UPDATE Contacts          SET   updated_by = ' . $target . ' WHERE  updated_by = ' . $source );
	  $db->query( 'UPDATE Contacts          SET   support_id = ' . $target . ' WHERE  support_id = ' . $source );

	  $db->query( 'UPDATE User_metas     SET    parent_id = ' . $target . ' WHERE   parent_id = ' . $source );

	  $db->query( 'DELETE FROM Contacts                                        WHERE          id = ' . $source );
	  $db->query( 'DELETE FROM JKY_Users                                    WHERE          id = ' . $source );

	  $return = array();
	  $return[ 'status'   ] = 'ok';
	  $return[ 'message'  ] = 'record combined';
	  $return[ 'source'   ] = $source;
	  $return[ 'target'   ] = $target;
	  echo json_encode( $return );
     }

/*
 *	$.ajax({ method: publish, table: x...x [, group_set: x...x] });
 *
 *	status: ok
 *	  rows: [{ x...x: y...y, ... } (false)
 *			,{ x...x: y...y, ... }
 *			,{ x...x: y...y, ... }
 *			]
 */
private function publish($data) {
	function write_categories($db, $out_file, $level, $parent_id) {
		$newline = NL;
		for($i=0; $i<$level; $i++)
			$newline .= TAB;

			$sql = 'SELECT *'
		    . '  FROM Categories'
		    . ' WHERE status = "Active"'
		    . '   AND parent_id = ' . $parent_id
		    . ' ORDER BY sequence'
	       ;
	       $rows     = $db->fetchAll( $sql );
	       $counter  = count( $rows );

	       if(  $counter > 0 ) {
		    fwrite( $out_file, $newline . '<ul>' );
		    foreach( $rows as $row ) {
			 $url = 'category.php?id=';
			 fwrite( $out_file, $newline . '<li><a href="' . $url . $row[ 'id' ] . '">' . $row[ 'category' ] . '</a>' );
			 $level++;
			 $counter += write_categories( $db, $out_file, $level, $row[ 'id' ]);
			 $level--;
			 fwrite( $out_file, '</li>' );
		    }
		    fwrite( $out_file, $newline . '</ul>' );
	       }
	       fwrite( $out_file, NL );
	       return $counter;
	  }

	  function write_currencies( $db, $out_file, $default ) {
	       $sql = 'SELECT *'
		    . '  FROM Controls'
		    . ' WHERE status = "Active"'
		    . '   AND group_set = "Currencies"'
		    . '   AND name != "' .  $default . '"'
		    . ' ORDER BY sequence'
	       ;
	       $rows     = $db->fetchAll( $sql );
	       $counter  = count( $rows );

	       fwrite( $out_file, "<a href='/#nogo' class='three outer' rel='nofollow' title='Currencies'><font style='font-weight:bold; font-size:12px; color:#000'>Currencies: " . $default . "</font></a>" );
	       fwrite( $out_file, NL . "<div class='tab_right'>" );
	       foreach( $rows as $row ) {
		    $control_name  = $row[ 'control_name'  ];
		    $control_value = $row[ 'control_value' ];
		    fwrite( $out_file, NL . TAB . "<p><a class='tab_" . $control_name . "' href='/?currency=" . $control_name . "' rel='nofollow'>" . $control_value . "</a></p>" );
	       }
	       fwrite( $out_file, NL . "</div>" );
	       fwrite( $out_file, NL );
	       return $counter;
	  }

	function write_translations_js($db, $out_file, $locale) {
		$sql= 'SELECT Translations.sentence AS source'
			. '     ,      Targets.sentence AS target'
			. '  FROM Translations'
			. '  LEFT JOIN Translations AS Targets'
			. '    ON Targets.parent_id = Translations.id'
			. '   AND Targets.locale = "' . $locale . '"'
			. ' WHERE Translations.status = "Active"'
			. '   AND Translations.locale = "en_us"'
			. ' ORDER BY source'
			;
		$rows = $db->fetchAll($sql);
		$counter = count($rows);

		if ($counter > 0) {
			fwrite($out_file, NL . 'var JKY = JKY || {};');
			fwrite($out_file, NL . 'JKY.translations = ');
			$first = '{';
			foreach ($rows as $row) {
				fwrite($out_file, NL . $first . ' "' . $row['source'] . '":"' . $row['target'] . '"');
				$first = ',';
			}
			fwrite($out_file, NL . '};');
		}
		return $counter;
	}
/*
	  function write_translations_csv($db, $out_file, $locale) {
	       $sql = 'SELECT Translations.sentence AS source'
		    . '     ,      Targets.sentence AS target'
		    . '  FROM Translations'
		    . '  LEFT JOIN Translations AS Targets'
		    . '    ON Targets.parent_id = Translations.id'
		    . '   AND Targets.locale = "' . $locale . '"'
		    . ' WHERE Translations.status = "Active"'
		    . '   AND Translations.locale = "en_us"'
		    . ' ORDER BY source'
	       ;
	       $rows    = $db->fetchAll($sql);
	       $counter = count($rows);

	       if( $counter > 0 ) {
		    fwrite( $out_file, '# csv ' . $locale );
		    foreach( $rows as $row ) {
			 fwrite($out_file, NL . $row['source'] . ';' . $row['target']);
		    }
	       }
	       return $counter;
	  }
*/
	function write_translations_php($db, $out_file, $locale) {
		$sql= 'SELECT Translations.sentence AS source'
			. '     ,      Targets.sentence AS target'
			. '  FROM Translations'
			. '  LEFT JOIN Translations AS Targets'
			. '    ON Targets.parent_id = Translations.id'
			. '   AND Targets.locale = "' . $locale . '"'
			. ' WHERE Translations.status = "Active"'
			. '   AND Translations.locale = "en_us"'
			. ' ORDER BY source'
			;
		$rows = $db->fetchAll($sql);
		$counter = count($rows);

		if ($counter > 0) {
			fwrite($out_file, '<?');
			fwrite($out_file, NL . '//   language ' . $locale);
			fwrite($out_file, NL . '$translations = array');
			$first = '(';
			foreach ($rows as $row) {
				fwrite($out_file, NL . $first . ' "' . $row['source'] . '"=>"' . $row['target'] . '"');
				$first = ',';
			}
			fwrite($out_file, NL . ');');
			fwrite($out_file, NL . '?>');
		}
		return $counter;
	}

	if (get_session('user_action') != 'All') {
		return;
	}

	$table		= get_data($data, 'table');
	$group_set	= get_data($data, 'group_set');
	$db			= Zend_Registry::get('db');
	$counter	= 0;

	  if(  $table == 'Categories' ) {
	       $out_name = 'jky_all_categories.html';
	       $out_file = fopen( $out_name, 'w' ) or die( 'cannot open ' . $out_name );
	       $counter  = write_categories( $db, $out_file, 0, 1000000000 );
	       fclose( $out_file );
	  }

	  if(  $table == 'Controls' ) {
	       if(  $group_set = 'Currencies' ) {
		    $out_name = 'jky_currencies.html';
		    $out_file = fopen( $out_name, 'w' ) or die( 'cannot open ' . $out_name );
		    $counter  = write_currencies( $db, $out_file, 'USD' );
		    fclose( $out_file );
	       }
	  }

	if ($table == 'Translations') {
		$sql= 'SELECT name'
			. '  FROM Controls'
			. ' WHERE status = "Active"'
			. '   AND group_set = "Languages"'
			. ' ORDER BY sequence'
			;
		$rows = $db->fetchAll($sql);

		foreach ($rows as $row) {
			$locale		= $row['name'];
			$out_name	= '../html/js/translations/' . $locale . '.js';
			$out_file	= fopen($out_name, 'w') or die('cannot open ' . $out_name);
			$counter	= write_translations_js($db, $out_file, $locale);
			fclose($out_file);
		}
/*
	      foreach( $rows as $row ) {
		   $locale = $row['setting_name'];
		   $out_name = '../languages/' . $locale . '.csv';
		   $out_file = fopen($out_name, 'w') or die('cannot open ' . $out_name);
		   $counter  = write_translations_csv($db, $out_file, $locale);
		   fclose($out_file);
	      }
*/
		foreach ($rows as $row) {
			$locale = $row['name'];
			$out_name = '../application/' . $locale . '.php';
			$out_file = fopen($out_name, 'w') or die('cannot open ' . $out_name);
			$counter  = write_translations_php($db, $out_file, $locale);
			fclose($out_file);
		}
	 }

//          system( '( php ' . APPLICATION . 'GenerateHtml.php & ) > /dev/null' );
//          exec( 'php ' . APPLICATION . 'GenerateHtml.php' );

	$return = array();
	$return['status' ] = 'ok';
	$return['message'] = $counter . ' records published';
	echo json_encode($return);
}

//   ---------------------------------------------------------------------------
private function echo_json($return) {
//	echo get_request('callback') . '( ' . json_encode($return) . ' );';
	echo json_encode($return);
}

/*
 *	$.ajax({method:set_language, language:language});
 *
 *	http://jky/jky_proxy.php?method=set_language&language=pt_br
 *
 *	status: ok
 */
private function set_language() {
    if ( is_request('language')) {
	set_session('language', get_request('language'));
    }

     $return = array();
     $return[ 'status'   ] = 'ok';
     $this->echo_json( $return );
}

/*
 *   $.ajax({ method: get_language });
 *
 *       status: ok
 *     language: xx_yy
 */
    private function get_language() {
	$return = array();
	$return[ 'status'        ] = 'ok';
	$return[ 'language'      ] = get_session('language');
	$this->echo_json( $return );
    }

/*
 *	$.ajax({ method: set_session });
 *
 *	http://jky/jky_proxy.php?method=set_session&action=confirm&user_key=6e5fa4d9c48ca921c0a2ce1e64c9ae6f
 *	http://jky/jky_proxy.php?method=set_session&action=reset&user_key=6e5fa4d9c48ca921c0a2ce1e64c9ae6f
 *
 *	status: ok
 */
private function set_session() {
	if (is_request( 'action'	))		set_session( 'action'	, get_request('action'	));
	if (is_request( 'user_key'	))		set_session( 'user_key'	, get_request('user_key'));

	$return = array();
	$return['status'] = 'ok';
	$this->echo_json( $return );
}

/*
 *	$.ajax({ method: get_session });
 *
 *	status: ok
 *	today_date: yyyy-mm-dd
 */
private function get_session() {
	$data = array();
	$data['today_date'] = date('Y-m-d');

	if (is_session('action'			))   $data['action'			] = fetch_session( 'action'		);
	if (is_session('user_key'		))   $data['user_key'		] = fetch_session( 'user_key'	);

	if (is_session('language'		))   $data['language'		] =   get_session('language'	);
	if (is_session('control_company'))   $data['control_company'] =   get_session('control_company', COMPANY_ID);
	if (is_session('company_name'	))   $data['company_name'	] =   get_session('company_name');
	if (is_session('company_logo'	))   $data['company_logo'	] =   get_session('company_logo');
	if (is_session('contact_id'		))   $data['contact_id'		] =   get_session('contact_id'	);
	if (is_session('full_name'		))   $data['full_name'		] =   get_session('full_name'	);
	if (is_session('user_name'		))   $data['user_name'		] =   get_session('user_name'	);
	if (is_session('user_time'		))   $data['user_time'		] =   get_session('user_time'	);
	if (is_session('user_id'		))   $data['user_id'		] =   get_session('user_id'		);
	if (is_session('full_name'		))   $data['full_name'		] =   get_session('full_name'	);
	if (is_session('permissions'	))   $data['permissions'	] =   get_session('permissions'	);
	if (is_session('start_page'		))   $data['start_page'		] =   get_session('start_page'	);

	$data['company_name'] = 'DL Malhas';
	$data['company_logo'] = 'dl-malhas.png';
//	$data['event_name'	] = 'Event 2013';
	$data['copyright'	] = '© 2013 JKY Software Corp';
	$data['contact_us'	] = 'Contact Us';
	$data['language'	] = 'Portugues';
	$data['languages'	] = array('English', 'Portugues', 'Chinese', 'Taiwanese');

	$obj = array();
	$obj['status'] = 'ok';
	$obj['data'  ] = $data;
	$this->echo_json($obj);
}

/**
 *	$.ajax({ method: get_profile );
 *
 *	status: ok
 *	   row: Contacts
 */
private function get_profile() {
	if (!is_session('user_id')) {
		$this->echo_error('user_id is undefined');
		return;
	}

	$sql= 'SELECT *'
		. '  FROM Contacts'
		. ' WHERE id = ' . get_session('user_id')
		;
	$db = Zend_Registry::get('db');
	$return = array();
	$return['status'] = 'ok';
	$return['row'	] = $db->fetchRow($sql);
	echo json_encode($return);
}

/**
 *   $.ajax({ method: get_contact );
 *
 *   status: ok
 *      row: Contacts
 */
private function get_contact() {
	if (!is_session('control_company')) {
		$this->echo_error('control_company is undefined');
		return;
	}

	$sql= 'SELECT Companies.*'
		. '     , Contact.user_email AS business_email'
		. '     , Support.user_email AS  support_email'
		. '  FROM Companies'
		. '  LEFT JOIN Contacts AS Contact On Contact.id = Companies.contact_id'
		. '  LEFT JOIN Contacts AS Support On Support.id = Companies.support_id'
		. ' WHERE Companies.id = ' . get_session( 'control_company', COMPANY_ID )
		;
	$db = Zend_Registry::get('db');
	$return = array();
	$return['status'] = 'ok';
	$return['row'	] = $db->fetchRow($sql);
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_contact_id, contact_name: x...x );
 *
 *	status: ok
 *		id: 9...9
 */
private function get_contact_id() {
	$contact_name = get_request('contact_name');

	$sql= 'SELECT id'
		. '  FROM Contacts'
		. ' WHERE full_name = "' . $contact_name . '"'
		;
	$db = Zend_Registry::get('db');
	$id = $db->fetchOne($sql);

	if (!$id) {
		$sql= 'INSERT INTO Contacts'
			. '   SET          id= ' . $this->insert_user_jky()
//			. '     , user_number= ' . $this->getUniqueNumber( 'Contacts', 'user_number' )
			. '     ,   full_name="' . $contact_name . '"'
			. '     ,   user_name="' . $contact_name . '"'
			;
		$db = Zend_Registry::get('db');
		$db->query($sql);
		$id = $db->lastInsertId();
	}

	$return = array();
	$return['status'] = 'ok';
	$return['id'	] = $id;
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_user_id, user_name: x...x );
 *
 *	status: ok     | error
 *		id: 9...9  | null
 */
private function get_user_id($data) {
	$sql= 'SELECT id'
		. '  FROM JKY_Users'
		. ' WHERE user_name = "' . $data['user_name'] . '"'
		;
	$return = array();
	$db = Zend_Registry::get('db');
	$return['status'] = 'ok';
	$return['id'	] = $db->fetchOne($sql);
	echo json_encode($return);
}

/**
 *	$.ajax({ method: set_user_id, user_key: x...x });
 *
 *	status: ok / error
 * message: x...x
 */

private function set_user_id() {
	$error = '';
	$user_id = db_get_id('JKY_Users', 'user_key = "' . get_request('user_key') . '"');

	if ($user_id) {
		$this->set_user_session($user_id);
	}else{
		$error .= BR . 'User Account already expired';
	}

	$return['status'	] = $error == '' ? 'ok' : 'error';
	$return['message'	] = $error;
	$this->echo_json($return);
}

/**
 *	$.ajax({ method: get_company_id, company_name: x...x );
 *
 *	status: ok
 *		id: 9...9
 */
private function get_company_id() {
	$sql= 'SELECT id'
		. '  FROM Companies'
		. ' WHERE company_name = "' . get_request('company_name') . '"'
		;
//$this->log_sql(null, 'get_company_id', $sql);
	$db = Zend_Registry::get('db');
	$return = array();
	$return['status'] = 'ok';
	$return['id'	] = $db->fetchOne($sql);
	echo json_encode($return);
}

/**
 *	$.ajax({ method: set_company_id, company_id: 9...9 );
 *
 *	status: ok
 *		id: 9...9
 */
private function set_company_id() {
	$company = db_get_row('Companies', 'id = ' . get_request('company_id'));
	set_session('company_id'     , $company['id'			]);
	set_session('company_name'   , $company['company_name'	]);
//	set_session('control_company', $company['parent_id'		]);
	$return = array();
	$return['status'] = 'ok';
	$return['name'	] = $company['company_name'];
	echo json_encode($return);
}

/**
 *	$.ajax({ method: set_group_id, group_id: 9...9 );
 *
 *	status: ok
 *		id: 9...9
 */
private function set_group_id() {
	$group = db_get_row('Groups', 'id = ' . get_request('group_id'));
	set_session('group_id'		, $group['id'			]);
	set_session('group_name'	, $group['group_name'	]);
//	set_session('event_id'		, $group['event_id'		]);
	$return = array();
	$return['status'] = 'ok';
	$return['name'	] = $group['group_name'];
	echo json_encode($return);
}

/**
 *	$.ajax({ method: get_options, table:x..x, field=x...x, selected: x...x, initial:x...x });
 *
 *	return: <options value="x...x" selected="selected">x...x</options>
 *			...
 */
private function get_options($data) {
	$table		= get_data($data, 'table'	);
	$field		= get_data($data, 'field'	);
	$selected	= get_data($data, 'selected');
	$initial	= get_data($data, 'initial'	);

	$sql= 'SELECT id, ' . $field
		. '  FROM ' . $table
		. ' WHERE status = "Active"'
		. ' ORDER BY ' . $field
		;
	$this->log_sql(null, 'get_options', $sql);
	$db = Zend_Registry::get('db');
	$rows = $db->fetchAll($sql);

	$return = array();
	$return['status'] = 'ok';
	$return['rows'	] = $rows;
	$this->echo_json($return);
}

/**
 *	$.ajax({ method: get_users, where:..x, select: x...x, initial: x...x });
 *
 *	return: <options value="x...x" selected="selected">x...x</options>
 *			...
 */
private function get_users() {
	$where		= get_request('where'	);
	$select		= get_request('select'	);
	$initial	= get_request('initial'	);

	$sql= 'SELECT Contacts.id, Contacts.full_name'
//		. '  FROM Contacts, Services, Groups'
//		. ' WHERE Contacts.id = Services.user_id'
//		. '   AND Services.group_id = Groups.id'
//		. '   AND ' . $where
		. '  FROM Contacts'
		. ' WHERE ' . $where
		. ' ORDER BY Contacts.full_name'
		;
	if ($initial == '') {
//		$return = '';
		$return = '<option value="">' . $initial . '</option>';
	}else{
//		else $return = '<option value="*">' . $initial . '</option>';
		$return = '<option value="All">' . $initial . '</option>';
	}

	if ($sql != '') {
$this->log_sql(null, 'get_users', $sql);
		$db = Zend_Registry::get('db');
		$rows = $db->fetchAll($sql);

		foreach($rows as $row) {
			$selected = $row['id'] == $select ? ' selected="selected"' : '';
			$return .= '<option value="' . $row['id'] . '"' . $selected . '>' . $row['full_name'] . '</options>';
		}
	}
	echo $return;
}

/**
 *	$.ajax({ method: get_controls, group_set: x...x);
 *
 *	return: <options value="x...x" selected="selected">x...x</options>
 *			...
 */
private function get_controls($data) {
	$group_set = get_data($data, 'group_set');

	$sql= 'SELECT * '
		. '  FROM Controls'
		. ' WHERE group_set = "' . $group_set . '"'
		. ' ORDER BY sequence, name'
		;
	$db = Zend_Registry::get('db');
	$rows = $db->fetchAll($sql);
	$return = array();
	$return['status'] = 'ok';
	$return['rows'	] = $rows;
	$this->echo_json($return);
}

/**
 *   $.ajax({ method: get_configs, group_set: x...x);
 *
 *	status: ok
 *	  rows: [{ x...x: y...y, ... } (false)
 *			,{ x...x: y...y, ... }
 *			,{ x...x: y...y, ... }
 *			]

 */
private function get_configs($data) {
	$group_set = get_data($data, 'group_set');

	$sql= 'SELECT * '
		. '  FROM Configs'
		. ' WHERE group_set = "' . $group_set . '"'
		. ' ORDER BY sequence, name'
		;
	$db = Zend_Registry::get('db');
	$rows = $db->fetchAll($sql);
	$return = array();
	$return['status'] = 'ok';
	$return['rows'	] = $rows;
	$this->echo_json($return);
}

/**
 *	$.ajax({ method: get_options, group_set: x...x, select: x...x, initial: x...x });
 *
 *	return: <options value="x...x" selected="selected">x...x</options>
 *			...
 */
private function get_optionss() {
	$group_set	= get_request('group_set'	);
	$selected	= get_request('selected'	);
	$initial	= get_request('initial'		);

	$sql= 'SELECT * '
		. '  FROM Configs'
		. ' WHERE group_set = "' . $group_set . '"'
		. ' ORDER BY sequence, name'
		;
	if ($initial == '') {
		$return = '';
	}else{
//		$return = '<option value="*">' . $initial . '</option>';
		$return = '<option value="All">' . $initial . '</option>';
	}

	if ($sql != '') {
		$db = Zend_Registry::get('db');
		$rows = $db->fetchAll($sql);

		foreach ($rows as $row) {
			if ($row['value'] == ''){
				$row['value'] = $row['name'];
			}
		$selected = $row['name'] == $select ? ' selected="selected"' : '';
		$return .= '<option value="' . $row['name'] . '"' . $selected . '>' . $row['value'] . '</options>';
		}
	}
	echo $return;
}

/**
 *   $.ajax({ method: get_categories, parent_id: 9...9, select: x...x, initial: x...x });
 *
 *   return: <options value="x...x" selected="selected">x...x</options>
 *           ...
 */
private function get_categories() {
	$parent_id	= get_request('parent_id'	);
	$select		= get_request('select'		);
	$initial	= get_request('initial'		);

	$sql= 'SELECT Categories.*'
		. '  FROM Categories'
		. '  LEFT JOIN Categories AS Parent ON Parent.id = Categories.parent_id'
		. ' WHERE Categories.parent_id = ' . $parent_id
		. ' ORDER BY sequence, category'
		;
//$this->log_sql(null, 'get_categories', $sql);
	if ($initial == '') {
		$return = '';
	}else{
		$return = '<option value="All">' . $initial . '</option>';
	}

	if ($sql != '') {
		$db = Zend_Registry::get('db');
		$rows = $db->fetchAll($sql);

		foreach($rows as $row) {
			$selected = $row['category'] == $select ? ' selected="selected"' : '';
			$return .= '<option value="' . $row['id'] . '"' . $selected . '>' . $row['category'] . '</options>';
		}
	}
	echo $return;
}

/**
 *	$.ajax({ method: get_header });
 *
 *	return: <options value="x...x" selected="selected">x...x</options>
 *			...
 */
private function get_header() {
	$full_name = get_session('full_name');
	if ($full_name == '') {
		$header_id = 'Welcome, please &nbsp;<a onclick="display_signup();">Sign Up</a>&nbsp; or &nbsp;<a onclick="display_login();">Log In</a>';
	}else{
		$header_id = 'Hello ' . $full_name . ', want to view &nbsp;<a onclick="display_profile();">Your Profile</a>&nbsp; or &nbsp;<a onclick="request_logout();">Log Out</a>';
	}

	$return = ''
			. '<div class="margin">'
			. '<span id="header_company">' . get_session('company_name') . '</span>'
			. '<span id="header_id">' . $header_id .'</span>'
			. '</div>'
			;
	echo $return;
}

/**
 *	$.ajax({ method: get_menus });
 *
 *	return: <options value="x...x" selected="selected">x...x</options>
 *			...
 */
private function get_menus() {
	$html = ''
	   . '   <div class="margin">'
	   . '       <a href="/bridge/return"><img id="header_logo" src="/images/logo.png" /></a>'
	   . '       <div class="clear"></div>'

	   . '       <div id="header_menu" class="tabs">'
	   . '            <ul>'
	   . '                 <li class="' . $this->get_tab_class( 'Home'       ) . '"><a href="/home"            ><span>Home         </span></a></li>'
	   . '                 <li class="' . $this->get_tab_class( 'Videos'     ) . '"><a href="/videos"          ><span>Videos       </span></a></li>'
	   . '                 <li class="' . $this->get_tab_class( 'Reports'    ) . '"><a href="/reports"         ><span>Reports      </span></a></li>'
	   . '                 <li class="' . $this->get_tab_class( 'Features'   ) . '"><a href="/features"        ><span>Features     </span></a></li>'
	   . '            </ul>'
	   . '       </div id="header_menu">'

	   . '       <div id="header_control" class="tabs">'
	   . '            <ul>'
	   . '                 <li class="' . $this->get_tab_class( 'MyAccount'  ) . '"><a href="/myaccount"       ><span>My Account   </span></a></li>'
	   . '                 <li class="' . $this->get_tab_class( 'Tickets'    ) . '"><a href="/Tickets.html"    ><span>Tickets      </span></a></li>'
	   . '                 <li class="' . $this->get_tab_class( 'Admin'      ) . '">'
	   . '                      <a href="#"    onmouseover="mopen(\'admin\')"   onmouseout="mclosetime()"><span>Admin</span></a>'
	   . '                      <ul id="admin" onmouseover="mcancelclosetime()" onmouseout="mclosetime()">'
	   . '                           <li><a href="/companies/settings"  ><span>Settings     </span></a></li>'
	   . '                           <li><a href="/companies.html"      ><span>Companies    </span></a></li>'
	   . '                           <li><a href="/invoices"            ><span>Invoices     </span></a></li>'
	   . '                           <li><a href="/production"          ><span>Production   </span></a></li>'
	   . '                           <li><a href="/repository"          ><span>Repository   </span></a></li>'
	   . '                           <li><a href="/Contacts.html"        ><span>Contacts        </span></a></li>'
	   . '                           <li><a href="/tcounters"           ><span>Talents      </span></a></li>'
	   . '                           <li><a href="/counters"            ><span>Summary      </span></a></li>'
	   . '                           <li><a href="/templates"           ><span>Templates    </span></a></li>'
	   . '                           <li><a href="/controls.html"       ><span>Controls     </span></a></li>'
	   . '                           <li><a href="/permissions.html"    ><span>Permissions  </span></a></li>'
	   . '                      </ul>'
	   . '                 </li>'
	   . '            </ul>'
	   . '       </div id="header_control">'

	   . '       <div class="clear"></div>'
	   . '  </div>'
	   ;
     echo $html;
}

private function get_tab_class($tab) {
	$user_action = get_user_action($tab);
	if ($user_action == '') {
		$user_action = get_user_action('All');
	}

//	for undefined resource or denied user_action
	if ($user_action == '' or $user_action == 'Denied') {
		return 'tab_denied'  ;
	}else{
		return 'tab_inactive';
	}
}

private function set_user_session($user_id) {
	$user = db_get_row('JKY_Users', 'id = ' . $user_id);
	set_session('user_id'		, $user['id'			]);
	set_session('user_name'		, $user['user_name'		]);
	set_session('user_type'		, $user['user_type'		]);
	set_session('user_role'		, $user['user_role'		]);

	$contact = db_get_row('Contacts', 'id = ' . $user['contact_id']);
	set_session('contact_id'	, $contact['id'			]);
	set_session('first_name'	, $contact['first_name'	]);
	set_session('last_name'		, $contact['last_name'	]);
	set_session('full_name'		, $contact['full_name'	]);

	set_permissions($user['user_role']);
}

private function get_user_data() {
	$control = db_get_row('Controls', 'status = "Active" AND group_set ="User Roles" AND name= "' . get_session('user_role') . '"') ;
	set_session('start_page', $control['value']);
	$data = array();
	$data['first_name'	] = get_session('first_name');
	$data['last_name'	] = get_session('last_name'	);
	$data['full_name'	] = get_session('full_name'	);
	$data['user_role'	] = get_session('user_role' );
	$data['start_page'	] = get_session('start_page');
	return $data;
}

//   ---------------------------------------------------------------------------

/**
 *	$.ajax({ method: check_session });
 *
 *	status: ok
 * message: x...x
 *	  data: x...x
 */
private function check_session($data) {
	$error = '';
	if (!is_session('user_id')) {
		$error = 'Session is gone';
	}

	$return = array();
	if (is_empty($error)) {
		$return['status' ] = 'ok';
		$return['data'   ] = $this->get_user_data();
	}else{
		$return['status' ] = 'error';
		$return['message'] = $error;
	}
	$this->echo_json($return);
}

/**
 *	$.ajax({ method: confirm, user_key: x...x });
 *
 *	status: ok / error
 * message: x...x
 */

private function confirm($data) {
	$error = '';
	$user_id = db_get_id('JKY_Users', 'user_key = "' . $data['user_key'] . '"');

	if (!$user_id) {
		$error .= BR . 'User Account already expired';
	}else{
		if (is_empty(meta_get_id('User', $user_id, 'unconfirmed_email'))) {
			$error .= BR . 'Email Address already confirmed';
		}
	}

	$return = array();
	if (is_empty($error)) {
		meta_delete('User', $user_id, 'unconfirmed_email');
		$this->set_user_session($user_id);
		$return['status' ] = 'ok';
		$return['message'] = 'Email Address confirmed';
	}else{
		$return['status' ] = 'error';
		$return['message'] = $error;
	}
	$this->echo_json($return);
}

/**
 *	$.ajax({ method: reset, encrypted: x...x });
 *
 *	status: ok
 * message: password reseted
 */
private function reset($data) {
	$user_id   = get_session('user_id');
	$encrypted = $data['encrypted'];

	if ($encrypted != '') {
		$sql= 'UPDATE JKY_Users'
			. '   SET password = "' . $encrypted . '"'
			. ' WHERE id = ' . $user_id
			;
		$db = Zend_Registry::get('db');
		$db->query($sql);
		$this->log_sql('reset', $user_id, $sql);
	}

	$return = array();
	$return['status' ] = 'ok';
	$return['message'] = 'New Password reseted';

	$control = db_get_row('Controls', 'status = "Active" AND group_set ="User Role" AND control_name= "' . get_session( 'user_role' ) . '"');
	$return['re_direct'] = $control['control_value'];
	$this->echo_json($return);
}

/**
 *	$.ajax({ method: log_in, user_name: x...x, encrypted: x...x, remember_me: Y/N });
 *
 *	status: ok
 * message: x...x
 *	  data: first_name	: x...x
 *			last_name	: x...x
 *			user_role	: x...x
 *			start_page	: x...x
 */
private function log_in($data) {
	$user_name	= $data['user_name'];
	$encrypted	= $data['encrypted'];

	$error = '';
	$user_id = db_get_id('JKY_Users', 'status = "Active" AND user_name = "' . $user_name . '"');
	if (!$user_id) {
		$error .= set_is_invalid('User Name');
	}

	if (is_empty($error)) {
		$password = $this->get_password($user_id);
		$password = MD5(get_session('user_time') . $password);
		if ($password !== $encrypted) {
			$error .= set_is_invalid('Password');
		}
	}

	$return = array();
	if (is_empty($error)) {
		$this->set_user_session($user_id);
		$return['status' ] = 'ok';
		$return['data'   ] = $this->get_user_data();
	}else{
		$return['status' ] = 'error';
		$return['message'] = $error;
	}
	$this->echo_json($return);
}

private function get_password($id) {
	$sql= 'SELECT password'
		. '  FROM JKY_Users'
		. ' WHERE id = ' . $id
		;
	$db = Zend_Registry::get('db');
//$this->log_sql(null, 'get_password', $sql);
	return $db->fetchOne($sql);
}

/**
 *	$.ajax({ method: log_out });
 *
 *	status: ok
 * message: x...x
 */
private function log_out() {
//	setcookie('remember_me'  , '', time() - 86400, '/');
//	setcookie('authorization', '', time() - 86400, '/');

	$error = '';
	$session = new Zend_Session_Namespace();
	foreach($session as $name => $value) {
//		if ($name != 'control_company') {
			unset_session($name);
//		}
	}
//	$this->_redirect( INDEX . 'index' );                   //   in linux, it generates = http://xxx/jky_index.php/jky_index.php/index
//	$this->_redirect( INDEX . 'jky_index.php/index' );

	$return = array();
	$return[ 'status' ] = $error == '' ? 'ok' : 'error';
	$return[ 'message'] = $error;
	echo json_encode($return);
}

/**
 *	$.ajax({ method: log_help, help_name: x...x });
 *
 *		status: ok
 *  user_email: x...x
 */
private function log_help() {
	$help_name  = get_request('help_name');

	$error = '';
	$users = db_get_rows('Contacts', 'status = "Active" AND( user_name = "' . $help_name . '" OR user_email = "' . $help_name . '" )');
	if (count($users) == 0) {
		$error .= set_not_found('User Name or Email Address');
	}

	$return = array();
	if (is_empty($error)) {
//		email for all users
		foreach($users as $user) {
			$return = email_by_event($user['id'], 'Remind Me', 'Email From System');
			if (!isset($return['user_email'])) {
				$return['user_email'] = $user['user_email'];
			}
		}
	}

	$return['status' ] = $error == '' ? 'ok' : 'error';
	$return['message'] = $error;
	echo json_encode($return);
}

/**
 *	$.ajax({ method: profile, user_name: x...x, first_name: x...x, last_name: x...x, email: x...x, current: x...x, password: x...x });
 *
 *	status: ok
 * message: x...x
 */
private function profile($data) {
	$user_name	= $data['user_name'	];
	$first_name	= $data['first_name'];
	$last_name	= $data['last_name'	];
	$email		= $data['email'		];
	$current	= $data['current'	];
	$password	= $data['password'	];
	$full_name	= $first_name . ' ' . $last_name;

	$db = Zend_Registry::get('db');
	$error = '';
	if ($password != MD5('')) {
		$sql= 'SELECT password'
			. '  FROM JKY_Users'
			. ' WHERE id = ' . get_session('user_id')
			;
		$my_password = $db->fetchOne($sql);

		if ($my_password != $current) {
			$error = 'Current Password is invalid';
		}
		$set_password = ', password = "' . $password . '"';
	}else{
		$set_password = '';
	}

	if ($error == '') {
		$set= '  first_name		= "' . $first_name		. '"'
			. ', last_name		= "' . $last_name		. '"'
			. ', full_name		= "' . $full_name		. '"'
			. ', email			= "' . $email			. '"'
			;
		$sql= 'UPDATE Contacts'
			. '   SET ' . $set
			. ' WHERE id = ' . get_session('contact_id')
			;
		$this->log_sql('profile', null, $sql);
		$db->query($sql);

//		set_session('full_name', $full_name);

		$sql= 'UPDATE JKY_Users'
			. '   SET user_name	= "' . $user_name . '"'	. $set_password
			. ' WHERE id = ' . get_session('user_id')
			;
		$this->log_sql('profile', null, $sql);
		$db->query($sql);
	}

	$return = array();
	if ($error == '') {
		$return['status' ] = 'ok';
		$return['message'] = 'profile updated';
	}else{
		$return['status' ] = 'error';
		$return['message'] = $error;
	}
	$this->echo_json($return);
}

/**
 *	$.ajax({ method: sign_up, user_name: x...x, email_address: x...x[, company_name: x...x][, phone_number: x...x][, newsletter: [yes/no]] });
 *
 *	status: ok
 * message: x...x
 */
private function sign_up() {
	$db = Zend_Registry::get('db');

     $user_name     = get_request( 'user_name'         );
     $email_address = get_request( 'email_address'     );
     $company_name  = get_request( 'company_name'      );
     $phone         = get_request( 'phone_number'      );
     $newsletter    = get_request( 'newsletter'        );

     if(  is_empty( $company_name )) {
	  $company_id = COMPANY_ID;
     } else {
	  $set = '  created_at     = "' . date( 'Y-m-d H:i:s' ) . '"'
	       . ', parent_id      =  ' . get_session( 'control_company', COMPANY_ID )
	       . ', company_name   = "' . $company_name     . '"'
	       . ', start_date     = "' . date( 'Y-m-d' )   . '"'
	       . ', company_number =  ' . $this->getUniqueNumber( 'Companies', 'company_number' )
	       ;
	  $sql = 'INSERT Companies'
	       . '   SET ' . $set
	       ;
//$this->log_sql( null, 'sign_up', $sql );
	  $db->query( $sql );
	  $company_id = $db->lastInsertId();
	  $this->log_sql( 'sign_up', $company_id, $sql );
     }

     $user_id = $this->insert_user_jky();

     $set = '  id             =  ' . $user_id
	  . ', created_at     = "' . date( 'Y-m-d H:i:s' ) . '"'
	  . ', company_id     =  ' . $company_id
	  . ', newsletter     = "' . $newsletter       . '"'
	  . ', user_number    =  ' . $this->getUniqueNumber( 'Contacts', 'user_number' )
	  . ', user_role      = "' . 'member'          . '"'
	  . ', full_name      = "' . $user_name        . '"'
	  . ', first_name     = "' . $user_name        . '"'
	  . ', user_email     = "' . $email_address    . '"'
	  . ', user_name      = "' . $user_name        . '"'
	  . ', phone          = "' . $phone            . '"'
	  ;
     $sql = 'INSERT Contacts'
	  . '   SET ' . $set
	  ;
//$this->log_sql( null, 'sign_up', $sql );
     $db->query( $sql );
     meta_replace( 'User', $user_id, 'unconfirmed_email', $email_address );

     $this->log_sql( 'sign_up', $user_id, $sql );

     $set = '  contact_id     =  ' . $user_id;
     $sql = 'UPDATE Companies'
	  . '   SET ' . $set
	  . ' WHERE id = ' . $company_id
	  . '   AND contact_id IS NULL'
	  ;
//$this->log_sql( null, 'sign_up', $sql );
     $db->query( $sql );
     $this->log_sql( 'sign_up', $company_id, $sql );

     email_by_event( $user_id, 'Confirm Email', 'Email From System' );

     $return = array();
     $return[ 'status'   ] = 'ok';
     $return[ 'message'  ] = 'new account created';
     $this->echo_json( $return );
}

/*
 *   $.ajax({ method: send_email, user_id: 9...9, template_name: x...x });
 *
 *   status: ok
 *  message: x...x
 */
private function send_email() {
     $user_id       = get_request( 'user_id'           );
     $template_name = get_request( 'template_name'     );
     $email_from    = 'Email From System';

     $user     = db_get_row( 'Contacts' , 'id = ' . $user_id );
     $user_jky = db_get_row( 'JKY_Users', 'id = ' . $user_id );
     $to_name  = $user[ 'full_name'     ];
     $to_email = $user[ 'user_email'    ];
     $cc_name  = '';
     $cc_email = '';

     $template = db_get_row( 'Templates', 'template_name = "' . $template_name . '"' );
     $subject  = revert_entities($template[ 'template_subject'   ]);
     $body     = revert_entities($template[ 'template_body'      ]);

     $names    = explode( ';', get_control_value( 'System Keys', $email_from ));
     $from_name     = $names[ 0 ];
     $from_email    = $names[ 1 ];

     $search   = array();
     $replace  = array();
     $search[] = '+'               ; $replace[] = ' ';
     $search[] = '{SERVER_NAME}'   ; $replace[] = SERVER_NAME;
     $search[] = '{SUPPORT_NAME}'  ; $replace[] = $from_name;
     $search[] = '{USER_EMAIL}'    ; $replace[] = $user     [ 'user_email' ];
     $search[] = '{USER_NAME}'     ; $replace[] = $user     [ 'full_name'  ];
     $search[] = '{USER_KEY}'      ; $replace[] = $user_jky [ 'user_key'   ];

     $subject  = str_replace( $search, $replace, $subject   );
     $body     = str_replace( $search, $replace, $body      );

     email_now( $from_email, $from_name, $to_email, $to_name, $cc_email, $cc_name, $subject, $body );

     $return = array();
     $return[ 'status'   ] = 'ok';
     $return[ 'message'  ] = 'Email sent out, the template: ' . $template_name;
     $this->echo_json( $return );
}

/*
 *   $.ajax({ method: send_receipt, receive_id: 9...9, template_name: x...x });
 *
 *   status: ok
 *  message: x...x
 */
    private function send_receipt() {
	$receive_id    = get_request( 'receive_id'        );
	$template_name = get_request( 'template_name'     );
	$email_from    = 'Email From System';

	$receive  = db_get_row ('Receives', 'id = ' . $receive_id);
	$services = db_get_rows('Services', 'receive_id = ' . $receive_id);

	$helper_names = '';
	foreach ($services as $service) {
	    $user = db_get_row('Contacts', 'id = ' . $service['user_id']);
	    $helper_names .= '<br>' . $user['full_name'];
	}

	$to_name  = $receive['full_name'];
	$to_email = $receive['email'    ];
	$cc_name  = '';
	$cc_email = '';

	$template = db_get_row( 'Templates', 'template_name = "' . $template_name . '"' );
	$subject  = revert_entities($template[ 'template_subject'   ]);
	$body     = revert_entities($template[ 'template_body'      ]);

	$names    = explode( ';', get_control_value( 'System Keys', $email_from ));
	$from_name     = $names[ 0 ];
	$from_email    = $names[ 1 ];

	$search   = array();
	$replace  = array();
	$search[] = '+'                 ; $replace[] = ' ';
	$search[] = '{SERVER_NAME}'     ; $replace[] = SERVER_NAME;
	$search[] = '{FULL_NAME}'       ; $replace[] = $receive['full_name'     ];
	$search[] = '{STREET}'          ; $replace[] = $receive['street'        ];
	$search[] = '{CITY}'            ; $replace[] = $receive['city'          ];
	$search[] = '{ZIP}'             ; $replace[] = $receive['zip'           ];
	$search[] = '{STATE}'           ; $replace[] = $receive['state'         ];
	$search[] = '{RECEIVE_ON}'      ; $replace[] = format_date($receive['receive_on']);
	$search[] = '{RECEIVE_AMOUNT}'  ; $replace[] = $receive['receive_amount'];
	$search[] = '{EVENT_NAME}'      ; $replace[] = get_session('event_name');
	$search[] = '{HELPER_NAMES}'    ; $replace[] = $helper_names;

	$subject  = str_replace( $search, $replace, $subject   );
	$body     = str_replace( $search, $replace, $body      );

	email_now( $from_email, $from_name, $to_email, $to_name, $cc_email, $cc_name, $subject, $body );

	$return = array();
	$return[ 'status'   ] = 'ok';
	$return[ 'message'  ] = 'Email sent out, the template: ' . $template_name;
	$this->echo_json( $return );
    }

//   ---------------------------------------------------------------------------

private function get_next_number($table, $name ) {
	$db = Zend_Registry::get( 'db' );
	$sql= 'SELECT value'
		. '  FROM ' . $table
		. ' WHERE name = "' . $name . '"'
		;
	$my_number = $db->fetchOne($sql);
	$my_next   = (int)$my_number + 1;
	$sql= 'UPDATE ' . $table
		. '   SET value = "' . $my_next . '"'
		. ' WHERE name  = "' . $name . '"'
		;
	$db->query($sql);
	return $my_number;
}

private function get_last_id( $table, $where='1' ) {
     $sql = 'SELECT id'
	  . '  FROM ' . $table
	  . ' WHERE ' . $where
	  . ' ORDER BY created_at DESC'
	  . ' LIMIT 0, 1'
	  ;
     $db  = Zend_Registry::get( 'db' );
     return $db->fetchOne( $sql );
}

private function get_only_id($table, $where) {
     $sql = 'SELECT id'
	  . '  FROM ' . $table
	  . ' WHERE ' . $where
	  ;
//$this->log_sql( 'get_only_id', null, $sql );
     $db  = Zend_Registry::get( 'db' );
     return $db->fetchOne( $sql );
}

private function log_sql( $table, $id, $sql ) {
     $date = date( 'Y-m-d' );
     $time = date( 'H:i:s' );

     $logFile = fopen( SERVER_BASE . 'logsql/' . $date . '.txt', 'a' ) or die( 'cannot open logsql file' );
     fwrite( $logFile, get_now() . ' table ' . $table . ' id ' . $id . ' ' . $sql . NL );
     fclose( $logFile );
}

    private function history_log($method, $table, $id, $new, $old) {
	$history = '';
	$first   = '';
	foreach($new as $key=>$value) {
	    if ($method == 'update') {
		if ($key != 'updated_at' and $new[$key] != $old[$key]) {
		    $history .= $first . $key . ':' . $old[$key] . '=>'. $value;
		    $first = ', ';
		}
	    } else {
		$history .= $first . $key . ':' . $value;
		$first = ', ';
	    }
	}

	if (empty($history)) {
	    return;
	}
	$sql= 'INSERT History'
	    . '   SET created_by    = "' . get_session('user_id') . '"'
	    . '     , created_at    =  ' . 'NOW()'
	    . '     , parent_name   = "' . $table . '"'
	    . '     , parent_id     =  ' . $id
	    . '     , method       = "' . $method . '"'
	    . '     , history       = "' . $history . '"'
	;
//$this->log_sql('History', null, $sql);
	$db  = Zend_Registry::get( 'db' );
	$db->query( $sql );
    }

private function getUniqueNumber( $table, $field ) {
     while ( true ) {
	  $number = mt_rand( 1000000000, 1999999999 );
	  $sql = 'SELECT id'
	       . '  FROM ' . $table
	       . ' WHERE ' . $field . ' = ' . $number
	       ;
	  $db  = Zend_Registry::get( 'db' );
	  $result = $db->fetchOne( $sql );
	  if( !$result )
	       return $number;
     }
}

private function echo_error( $message ) {
     $return = array();
     $return[ 'status'  ] = 'error';
     $return[ 'message' ] = $message;
     echo json_encode( $return );
}

/*
 *   $.ajax({ method:'set_amount', table:'Admin', receive_id:receive_id, service_id:service_id, fee_amount:fee_amount};
 *
 *   status: ok
 *  message: record updated
 */
    private function set_amount() {
	$table      = get_request('table'     );
	$receive_id = get_request('receive_id');
	$service_id = get_request('service_id');
	$fee_amount = get_request('fee_amount');

	if(  $receive_id == ''
	or   $service_id == ''
	or   $fee_amount == '' ) {
	    $this->echo_error( 'missing input fields' );
	    return;
	}

	$updated = '  updated_by='  . get_session( 'user_id' )
		 . ', updated_at="' . get_time() . '"'
		 ;

	$sql = 'UPDATE Receives'
	     . '   SET ' . $updated
	     . '     , set_amount = set_amount + ' . $fee_amount
	     . ' WHERE id = ' . $receive_id
	     ;
	$this->log_sql( $table, 'update', $sql );
	$db  = Zend_Registry::get( 'db' );
	$db->query( $sql );

	if ($fee_amount < 0) {
	    $receive_id = 'null';
	}
	$sql = 'UPDATE Services'
	     . '   SET ' . $updated
	     . '     , receive_id = ' . $receive_id
	     . '     , receive_amount = receive_amount + ' . $fee_amount
	     . ' WHERE id = ' . $service_id
	     ;
	$this->log_sql( $table, 'update', $sql );
	$db  = Zend_Registry::get( 'db' );
	$db->query( $sql );

	$return = array();
	$return[ 'status'   ] = 'ok';
	$return[ 'message'  ] = 'record updated';
	echo json_encode( $return );
    }

/*
 *   $.ajax({ method:'reset_amount', table:'Admin', receive_id:receive_id, service_id:service_id, fee_amount:fee_amount};
 *
 *   status: ok
 *  message: record updated
 */
    private function reset_amount() {
	$table      = get_request('table'     );
	$receive_id = get_request('receive_id');
	$service_id = get_request('service_id');
	$fee_amount = get_request('fee_amount');

	if(  $receive_id == ''
	or   $service_id == ''
	or   $fee_amount == '' ) {
	    $this->echo_error( 'missing input fields' );
	    return;
	}

	$updated = '  updated_by='  . get_session( 'user_id' )
		 . ', updated_at="' . get_time() . '"'
		 ;

	$sql = 'UPDATE Receives'
	     . '   SET ' . $updated
	     . '     , set_amount = set_amount - ' . $fee_amount
	     . ' WHERE id = ' . $receive_id
	     ;
	$this->log_sql( $table, 'update', $sql );
	$db  = Zend_Registry::get( 'db' );
	$db->query( $sql );

	if ($fee_amount < 0) {
	    $receive_id = 'null';
	}
	$sql = 'UPDATE Services'
	    . '   SET ' . $updated
	    . '     , receive_id = ' . $receive_id
	    . '     , receive_amount = receive_amount - ' . $fee_amount
	    . ' WHERE id = ' . $service_id
	;
	$this->log_sql( $table, 'update', $sql );
	$db  = Zend_Registry::get( 'db' );
	$db->query( $sql );

	$return = array();
	$return[ 'status'   ] = 'ok';
	$return[ 'message'  ] = 'record updated';
	echo json_encode( $return );
    }

/*
 *   $.ajax({ method: refresh, table: x...x });
 *
 *   status: ok
 */
    private function refresh() {
/*
	if (get_session('user_action') != 'All') {
	    return;
	}

	$table         = get_request( 'table' );
	$db            = Zend_Registry::get( 'db' );

	if( $table == 'Summary' ) {
	    $fileName = '../sql/Summary.sql';
	    $inpFile  = fopen( $fileName, 'r' );
	    $sql      = fread( $inpFile, filesize( $fileName ));
	    fclose( $inpFile );

	    $db->query($sql);
	}
*/
	$this->init_counters();

	$sql = 'SELECT Services.*'
	     . '     , Contacts.gender, Contacts.all_gifts, Contacts.church_name'
	     . '  FROM Services'
	     . '  LEFT JOIN Contacts ON Contacts.id = Services.user_id'
	     . ' WHERE Services.event_id = ' . get_session('event_id')
	     ;
	$db   = Zend_Registry::get( 'db' );
	$rows = $db->fetchAll( $sql );
	foreach( $rows as $row ) {
	    $weeks = 0;
	    if ($row['week_1']=='yes')  {$weeks += 1;}
	    if ($row['week_2']=='yes')  {$weeks += 1;}
	    if ($row['week_3']=='yes')  {$weeks += 1;}

	    $week_1 = ($weeks == 1) ? 1 : 0;
	    $week_2 = ($weeks == 2) ? 1 : 0;
	    $week_3 = ($weeks == 3) ? 1 : 0;

	    $gender = $row['gender'];
	    if ($gender == '') {
		$gender = 'unknown';
	    }
	    $this->add_counter('Tshirt Size'        , $gender       . ' + ' . $row['tshirt_size'], $week_1, $week_2, $week_3);

	    $week_1 = ($row['week_1']=='yes') ? 1 : 0;
	    $week_2 = ($row['week_2']=='yes') ? 1 : 0;
	    $week_3 = ($row['week_3']=='yes') ? 1 : 0;

	    $this->add_counter('Language English'   , 'Speaking '   . ' + ' . $row['en_speaking'], $week_1, $week_2, $week_3);
	    $this->add_counter('Language English'   , 'Reading '    . ' + ' . $row['en_reading' ], $week_1, $week_2, $week_3);
	    $this->add_counter('Language English'   , 'Writing '    . ' + ' . $row['en_writing' ], $week_1, $week_2, $week_3);
	    $this->add_counter('Language Mandarim'  , 'Speaking '   . ' + ' . $row['ma_speaking'], $week_1, $week_2, $week_3);
	    $this->add_counter('Language Mandarim'  , 'Reading '    . ' + ' . $row['ma_reading' ], $week_1, $week_2, $week_3);
	    $this->add_counter('Language Mandarim'  , 'Writing '    . ' + ' . $row['ma_writing' ], $week_1, $week_2, $week_3);
	    $this->add_counter('Language Taiwanese' , 'Speaking '   . ' + ' . $row['tw_speaking'], $week_1, $week_2, $week_3);
	    $this->add_counter('Language Taiwanese' , 'Reading '    . ' + ' . $row['tw_reading' ], $week_1, $week_2, $week_3);
	    $this->add_counter('Language Taiwanese' , 'Writing '    . ' + ' . $row['tw_writing' ], $week_1, $week_2, $week_3);

	    $age = $row['helper_age'];
		 if( $age > 20 and $age < 31)    $age = '21 - 30';
	    else if( $age > 30 and $age < 41)    $age = '31 - 40';
	    else if( $age > 40 and $age < 51)    $age = '41 - 50';
	    else if( $age > 50 and $age < 61)    $age = '51 - 60';
	    else if( $age > 60              )    $age = '61 +'   ;
	    $this->add_counter('Count by Age'           , $age          , $week_1, $week_2, $week_3);

	    $school_year = $row['school_year'];
	    if ($school_year == '') {
		$school_year = 'unknown';
	    }
	    $this->add_counter('Count by School Year'   , $school_year  , $week_1, $week_2, $week_3);

	    $names = explode(' ', $row['all_gifts']);
	    foreach($names as $name) {
		if ($name != '') {
		    $this->add_counter('Count by Gift'  , $name         , $week_1, $week_2, $week_3);
		}
	    }

	    $church_name = $row['church_name'];
	    if ($church_name == '' or $church_name == 'null') {
		$church_name = 'unknown';
	    }
	    $this->add_counter('Count by Church'        , $church_name  , $week_1, $week_2, $week_3);

	    $completed = $row['completed'];
	    $this->add_counter('Percentage Completed'   , $completed    , $week_1, $week_2, $week_3);
	}

	$sql = NL . 'TRUNCATE TABLE Summary;'
	     . NL . 'INSERT INTO `Summary` (`id`, `group_by`, `group_key`, `week_1`, `week_2`, `week_3`) VALUES '
	     ;
	$first = ' ';
	$counters = $this->get_counters();
	foreach($counters as $group_by=>$counter_by) {
	    foreach($counter_by as $group_key=>$counter_key) {
		$sql .= NL . $first . '(NULL, "' . $group_by . '", "' . $group_key . '", ' . $counter_key[0] . ', ' . $counter_key[1] . ', ' . $counter_key[2] . ')';
		$first = ',';
	    }
	}
	$sql .= "\n;";
	$db->query($sql);

	$return = array();
	$return[ 'status'   ] = 'ok';
	echo json_encode( $return );
    }

}
?>