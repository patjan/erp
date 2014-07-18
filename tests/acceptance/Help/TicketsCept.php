<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Tickets page');
$I->login			($I, 'Admin', 'User');

$I->clickMenu		($I, 'Help');
$I->clickBar		($I, 'Help', 'Tickets');

$I->clickSelect		($I, 'All'		);
$I->clickSelect		($I, 'Closed'	);
$I->clickSelect		($I, 'Open'		);

$I->clickActionForm	($I, 'Permissions');
$I->canSeeInField	('#jky-opened-at'		, '08-14-2013');
$I->canSeeInField	('#jky-opened-by'		, 'Marcelo Lodi');
$I->canSeeInField	('#jky-assigned-at'		, '');
$I->canSeeInField	('#jky-assigned-at'		, '');
$I->canSeeInField	('#jky-closed-at'		, '');
$I->canSeeInField	('#jky-closed-by'		, '');
$I->canSeeInField	('#jky-priority'		, 'Version 2');
$I->canSeeInField	('#jky-category'		, 'Permissions');
$I->canSeeInField	('#jky-worked-hour'		, '0');
//$I->canSeeImage		('100002');
//$I->canSeeInField	('#jky-description'		, 'Pat - Preciso criar dois usuários que só podem visualizar as FTP, nem imprimir não pode, tem como fazermos isso?');
$I->canSeeInField	('#jky-resolution'		, '');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->logoff			($I);
