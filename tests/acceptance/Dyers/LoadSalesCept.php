<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Load Out Sales page');
$I->login			($I, 'Dyers', 'User');

$I->clickMenu		($I, 'Dyers');
$I->clickBar		($I, 'Dyers', 'LoadSales');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Draft'			);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Draft + Active'	);

$I->clickActionForm	($I, '2000000001');
$I->canSeeInField	('#jky-loadout-number'	, '2000000001');
$I->canSeeInField	('#jky-dyer-name'		, 'A2');
$I->canSeeInField	('#jky-color-name'		, 'branco');
$I->canSeeInField	('#jky-sale-number'		, '200001');
$I->canSeeInField	('#jky-customer-name'	, 'Tecno');
$I->canSeeInField	('#jky-product-name'	, 'Meia Malha Mescla Cinza 88/12 Alvejado Tubular');
$I->canSeeInField	('#jky-requested-pieces', '20');
$I->canSeeInField	('#jky-reserved-pieces'	, '-1');
$I->canSeeInField	('#jky-checkout-pieces'	, '21');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'pieces');
$I->canSee			('1A01');
$I->canSee			('06-02-2014');	
$I->canSee			('120.90');
$I->canSee			('10');
$I->canSee			('0');

$I->logoff			($I);