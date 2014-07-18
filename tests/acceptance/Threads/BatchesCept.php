<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Incoming Batches page');
$I->login			($I, 'Threads', 'User');

$I->clickMenu		($I, 'Threads');
$I->clickBar		($I, 'Threads', 'Batches');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);

$I->clickActionForm	($I, '0CR304'	);
$I->canSeeInField	('#jky-product-code'	, '');
$I->canSeeInField	('#jky-batch-code'		, '0CR304');
$I->canSeeInField	('#jky-labels-printed'	, '77');
$I->canSeeInField	('#jky-received-boxes'	, '77');
$I->canSeeInField	('#jky-checkin-boxes'	, '77');
$I->canSeeInField	('#jky-number-of-cones'	, '12');
$I->canSeeInField	('#jky-unit-price'		, '5.52');
$I->canSeeInField	('#jky-average-weight'	, '27.84');
$I->canSeeInField	('#jky-received-weight'	, '2143.32');
$I->canSeeInField	('#jky-checkin-weight'	, '2143.68');
$I->canSeeInField	('#jky-returned-weight'	, '0.00');
$I->canSeeInField	('#jky-checkout-weight'	, '1531.20');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'boxes');
$I->canSee			('0CR304');
$I->canSee			('2000024439');	
$I->canSee			('1');
$I->canSee			('12');
$I->canSee			('27.84');
$I->canSee			('0.00');
$I->canSee			('1B02');
$I->canSee			('audi');

$I->logoff			($I);