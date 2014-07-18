<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Products page');
$I->login			($I, 'Production', 'User');

$I->clickMenu		($I, 'Production');
$I->clickBar		($I, 'Production', 'Products');

$I->clickSelect		($I, 'All'		);
$I->clickSelect		($I, 'Galao'	);
$I->clickSelect		($I, 'Gola'		);
$I->clickSelect		($I, 'Punho'	);
$I->clickSelect		($I, 'Ramado'	);
$I->clickSelect		($I, 'Tubular'	);

$I->clickActionForm	($I, 'Piquet 1.2 PA Tubular');
$I->canSeeInField	('#jky-product-name'	, 'Piquet 1.2 PA Tubular');
//$I->canSeeInField	('#jky-product-type'	, 'Tubular');
$I->canSeeInField	('#jky-start-date'		, '');
$I->canSeeInField	('#jky-peso'			, '0.00');
$I->canSeeInField	('#jky-units'			, '1');
//$I->canSeeImage		('100002');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'ftps');
$I->canSee			('200001');
$I->canSee			('50 Algodao, 50 Polyester');
$I->canSee			('condessa');

$I->logoff			($I);
