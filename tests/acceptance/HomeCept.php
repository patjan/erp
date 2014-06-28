<?php
$I = new WebGuy($scenario);
$I->wantTo('view Home page');
$I->amOnPage('/home.html');
$I->see('Files', 'span');
