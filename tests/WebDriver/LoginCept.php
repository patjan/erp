<?php

$I = new WebDriverGuy($scenario);

$I->wantTo('test Log In page');
$I->resizeWindow(1024, 900);

$I->amGoingTo('Log In page');
$I->amOnPage('/');
$I->see('Log In', '.modal-header');

$I->amGoingTo('Home page');
$I->fillField('#jky-log-user-name', 'patjan');
$I->fillField('#jky-log-password' , 'brazil');
$I->wait(3);
//$I->click('Log In');
$I->click('#jky-button-log-in');
$I->seeLink('Log Off');

$I->see('Home page');
$I->wait(10);
