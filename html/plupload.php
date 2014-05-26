<?php
require_once   '../application/Constant.php';
require_once   '../application/Utility.php';
require_once   '../application/Specific.php';

//   report errors
#error_reporting( E_ERROR | E_WARNING | E_PARSE );
#error_reporting( E_ALL | E_STRICT );
 error_reporting( E_ALL );

ini_set( 'display_startup_errors'  , 'on'    );
ini_set( 'display_errors'          , 'on'    );
//ini_set( 'memory_limit'            , '2048M' );        //  512M is good for 160M

date_default_timezone_set( 'America/Sao_Paulo' );

//   Define path to application directory
defined( 'APPLICATION_PATH' ) or define( 'APPLICATION_PATH', realpath( dirname( __FILE__ )));

//   Define application environment
#defined( 'APPLICATION_ENV'  ) or define( 'APPLICATION_ENV' , getenv( 'APPLICATION_ENV' ) ? getenv( 'APPLICATION_ENV' ) : 'production' );

//   Ensure library/ is on include_path
set_include_path( implode( PATH_SEPARATOR, array( realpath( APPLICATION_PATH . LIBRARY ), get_include_path() )));

//   Zend_Application
require_once 'Zend/Loader/Autoloader.php';
require_once 'Zend/Application.php';

/*
//   Create application, bootstrap, and run
$application = new Zend_Application( ENVIRONMENT, APPLICATION_PATH . '/config.ini' );

//   load application configuration
if( !Zend_Registry::isRegistered( 'config' )) {
     Zend_Loader::loadClass( 'Zend_Config_Ini' );
     $config = new Zend_Config_Ini( 'config.ini', ENVIRONMENT );
     Zend_Registry::set( 'config', $config );
}

//   connect to the database
if( !Zend_Registry::isRegistered( 'db' )) {
     $db = Zend_Db::factory( $config->resources->db );
     Zend_Db_Table_Abstract::setDefaultAdapter( $db );
     Zend_Registry::set( 'db', $db );
}
*/

$autoLoader = Zend_Loader_Autoloader::getInstance();
$autoLoader->registerNamespace( 'JKY_' );
$resourceLoader = new Zend_Loader_Autoloader_Resource( array
     ( 'basePath'        => APPLICATION_PATH
     , 'namespace'       => ''
     , 'resourceTypes'   => array
          ( 'form'       => array( 'path' =>       'forms/', 'namespace' =>  'Form_' )
          , 'model'      => array( 'path' =>      'models/', 'namespace' => 'Model_' )
          )
     )
);

