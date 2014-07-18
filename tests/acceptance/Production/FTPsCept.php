<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test FTPs page');
$I->login			($I, 'Production', 'User');

$I->clickMenu		($I, 'Production');
$I->clickBar		($I, 'Production', 'FTPs');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Inverno 2014'		);
$I->clickSelect		($I, 'Verao 2014'		);
$I->clickSelect		($I, 'Verao 2015'		);

$I->clickActionForm	($I, '200281'	);
$I->canSeeInField	('#jky-ftp-number', '200281');
$I->canSeeElement	('#jky-start-date'		);
$I->canSeeInField	('#jky-product-name'	, 'meia malha flame modal tubular');
$I->canSeeInField	('#jky-composition'		, '75 Modal, 25 Polyester');
$I->canSeeInField	('#jky-machine-name'	, '200013');	//	Betina
$I->canSeeInField	('#jky-collection'		, 'Verao 2015');
$I->canSeeInField	('#jky-nick-name'		, '');
//$I->canSeeImage		('100002');
$I->canSeeInField	('#jky-diameter'		, '32');
$I->canSeeInField	('#jky-density'			, '28');
$I->canSeeInField	('#jky-inputs'			, '102');
$I->canSeeInField	('#jky-turns'			, '780');
$I->canSeeInField	('#jky-weight'			, '110');
$I->canSeeInField	('#jky-width'			, '115');
$I->canSeeInField	('#jky-speed'			, '25');
$I->canSeeInField	('#jky-peso'			, '12.50');
$I->canSeeElement	('#jky-has-break'		);
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Copy');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'composition');
$I->canSee			('Modal');
$I->canSee			('Polyester');	

$I->clickTab		($I, 'threads');
$I->canSee			('30/1 MODAL/PES Flame');
$I->canSee			('Cotan');	

$I->clickTab		($I, 'loads');
$I->canSee			('30/1 MODAL/PES Flame');

$I->clickTab		($I, 'settings');

$I->logoff			($I);