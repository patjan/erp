describe("Robot", function() {
	it("should run 5 meters and stop", function() {
//		jasmine.Clock.useMock();
		robot = new Robot();
		
		robot.runMeters(5);
//		jasmine.Clock.tick(5000);
		
		waitsFor(function() {
			return robot.motion == "stopped";
		}, "The robot should stop", 5000);
		
		runs(function() {
			expect(robot.meters).toBe(5);
		});
	});
});