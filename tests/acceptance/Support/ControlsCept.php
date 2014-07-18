<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Controls page');
$I->login			($I, 'Support', 'User');

$I->clickMenu		($I, 'Support');
$I->clickBar		($I, 'Support', 'Controls');

$I->clickSelect		($I, 'Company Types'		);
$I->clickSelect		($I, 'Languages'			);
$I->clickSelect		($I, 'Priorities'			);
$I->clickSelect		($I, 'Root'					);
$I->clickSelect		($I, 'Servers Host'			);
$I->clickSelect		($I, 'Status Codes'			);
$I->clickSelect		($I, 'Summary'				);
$I->clickSelect		($I, 'System Defaults'		);
$I->clickSelect		($I, 'System Numbers'		);
$I->clickSelect		($I, 'Template Types'		);
$I->clickSelect		($I, 'User Actions'			);
$I->clickSelect		($I, 'User Resources'		);
$I->clickSelect		($I, 'User Roles'			);
$I->clickSelect		($I, 'Ticket Categories'	);
$I->clickSelect		($I, 'Ticket Status Codes'	);
$I->clickSelect		($I, 'System Keys'			);

$I->clickActionForm	($I, 'Time Zone');
$I->canSeeInField	('#jky-status'			, 'Active');
$I->canSeeInField	('#jky-sequence'		, '100');
$I->canSeeInField	('#jky-name'			, 'Time Zone');
//$I->canSeeInField	('#jky-value'			, 'America/Sao_Paulo');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Copy');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'remarks');
$I->canSeeInField	('#jky-remarks'			, '');
$I->canSeeButton	($I, 'Save-Remarks');

$I->logoff			($I);
