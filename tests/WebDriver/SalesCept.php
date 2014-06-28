<?php
$I = new WebDriverGuy($scenario);

$I->wantTo('test Sales page');

$I->amGoingTo('Log In page');
$I->amOnPage('/');
$I->see('Log In', '#jky-log-form');

$I->amGoingTo('Home page');
$I->fillField('#jky-log-user-name', 'patjan');
$I->fillField('#jky-log-password' , 'brazil');
$I->click('#jky-button-log-in');
$I->seeLink('Log Off');

$I->expect('Home page');
$I->amGoingTo('Sales page');
$I->click('Sales');
$I->see('Quotations', 'span');

$I->amGoingTo('Sales - Quotations page');
$I->click('#jky-sales-quotations');
$I->see('Quotations', '#jky-app-breadcrumb');

$I->wait(10);

