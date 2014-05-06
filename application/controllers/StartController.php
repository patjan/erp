<?
/**
 * Process all [Start] functions

 * This controller will set pendent Start and run index page.

 *	 http://erp/index.php/start?method=reset&user_key=6e5fa4d9c48ca921c0a2ce1e64c9ae6f
 *   .../start?method=confirm&user_key=x...x
 *   .../start?method=reset  &user_key=x...x

 * @author: Pat Jan
 */
class	StartController extends JKY_Controller {

public function init() {
	$this->_helper->layout()->disableLayout();
//	$this->_helper->viewRenderer->setNoRender();

//	if (is_request('control_company'))		set_session('control_company', get_request('control_company'));
}

public function indexAction() {
	try {
		$referer	= isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : EXTERNAL_URL;
		$referer	= strtolower ($referer	);
		$method		= get_request('method'	);
		$user_key	= get_request('user_key');

		logger('start - referer:' . $referer . ', method:' . $method . ', user_key:' . $user_key);

//		set_session('bridge_from', $referer);
/*
		$names = explode( '/', $referer );
		$external_url = $names[ 2 ];

		switch( $external_url ) {
			 case    'www.jkysoftware.com' : set_session( 'control_company', 41 ); break;
			 default                       : return;
		}

		if(  is_session( 'bridge_to' ))         $this->_redirect( fetch_session( 'bridge_to' ));

		if(  is_logged())
			 $this->_redirect( 'home' );
		else $this->_redirect( 'user/' . get_request( 'action' ) . $plan_code );
*/
		switch ($method) {
			case 'confirm'	: $this->confirm($user_key); return;
			case 'reset'	: $this->reset	($user_key); return;
		}
	} catch(Exception $exp){
//		if (get_session('user_level') == MINIMUM_TO_SUPPORT) {
			$this->echo_error('' . $exp);
//		}else{
//			$this->echo_error('error on server');
//		}
	}
}

/**
 *	$.ajax({ method: confirm, user_key: x...x });
 *
 *	status: ok / error
 * message: x...x
 */

private function confirm($user_key) {
	$error = '';
	$user_id = db_get_id('JKY_Users', 'user_key = "' . $data['user_key'] . '"');

	if (!$user_id) {
		$error .= BR . 'User Account already expired';
	}else{
		if (is_empty(meta_get_id('Contacts', $user_id, 'unconfirmed_email'))) {
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
	echo json_encode($return);
}

/**
 *	$.ajax({ method: reset, user_key: x...x });
 *
 *	status: ok
 * message: password reseted
 */
private function reset($user_key) {
	$error = '';
	$user_id = db_get_id('JKY_Users', 'user_key = "' . $user_key . '"');
	logger('start - user_id: ' . $user_id);

	if ($user_id) {
		$this->update_user_key ($user_id);
		$this->set_user_session($user_id);
		$control = db_get_row('Controls', 'status = "Active" AND group_set ="User Roles" AND name= "' . get_session('user_role') . '"') ;
		logger('start - start_page: ' . $control['value']);
		set_session('start_page', $control['value']);
		set_session('overlay_page', 'reset');
	}else{
		$error .= BR . 'User Key is invalid';
		$this->render('invalid');
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
	set_session('user_email'	, $contact['email'		]);

	set_permissions($user['user_role']);
}

private function update_user_key($user_id) {
	$table = 'JKY_Users';
	$sql = 'UPDATE ' . $table
		. '   SET user_key="' . MD5(date('Y-m-d H:i:s')) . '"'
		. ' WHERE id = ' . $user_id
		;
	$this->log_sql($table, 'update', $sql);
	$db = Zend_Registry::get('db');
	$db->query($sql);
	insert_changes($db, $table, $user_id);
}

}
?>