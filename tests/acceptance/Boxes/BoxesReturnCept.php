<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Return page');
$I->login			($I, 'Boxes', 'User');

$I->clickMenu		($I, 'Boxes');
$I->clickBar		($I, 'Boxes', 'Return');

$I->fillField		('#jky-input-barcode'			, '2000000001');
$I->fillField		('#jky-input-number-of-cones'	, '12');
$I->fillField		('#jky-input-real-weight'		, '15.75');
$I->executeJS		("$('#jky-app-filter').focus();");

$I->canSee			('2000000001');
$I->canSee			('1');	
$I->canSee			('Check Out');
$I->canSee			('9AQWNV');	
$I->canSee			('1');	
$I->canSee			('12');	
$I->canSee			('33.01');	
$I->canSee			('15.75');	
$I->canSee			('APOLLO2');	
$I->canSee			('Coteminas');	
$I->canSee			('30/1 PA Cardado OE');	

$I->logoff			($I);