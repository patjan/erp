function Robot() {
	this.meters = 0;
	this.motion = "stopped";
}

Robot.prototype.runMeters = function(meters) {
	var timeToRun = meters * 1000 * Math.random();
	
	robot = this;
	robot.motion = "running";
	
	setTimeout(function() {
		robot.motion = "stopped";
		robot.meters = meters;
	}, timeToRun);
}