<?
require '../application/Application.php';

$config = new Zend_Config_Ini( APPLICATION_PATH . '/config.ini', ENVIRONMENT );
$db1 = Zend_Db::factory( $config->resources->multidb->db1);
$db3 = Zend_Db::factory( $config->resources->multidb->db3);

var_dump( $db1);
var_dump( $db3);

?>