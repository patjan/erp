<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Templates page');
$I->login 			($I, 'Support', 'User');

$I->clickMenu		($I, 'Support');
$I->clickBar		($I, 'Support', 'Templates');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Inactive'			);
$I->clickSelect		($I, 'Active'			);

$I->clickActionForm	($I, 'Remind Me');
$I->canSeeInField	('#jky-updated-at'		, '2014-04-24 12:02:35');
$I->canSeeInField	('#jky-updated-name'	, 'Pat Jan');
$I->canSeeInField	('#jky-template-type'	, 'By Event');
$I->canSeeInField	('#jky-template-name'	, 'Remind Me');
$I->canSeeInField	('#jky-template-subject', 'Remind Me!');
$I->canSeeInField	('#jky-template-body'	, '');
$I->canSeeInField	('#jky-template-sql'	, '');
//$I->canSeeInField	('#jky-description'		, 'This email is automatically sent out when client requests [Remind Me] with valid email address or click [Send Access] on Users or Clients screens.');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->logoff			($I);
