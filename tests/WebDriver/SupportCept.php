<?php
$I = new WebDriverGuy($scenario);

$I->wantTo('test Support page');

$I->amGoingTo('Log In page');
$I->amOnPage('/');
$I->see('Log In', '#jky-log-form');

$I->amGoingTo('Home page');
$I->fillField('#jky-log-user-name', 'patjan');
$I->fillField('#jky-log-password' , 'brazil');
$I->click('#jky-button-log-in');
$I->seeLink('Log Off');

$I->expect('view Home page');
$I->amGoingTo('Support page');
$I->click('Support');
$I->see('Controls', 'span');

$I->amGoingTo('Support - Control page');
$I->click('#jky-support-controls');
$I->see('Controls', '#jky-app-breadcrumb');

$I->wait(10);

