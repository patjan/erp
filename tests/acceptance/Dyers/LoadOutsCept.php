<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Aggregate Load Out page');
$I->login			($I, 'Dyers', 'User');

$I->clickMenu		($I, 'Dyers');
$I->clickBar		($I, 'Dyers', 'LoadOuts');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Draft'			);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Draft + Active'	);

$I->clickActionForm	($I, '2000000001');
$I->canSeeInField	('#jky-loadout-number'	, '2000000001');
$I->canSeeInField	('#jky-dyer-name'		, 'A2');
$I->canSeeInField	('#jky-color-name'		, 'branco');
$I->canSeeElement	('#jky-requested-date'	);
$I->canSeeElement	('#jky-checkout-date'	);
$I->canSeeElement	('#jky-returned-date'	);
$I->canSeeInField	('#jky-requested-pieces', '0');
$I->canSeeInField	('#jky-checkout-pieces'	, '20');
$I->canSeeInField	('#jky-returned-pieces'	, '0');
$I->canSeeInField	('#jky-requested-weight', '0.00');
$I->canSeeInField	('#jky-checkout-weight'	, '246.10');
$I->canSeeInField	('#jky-returned-weight'	, '0.00');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'sales');
$I->canSee			('200001');
$I->canSee			('Tecno');	
$I->canSee			('Meia Malha Mescla Cinza 88/12 Alve');
$I->canSee			('20');
$I->canSee			('21');

$I->logoff			($I);