<?php
define('NL', "\r\n");

$requests	= explode("/", $_SERVER['REQUEST_URI']);
$version	= $requests[count($requests)-2];
$file_name	= $requests[count($requests)-1];
$files		= explode(".", $file_name);
$file_ext	= $files[count($files)-1];

//	set headers to NOT cache a page
//header("Cache-Control: no-cache, must-revalidate"); //HTTP 1.1
//header("Pragma: no-cache"); //HTTP 1.0
//header("Expires: Sat, 26 Jul 2016 05:00:00 GMT");		// Date in the future

//	or, if you DO want a file to cache, use:
//header('Cache-Control: max-age=0');		//	30days (60sec * 60min * 24hours * 30days)

switch($file_ext) {
	case 'js'		:	header('Content-Type: text/html');	break;
	case 'css'		:	header('Content-Type: text/css'	);	break;
}

$resource_name = '../resources/' . $version . '/' . $file_name;
$resource_file = fopen($resource_name, 'r') or die('cannot open resource file: ' . $resource_name);
$resource_data = fread($resource_file, filesize($resource_name));
fclose($resource_file);

$search   = array();
$replace  = array();
$search[] = '+'               ; $replace[] = ' ';
$return		= '';
switch($file_ext) {
	case 'js'	:
		$search[] = '{VERSION}'		; $replace[] = $version		;
		$search[] = '{FILE_NAME}'	; $replace[] = $file_name	;
		$search[] = '{FILE_EXT}'	; $replace[] = $file_ext	;
		$return = str_replace($search, $replace, $resource_data);
		break;
	case 'css'	:
		$search[] = '{BACKGROUND}'	; $replace[] = '#C0C0C0'	;
		$search[] = '{COLOR}'		; $replace[] = '#222222'	;
		$return = str_replace($search, $replace, $resource_data);
		break;
}

echo $return;
?>