<?php
/**
 *		<link   href='resource.php/v4.2.5/test_resource.css' rel='stylesheet' />
 *		<script  src='resource.php/v4.2.5/test_resource.js'></script>
 */

define('NL'			, "\r\n"			);
define('RESOURCES'	, "../resources/"	);		//	resources folder within version folder

$requests	= explode("/", $_SERVER['REQUEST_URI']);
$version	= $requests[count($requests)-2];
$file_name	= $requests[count($requests)-1];
$files		= explode(".", $file_name);
$file_ext	= $files[count($files)-1];

switch($file_ext) {
	case 'js'		:	header('Content-Type: application/javascript'	);	break;
	case 'css'		:	header('Content-Type: text/css'					);	break;
	default			:	header('Content-Type: text/html'				);	break;
}
$resource_name = RESOURCES . $version . '/' . $file_name;

$last_modified = filemtime($resource_name);
$resource_etag = md5_file ($resource_name);
header("Last-Modified: " . gmdate("D, d M Y H:i:s", $last_modified) . " GMT");
header("Etag: $resource_etag");
header('Cache-Control: public');
//	caching control 304
if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])) {
	if (strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == $last_modified
	||	trim($_SERVER['HTTP_IF_NONE_MATCH']) == $resource_etag) {
		header("HTTP/1.1 304 Not Modified");
		exit;
	}
}

$resource_file = fopen($resource_name, 'r') or die('cannot open resource file: ' . $resource_name);
$resource_data = fread($resource_file, filesize($resource_name));
fclose($resource_file);
$search		= array();
$replace	= array();
$search []	= '+';
$replace[]	= ' ';

$return	= '';
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