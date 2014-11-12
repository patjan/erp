<?php
require_once 'Utility.php';
define('NL', "\n");

$dir = 'C:/htdocs/erp/nfe/received/';
$dir = 'C:/htdocs/erp/nfe/rejected/';

echo NL . 'Glob - start';
$files = array();
foreach(glob($dir . '*.*') as $filename) {
	$file = array();
	$names = explode('/', $filename);
	$file['name'] = $names[count($names)-1];

	$file['ext' ] = get_file_ext($filename);

	$file['size'] = put_size(filesize($filename));
	$file['time'] = date('Y-m-d h:i:s', filemtime($filename));
	array_push($files, $file);
}
echo NL . 'Glob - end';

foreach($files as $file) {
	echo NL;
    echo '  name: ' . $file['name'];
	echo ', size: ' . $file['size'];
	echo  ', ext: ' . $file['ext' ];
	echo ', time: ' . $file['time'];
}
echo NL . 'end';
?>