/**
 * plupload.php
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

function Xlog_sql( $message ) {
     $date = date( 'Y-m-d' );
     $time = date( 'H:i:s' );

     $logFile = fopen( '../logsql/' . $date . '.txt', 'a' ) or die( 'cannot open logsql file' );
     fwrite( $logFile, $time . $message . "\r\n" );
     fclose( $logFile );
}

function create_thumb( $folder, $name, $ext, $maxW, $maxH ) {
	$photoPath = UPLOADS . $folder . $name . '.' . $ext;

     $info = getimagesize( $photoPath );
     $w = $info[ 0 ];
     $h = $info[ 1 ];

     $ratio = $w / $h;

     if(  $ratio < 1 ) {
          $newW = min( $w, $maxW );
          $newH = $newW / $ratio;
     } else {
          $newH = min( $h, $maxH );
          $newW = $newH * $ratio;
     }

     switch( $ext ) {
          case 'gif':    $infunc = 'imagecreatefromgif' ;   $outfunc = 'imagepng';  break;
          case 'jpg':    $infunc = 'imagecreatefromjpeg';   $outfunc = 'imagepng';  break;
          case 'png':    $infunc = 'imagecreatefrompng' ;   $outfunc = 'imagepng';  break;
          default   :    throw new Exception( 'Invalid image type' );
     }

     $image = @$infunc( $photoPath );

     if( !$image )                           throw new Exception( 'Unable to read image file' );

     $thumb = imagecreatetruecolor( $newW, $newH );
     imagecopyresampled( $thumb, $image, 0, 0, 0, 0, $newW, $newH, $w, $h );

     $thumbPath = THUMBS . $folder . $name . '.png';
     imagepng( $thumb, $thumbPath );

     if(  ! file_exists( $thumbPath ))       throw new Exception( 'Unkown error occured creating thumbnail' );
     if(  ! is_readable( $thumbPath ))       throw new Exception( 'Unable to read thumbnail' );
}

//   http headers for no cache etc
header( 'Expires: Mon, 26 Jul 1997 05:00:00 GMT' );
header( 'Last-Modified: ' . gmdate( 'D, d M Y H:i:s' ) . ' GMT' );
header( 'Cache-Control: no-store, no-cache, must-revalidate' );
header( 'Cache-Control: post-check=0, pre-check=0', false );
header( 'Pragma: no-cache' );

//   settings
//$targetDir = ini_get( 'upload_tmp_dir' ) . DIRECTORY_SEPARATOR . 'plupload';
$targetDir = UPLOADS;
$thumbsDir = THUMBS;

//$cleanupTargetDir = false;         //   remove old files
//$maxFileAge = 60 * 60;             //   temp file age in seconds

@set_time_limit(5 * 60);			//	5 minutes execution time

//usleep( 5000 );                  //   uncomment this one to fake upload time

//	get parameters
$chunk		= isset($_REQUEST['chunk'	]) ? $_REQUEST['chunk'	] : 0 ;
$chunks		= isset($_REQUEST['chunks'	]) ? $_REQUEST['chunks'	] : 0 ;
$fileName	= isset($_REQUEST['name'	]) ? $_REQUEST['name'	] : '';

if ($chunk == 0)		set_session('my_time', get_time());

Xlog_sql(' my time: ' . get_session( 'my_time' ) . ', chunk: ' . $chunk . ', chunks: ' . $chunks . ', fileName: ' . $fileName . ', fileSize: ' . $_FILES['file']['size']);

//   clean the fileName for security reasons
$fileName  = preg_replace( '/[^\w\._]+/', '', $fileName );
$names     = explode( '.', $fileName );
$folder    = $names[ 0 ] . '/';
$file_id   = $names[ 1 ];
$file_type = strtolower($names[ count( $names )-1 ]);

//   make sure the fileName is unique but only if chunking is disabled
/*
if(  $chunks < 2 && file_exists( $targetDir . $fileName )) {
	$ext = strrpos( $fileName, '.' );
	$fileName_a = substr( $fileName, 0, $ext );
	$fileName_b = substr( $fileName, $ext );

	$count = 1;
	while( file_exists( $targetDir . $fileName_a . '_' . $count . $fileName_b ))
		$count++;

	$fileName = $fileName_a . '_' . $count . $fileName_b;
}
*/

//   create target dir
/*
if( !file_exists( $targetDir ))
	@mkdir( $targetDir );
*/

//   remove old temp files
/* this doesn't really work by now

if(  is_dir( $targetDir ) && ( $dir = opendir( $targetDir ))) {
	while(( $file = readdir( $dir )) !== false ) {
		$filePath = $targetDir . $file;

//        Remove temp files if they are older than the max age
		if(  preg_match( '/\\.tmp$/', $file ) && ( filemtime( $filePath ) < time() - $maxFileAge ))
			@unlink($filePath);
	}

	closedir( $dir );
} else {
	die( "'{ 'jsonrpc' : '2.0', 'error' : { 'code': 100, 'message': 'Failed to open temp directory.' }, 'id' : 'id' }" );
}
*/

//   look for the content type header
if(  isset( $_SERVER[ 'HTTP_CONTENT_TYPE' ]))
	$contentType = $_SERVER[ 'HTTP_CONTENT_TYPE' ];

