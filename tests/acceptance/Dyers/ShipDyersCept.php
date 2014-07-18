<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Ship Dyers page');
$I->login			($I, 'Dyers', 'User');

$I->clickMenu		($I, 'Dyers');
$I->clickBar		($I, 'Dyers', 'ShipDyers');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Draft'			);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Draft + Active'	);

$I->clickActionForm	($I, '8000000001');
$I->canSeeInField	('#jky-shipdyer-number'	, '8000000001');
$I->canSeeInField	('#jky-sds-printed'		, '0');
$I->canSeeInField	('#jky-invoice-number'	, '');
$I->canSeeInField	('#jky-dyer-name'		, 'A2');
$I->canSeeInField	('#jky-transport-name'	, 'propria');
$I->canSeeInField	('#jky-truck-license'	, '1ab123');
$I->canSeeElement	('#jky-shipped-date'	);
$I->canSeeElement	('#jky-delivered-date'	);
$I->canSeeInField	('#jky-unit-name'		, 'pecas');
$I->canSeeInField	('#jky-brand-name'		, 'tecido');
$I->canSeeInField	('#jky-batch-code'		, 'lote-8001');
$I->canSeeInField	('#jky-quantity'		, '20');
$I->canSeeInField	('#jky-gross-weight'	, '240');
$I->canSeeInField	('#jky-net-weight'		, '0.00');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'loadouts');
$I->canSee			('8000000002');
$I->canSee			('branco');	
$I->canSee			('06-03-2014');
$I->canSee			('06-06-2014');
$I->canSee			('15');

$I->logoff			($I);