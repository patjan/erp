<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Configs page');
$I->login			($I, 'Admin', 'User');

$I->clickMenu		($I, 'Admin');
$I->clickBar		($I, 'Admin', 'Configs');

//$I->clickSelect		($I, 'Root'				);
$I->clickSelect		($I, 'System Controls'	);
$I->clickSelect		($I, 'Countries'		);
$I->clickSelect		($I, 'States'			);
$I->clickSelect		($I, 'Machine Brands'	);
$I->clickSelect		($I, 'Collections'		);
$I->clickSelect		($I, 'Color Types'		);
$I->clickSelect		($I, 'Cone Types'		);
$I->clickSelect		($I, 'Customer Tags'	);
$I->clickSelect		($I, 'Cylinders'		);
$I->clickSelect		($I, 'Machine Families'	);
$I->clickSelect		($I, 'Materials'		);
$I->clickSelect		($I, 'NFe Customer'		);
$I->clickSelect		($I, 'NFe Dyer'			);
$I->clickSelect		($I, 'NFe Partner'		);
$I->clickSelect		($I, 'Payment Terms'	);
$I->clickSelect		($I, 'Product Types'	);
$I->clickSelect		($I, 'QC Remarks'		);
$I->clickSelect		($I, 'Settings'			);
$I->clickSelect		($I, 'Thread Compositions');
$I->clickSelect		($I, 'Thread Groups'	);

$I->clickActionForm	($I, 'CO-Card/Pent');
$I->canSeeInField	('#jky-status'			, 'Active');
$I->canSeeInField	('#jky-sequence'		, '10');
$I->canSeeInField	('#jky-name'			, 'CO-Card/Pent');
$I->canSeeInField	('#jky-value'			, '');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Copy');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'remarks');
$I->canSeeInField	('#jky-remarks'			, '');
$I->canSeeButton	($I, 'Save-Remarks');

$I->logoff			($I);