if(  isset( $_SERVER[ 'CONTENT_TYPE' ]))
	$contentType = $_SERVER[ 'CONTENT_TYPE' ];

Xlog_sql( ' contentType: ' . $contentType );

//   handle non multipart uploads older WebKit versions didn't support multipart in HTML5
if(  strpos( $contentType, 'multipart' ) !== false ) {
Xlog_sql( ' multipart' );
	if(  isset( $_FILES[ 'file' ][ 'tmp_name' ]) && is_uploaded_file( $_FILES[ 'file' ][ 'tmp_name' ])) {
Xlog_sql( ' fileSize: ' . $_FILES[ 'file' ][ 'size' ] );
//        open temp file
//	     $out = fopen( $targetDir . $fileName, $chunk == 0 ? 'wb' : 'ab' );
          if(  $chunk == 0 ) {
               $mode = 'wb';
//               $file_key = encrypt_hash( get_date() );
               $file_key = $file_id;
               set_session( 'file_key'       , $file_key    );
               set_session( 'file_name'      , $fileName    );
               set_session( 'file_type'      , $file_type   );
               set_session( 'upload_start'   , get_time()   );
          } else {
               $mode = 'ab';
               $file_key = get_session( 'file_key' );
          }

		$out = fopen( $targetDir . $folder . $file_key . '.' . $file_type, $mode );
		if( $out ) {
//             read binary input stream and append it to temp file
			$in = fopen( $_FILES[ 'file' ][ 'tmp_name' ], 'rb' );

			if(  $in ) {
				while( $buff = fread( $in, 4096 ))
					fwrite( $out, $buff );
			} else {
				die( "{ 'jsonrpc' : '2.0', 'error' : { 'code': 101, 'message': 'Failed to open input stream.' }, 'id' : 'id' }" );
               }
			fclose( $in  );
			fclose( $out );
			@unlink( $_FILES[ 'file' ][ 'tmp_name' ]);
		} else {
			die( "{ 'jsonrpc' : '2.0', 'error' : { 'code': 102, 'message': 'Failed to open output stream.' }, 'id' : 'id' }" );
        }
	} else {
		die( "{ 'jsonrpc' : '2.0', 'error' : { 'code': 103, 'message': 'Failed to move uploaded file.' }, 'id' : 'id' }" );
    }
} else {
Xlog_sql( 'php://input' );
//        open temp file
//	     $out = fopen( $targetDir . $fileName, $chunk == 0 ? 'wb' : 'ab' );
          if(  $chunk == 0 ) {
               $mode = 'wb';
//               $file_key = encrypt_hash( get_date() );
               $file_key = $file_id;
               set_session( 'file_key'       , $file_key    );
               set_session( 'file_name'      , $fileName    );
               set_session( 'file_type'      , $file_type   );
               set_session( 'upload_start'   , get_time()   );
          } else {
               $mode = 'ab';
               $file_key = get_session( 'file_key' );
          }

		$out = fopen( $targetDir . $folder . $file_key . '.' . $file_type, $mode );
	if( $out ) {
//        read binary input stream and append it to temp file
        $in = fopen( 'php://input', 'rb' );

		if(  $in ) {
			while( $buff = fread( $in, 4096 ))
				fwrite( $out, $buff );
		} else {
			die( "{ 'jsonrpc' : '2.0', 'error' : { 'code': 101, 'message': 'Failed to open input stream.' }, 'id' : 'id' }" );
          }

		fclose( $in  );
		fclose( $out );
	} else {
		die( "{ 'jsonrpc' : '2.0', 'error' : { 'code': 102, 'message': 'Failed to open output stream.' }, 'id' : 'id' }" );
     }
}
Xlog_sql( ' end of upload' );


if ($file_type == 'gif'
or	$file_type == 'jpg'
or	$file_type == 'png') {
	create_thumb( $folder, $file_key, $file_type, 120, 120 );
}


//   return JSON-RPC response
die( "{ 'jsonrpc' : '2.0', 'result' : null, 'id' : 'id' }" );

?>