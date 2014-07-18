<?php
$bar_code = '2000000001';
$date_time = date('m-d h:i');	//	adjust server time +4 hour

$I = new WebGuy		($scenario);

$I->wantTo			('test Pieces Check Out page');
$I->login			($I, 'Pieces', 'User');

$I->clickMenu		($I, 'Pieces');
$I->clickBar		($I, 'Pieces', 'CheckOut');

$I->clickActionForm	($I, $bar_code);
$I->canSeeInField	('#jky-loadout-number'	, $bar_code);
$I->canSeeInField	('#jky-dyer-name'		, 'A2');
$I->canSeeInField	('#jky-color-name'		, 'branco');
$I->canSeeInField	('#jky-sale-number'		, '200001');
$I->canSeeInField	('#jky-checkin-location', '2B02');
$I->canSeeInField	('#jky-customer-name'	, 'Tecno');
$I->canSeeInField	('#jky-product-name'	, 'Meia Malha Mescla Cinza 88/12 Alvejado Tubular');
$I->canSeeElement	('#jky-requested-date'	);
$I->canSeeInField	('#jky-requested-pieces', '');
$I->canSeeInField	('#jky-reserved-pieces'	, '-1');
$I->canSeeInField	('#jky-average-weight'	, '');
$I->canSeeInField	('#jky-checkout-weight'	, '');
$I->canSeeInField	('#jky-checkout-pieces'	, '21');

$I->logoff			($I);