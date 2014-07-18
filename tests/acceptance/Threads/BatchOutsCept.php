<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Check Out Batches page');
$I->login			($I, 'Threads', 'User');

$I->clickMenu		($I, 'Threads');
$I->clickBar		($I, 'Threads', 'BatchOuts');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Draft'			);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Draft + Active'	);

$I->clickActionForm	($I, '200060');
$I->canSeeInField	('#jky-product-code'	, '');
$I->canSeeInField	('#jky-thread-name'		, '20/1 PA Cardado');
$I->canSeeInField	('#jky-batch-code'		, '6CL102');
$I->canSeeInField	('#jky-machine-name'	, 'isadora');
$I->canSeeInField	('#jky-partner-name'	, '');
$I->canSeeInField	('#jky-supplier-name'	, '');
$I->canSeeInField	('#jky-dyer-name'		, '');
$I->canSeeInField	('#jky-unit-price'		, '4.90');
$I->canSeeInField	('#jky-requested-weight', '2025.00');
$I->canSeeInField	('#jky-requested-boxes'	, '68');
$I->canSeeInField	('#jky-reserved-boxes'	, '0');
$I->canSeeInField	('#jky-average-weight'	, '29.79');
$I->canSeeInField	('#jky-checkout-weight'	, '0.00');
$I->canSeeInField	('#jky-checkout-boxes'	, '0');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'boxes');
$I->canSee			('1B02');
$I->canSee			('01-10-2014');
$I->canSee			('29.93');	
$I->canSee			('1');	
$I->canSee			('0');	

$I->logoff			($I);