<?php

$I = new WebGuy($scenario);

$I->wantTo('test Sales page');
$I->resizeWindow(1400, 1000);

$I->amGoingTo('Log In page');
$I->amOnPage('/');
$I->waitForElement('#jky-log-form');
$I->see('Log In', '#jky-log-form');

$I->amGoingTo('Dashboard page');
$I->fillField('#jky-log-user-name', 'patjan');
$I->fillField('#jky-log-password' , 'brazil');
$I->wait(1);
$I->click('#jky-button-log-in');
$I->seeLink('Log Off');

$I->expect('Home page');
$I->amGoingTo('Sales page');
$I->wait(1);
$I->click('Sales');
$I->see('Quotations', 'span');

$I->amGoingTo('Sales - Quotations page');
$I->wait(1);
$I->click('#jky-sales-quotations');
$I->see('Quotations', '#jky-app-breadcrumb');

$I->wait(10);
