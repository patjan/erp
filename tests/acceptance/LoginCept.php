<?php

$my_company_name	= 'JKY-Software';
$my_user_name		= 'patjan';
$my_password		= 'brazil';
$my_full_name		= 'Pat Jan';

$I = new WebGuy		($scenario);

$I->wantTo			('test Log In page');
//$I->resizeWindow	(1280, 800);

$I->amGoingTo		('Log In page');
$I->amOnPage		('/');

$I->canSeeLayer		('Log In');
$I->canSeeImage		($my_company_name);
$I->canSeeInField	('#jky-log-user-name', '');
$I->canSeeInField	('#jky-log-password' , '');
$I->canSeeButton	('Log In');

$I->amGoingTo		('Dashboard page');
$I->fillField		('#jky-log-user-name', $my_user_name);
$I->fillField		('#jky-log-password' , $my_password );
$I->click			('#jky-button-log-in');
$I->canSeeLink		($my_full_name);
$I->canSeeLink		('Log Off');

$I->logoff			($I);
