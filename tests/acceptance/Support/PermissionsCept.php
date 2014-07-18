<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Permissions page');
$I->login 			($I, 'Support', 'User');

$I->clickMenu		($I, 'Support');
$I->clickBar		($I, 'Support', 'Permissions');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Visitor'			);
$I->clickSelect		($I, 'Guest'			);
$I->clickSelect		($I, 'Sales'			);
$I->clickSelect		($I, 'Sales Manager'	);
$I->clickSelect		($I, 'Boxes'			);
$I->clickSelect		($I, 'Dyers'			);
$I->clickSelect		($I, 'Fabrics'			);
$I->clickSelect		($I, 'Maintenance'		);
$I->clickSelect		($I, 'Pieces'			);
$I->clickSelect		($I, 'Planning'			);
$I->clickSelect		($I, 'Production'		);
$I->clickSelect		($I, 'Purchases'		);
$I->clickSelect		($I, 'Threads Manager'	);
$I->clickSelect		($I, 'Crus Manager'		);
$I->clickSelect		($I, 'Account'			);
$I->clickSelect		($I, 'Admin'			);
$I->clickSelect		($I, 'Support'			);

$I->clickActionForm	($I, 'Support');
$I->canSeeInField	('#jky-user-role'		, 'Support');
$I->canSeeInField	('#jky-user-resource'	, 'All');
$I->canSeeInField	('#jky-user-action'		, 'All');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->logoff			($I);
