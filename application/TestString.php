<?php
require_once 'Utility.php';
define('NL', "\n");

echo NL . 'start';

$dir = 'C:/htdocs/erp/nfe/received/';
$dir = 'C:/htdocs/erp/nfe/rejected/';

$my_value = '123';

if (is_numeric($my_value) and substr($my_value, 0, 1) != '0') {
	echo NL . 'is numeric';
}else{
	echo NL . 'is not numeric';
}

echo NL . 'end';
?>
