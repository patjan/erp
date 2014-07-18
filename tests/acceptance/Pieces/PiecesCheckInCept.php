<?php
$bar_code = '8000000026';
$date_time = date('m-d h:i');	//	adjust server time +4 hour

$I = new WebGuy		($scenario);

$I->wantTo			('test Pieces Check In page');
$I->login			($I, 'Pieces', 'User');

$I->clickMenu		($I, 'Pieces');
$I->clickBar		($I, 'Pieces', 'CheckIn');

$I->fillField		('#jky-barcode'			, $bar_code);
$I->pressKey		('#jky-barcode'			, WebDriverKeys::ENTER);

$I->fillField		('#jky-inspected-name'	, 'Marcelo');		//	cannot be Support
$I->pressKey		('#jky-inspected-name'	, WebDriverKeys::ENTER);

$I->fillField		('#jky-weighed-name'	, 'Bruno');			//	cannot be Support
$I->pressKey		('#jky-weighed-name'	, WebDriverKeys::ENTER);

$I->fillField		('#jky-remarks'			, 'Boa');
$I->pressKey		('#jky-remarks'			, WebDriverKeys::ENTER);

$I->fillField		('#jky-checkin-weight'	, '12.00');
$I->pressKey		('#jky-checkin-weight'	, WebDriverKeys::ENTER);

$I->fillField		('#jky-checkin-location', '1A01');
$I->pressKey		('#jky-checkin-location', WebDriverKeys::ENTER);

$I->fillField		('#jky-form-action'		, 'Save');
$I->pressKey		('#jky-form-action'		, WebDriverKeys::ENTER);

$I->wait(5);
$I->canSee			($bar_code);	
$I->canSee			('Meia Malha Mescla Cinza 88/12 Alvejado Tubular');
$I->canSee			('Marcelo');	
$I->canSee			('Bruno');	
$I->canSee			('Marcelo');	
//$I->canSee			($date_time);	
$I->canSee			('1A01');	
$I->canSee			('12.00');	
$I->canSee			('Boa');	
$I->wait(25);

$I->logoff			($I);