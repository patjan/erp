<?php
class Singleton {
	public static function getInstance() {
		static $instance = null;
		if (null === $instance) {
			$instance = new static();
		}
		return $instance;
	}
	
	protected function __contruct() {
	}
	
	private function __clone() {
	}

	private function __wakeup() {
	}
}
?>