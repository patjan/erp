<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Check In page');
$I->login			($I, 'Boxes', 'User');

$I->clickMenu		($I, 'Boxes');
$I->clickBar		($I, 'Boxes', 'CheckIn');

$I->fillField		('#jky-input-barcode', '2000000001');
$I->executeJS		("$('#jky-app-filter').focus();");

$I->canSee			('2000000001');
$I->canSee			('Check Out');
$I->canSee			('9AQWNV');	
$I->canSee			('1');	
$I->canSee			('12');	
$I->canSee			('33.01');	
$I->canSee			('0.00');	
$I->canSee			('APOLLO2');	
$I->canSee			('30/1 PA Cardado OE');	

$I->logoff			($I);