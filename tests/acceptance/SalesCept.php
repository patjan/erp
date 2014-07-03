<?php

$I = new WebGuy($scenario);

$I->wantTo		('test Sales page');
$I->login		($I, 'Sales', 'User');

$I->amGoingTo	('Sales page');
$I->wait		(1);
$I->click		('Sales');

$I->amGoingTo	('Sales - Customers page');
$I->wait		(1);
$I->click		('#jky-sales-customers');
$I->seeProgram	('Customers');

$I->selectOption('#jky-app-select', 'Active');
$I->wait		(1);
$I->selectOption('#jky-app-select', 'Inactive');
$I->wait		(1);
$I->selectOption('#jky-app-select', 'All');
$I->wait		(1);
$I->fillField	('#jky-app-filter', 'Tecno');
$I->click		('#jky-action-form');
$I->clickTab	($I, 'address');
$I->clickTab	($I, 'phones');
$I->clickTab	($I, 'contacts');
$I->wait		(2);

$I->amGoingTo	('Sales - Quotations page');
$I->wait		(1);
$I->click		('#jky-sales-quotations');
$I->seeProgram	('Quotations');

$I->amGoingTo	('select All status');
$I->selectOption('#jky-app-select', 'Draft');
$I->wait		(1);
$I->selectOption('#jky-app-select', 'Active');
$I->wait		(1);
$I->selectOption('#jky-app-select', 'Closed');
$I->wait		(1);
$I->selectOption('#jky-app-select', 'All');
$I->wait		(1);
$I->fillField	('#jky-app-filter', '200001');
$I->click		('#jky-action-form');
$I->clickTab	($I, 'lines');
$I->clickTab	($I, 'remarks');
$I->wait		(2);

$I->logoff		($I);