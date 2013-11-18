<?php
abstract class SingletonBase {
	private static $storage = array();

	public static function Singleton($class) {
		if (in_array($class, self::$storage)) {
			return self::$storage[$class];
		}
		return self::$storage[$class] = new $class();
	}

	public static function storage() {
		return self::$storage;
	}
}
?>