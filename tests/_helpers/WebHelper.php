<?php
namespace Codeception\Module;

// here you can define custom functions for WebGuy 

class WebHelper extends \Codeception\Module
{
	public function seeButton($button_name) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->see($button_name, 'span');
	}

	public function seeLayer($layer_name) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->see($layer_name, '.modal-header');
	}

	public function seeImage($image_url) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->seeElement('//img[@src="/img/'.$image_url.'.png"]');
	}

	public function JKY_login($I, $the_first_name, $the_last_name) {
		$I->amGoingTo		($the_first_name . ' page');
		$I->fillField		('#jky-log-user-name', strtolower($the_first_name));
		$I->fillField		('#jky-log-password' , $the_first_name . $the_last_name);
		$I->click			('#jky-button-log-in');
		$I->canSeeLink		($the_first_name . ' ' .  $the_last_name);
	}

	public function JKY_logoff($I) {
		$I->amGoingTo		('Log Off page');
		$I->click			('Log Off');
		$I->canSeeLayer		('Log Off');
		$I->canSeeButton	('Log In');
		$I->amGoingTo		('Log In page');
		$I->click			('#jky-button-log-in');
		$I->canSeeLayer		('Log In');
	}
	
}
