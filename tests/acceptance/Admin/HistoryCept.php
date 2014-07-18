<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test History page');
$I->login			($I, 'Admin', 'User');

$I->clickMenu		($I, 'Admin');
$I->clickBar		($I, 'Admin', 'History');

$I->clickSelect		($I, 'All'			);
$I->clickSelect		($I, 'Batches'		);
$I->clickSelect		($I, 'Translations'	);
$I->clickSelect		($I, 'Tickets'		);

$I->clickActionForm	($I, '200078');
$I->canSeeInField	('#jky-updated-at'		, '2014-05-15 00:29:41');
$I->canSeeInField	('#jky-updated-by'		, 'Pat Jan');
$I->canSeeInField	('#jky-parent-name'		, 'Tickets');
$I->canSeeInField	('#jky-parent-id'		, '200078');
$I->canSeeInField	('#jky-method'			, 'update');
//$I->canSeeInField	('#jky-history'			, 'status:Open=>Closed');

$I->logoff			($I);
