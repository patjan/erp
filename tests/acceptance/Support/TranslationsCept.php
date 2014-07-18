<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Translations page');
$I->login 			($I, 'Support', 'User');

$I->clickMenu		($I, 'Support');
$I->clickBar		($I, 'Support', 'Translations');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Inactive'			);
$I->clickSelect		($I, 'Active'			);

$I->clickActionForm	($I, 'Active');
$I->canSeeInField	('#en_US', 'Active');
$I->canSeeInField	('#pt_BR', 'Ativo');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->logoff			($I);
