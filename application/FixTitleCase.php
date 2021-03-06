<?php
require_once 'Constant.php';
require_once  'Utility.php';

define('PROGRAM_NAME'	,	'FixTitleCase');
//define('LOCAL_SERVER'	,	'erp'  );					//	local server for test
//define('MAIN_SERVER'	,	'tecno.jkysoftware.com');	//	main server for production

/**
 *	Program:	FixTitleCase
 *	 Author:	Pat Jan
 *	Command:	cd /htdocs/erp/application
 *				php FixTitleCase.php
 *	 Domain:	Fixprocess batch DB updates
 *				and generate Changes to Update remote servers
 *				and keep log of all activities
 * 		Run:	on request
 *
 *	This program will fetch all names,
 *	change to TitleCase and if it is different then update the record
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

	$my_sql = 'SELECT * FROM Contacts';
	log_bat($my_sql);
	$my_rows	= $my_local_db->fetchAll($my_sql);
	$my_count	= count($my_rows);

	foreach($my_rows as $my_row) {
		$my_nick_name	= title_case($my_row['nick_name' ]);
		$my_first_name	= title_case($my_row['first_name']);
		$my_last_name	= title_case($my_row['last_name' ]);
		$my_full_name	= title_case($my_row['full_name' ]);
		$my_position	= title_case($my_row['position' ]);

		if ($my_nick_name	!= $my_row['nick_name' ]
		or  $my_first_name	!= $my_row['first_name']
		or  $my_last_name	!= $my_row['last_name' ]
		or  $my_full_name	!= $my_row['full_name' ]
		or  $my_position	!= $my_row['position'  ]) {
			$my_sql= 'UPDATE Contacts'
				. '   SET nick_name ="' . $my_nick_name  . '"'
				. ',     first_name ="' . $my_first_name . '"'
				. ',      last_name ="' . $my_last_name  . '"'
				. ',      full_name ="' . $my_full_name  . '"'
				. ',       position ="' . $my_position   . '"'
				. ' WHERE id = ' . $my_row['id']
				;
			log_bat($my_sql);
			$my_result = $my_local_db->query($my_sql);
		}
	}

	$my_sql = 'SELECT * FROM Colors';
	log_bat($my_sql);
	$my_rows	= $my_local_db->fetchAll($my_sql);
	$my_count	= count($my_rows);

	foreach($my_rows as $my_row) {
		$my_color_name = title_case($my_row['color_name']);

		if ($my_color_name != $my_row['color_name']) {
			$my_sql= 'UPDATE Colors'
				. '   SET color_name ="' . $my_color_name . '"'
				. ' WHERE id = ' . $my_row['id']
				;
			log_bat($my_sql);
			$my_result = $my_local_db->query($my_sql);
		}
	}

	$my_sql = 'SELECT * FROM Machines';
	log_bat($my_sql);
	$my_rows	= $my_local_db->fetchAll($my_sql);
	$my_count	= count($my_rows);

	foreach($my_rows as $my_row) {
		$my_machine_name = title_case($my_row['name']);

		if ($my_machine_name != $my_row['name']) {
			$my_sql= 'UPDATE Machines'
				. '   SET name ="' . $my_machine_name . '"'
				. ' WHERE id = ' . $my_row['id']
				;
			log_bat($my_sql);
			$my_result = $my_local_db->query($my_sql);
		}
	}

	$my_sql = 'SELECT * FROM Products';
	log_bat($my_sql);
	$my_rows	= $my_local_db->fetchAll($my_sql);
	$my_count	= count($my_rows);

	foreach($my_rows as $my_row) {
		$my_product_name = title_case($my_row['product_name']);

		if ($my_product_name != $my_row['product_name']) {
			$my_sql= 'UPDATE Products'
				. '   SET product_name ="' . $my_product_name . '"'
				. ' WHERE id = ' . $my_row['id']
				;
			log_bat($my_sql);
			$my_result = $my_local_db->query($my_sql);
		}
	}
/*
	$my_sql = 'SELECT * FROM Threads';
	log_bat($my_sql);
	$my_rows	= $my_local_db->fetchAll($my_sql);
	$my_count	= count($my_rows);

	foreach($my_rows as $my_row) {
		$my_thread_name = title_case($my_row['thread_name']);

		if ($my_thread_name != $my_row['thread_name']) {
			$my_sql= 'UPDATE Threads'
				. '   SET thread_name ="' . $my_thread_name . '"'
				. ' WHERE id = ' . $my_row['id']
				;
			log_bat($my_sql);
			$my_result = $my_local_db->query($my_sql);
		}
	}
*/
	$my_sql = 'SELECT * FROM Templates';
	log_bat($my_sql);
	$my_rows	= $my_local_db->fetchAll($my_sql);
	$my_count	= count($my_rows);

	foreach($my_rows as $my_row) {
		$my_template_name	 = title_case($my_row['template_name'	]);
		$my_template_subject = title_case($my_row['template_subject']);

		if ($my_template_name	 != $my_row['template_name'		]
		or  $my_template_subject != $my_row['template_subject'	]) {
			$my_sql= 'UPDATE Templates'
				. '   SET template_name    ="' . $my_template_name    . '"'
				. '     , template_subject ="' . $my_template_subject . '"'
				. ' WHERE id = ' . $my_row['id']
				;
			log_bat($my_sql);
			$my_result = $my_local_db->query($my_sql);
		}
	}

}catch(Exception $exp){
	log_bat('error, Local Server not connected: ' . $exp->getMessage());
}

log_bat('end of program');
return;

// -----------------------------------------------------------------------------

function title_case($the_words) {
	if ($the_words == '')		return '';

	$my_array = array();
	$my_words = explode(' ', $the_words);
	for($i=0; $i<count($my_words); $i++) {
		$my_word = $my_words[$i];
		if ($my_word != '') {
			$my_array[] = strtoupper(substr($my_word, 0, 1 )) . strtolower(substr($my_word, 1));
		}
	}
	return join(' ', $my_array);
}
