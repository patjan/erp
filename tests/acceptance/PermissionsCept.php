<?php

$my_company_name	= 'JKY-Software';

$I = new WebGuy		($scenario);

$I->wantTo			('test Log In page');
//$I->resizeWindow	(1280, 800);

$I->amGoingTo		('Log In page');
$I->amOnPage		('/');

$I->canSeeLayer		('Log In');

//	Visitor	--------------------------------------------------------------------
$I->JKY_login ($I, 'Visitor', 'User');
$I->JKY_logoff($I);

//	Guest ----------------------------------------------------------------------
$I->JKY_login ($I, 'Guest', 'User');
$I->canSeeLink('Help');
$I->JKY_logoff($I);

//	Sales ----------------------------------------------------------------------
$I->JKY_login ($I, 'Sales', 'User');
$I->canSeeLink('Sales');
$I->canSeeLink('Help');
$I->JKY_logoff($I);

$I->wait(5);

