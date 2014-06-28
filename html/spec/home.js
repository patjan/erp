describe("home.js", function() {
	var timerCallback;

	beforeEach(function() {
		timerCallback = jasmine.createSpy("timerCallback");
		jasmine.clock().install();
	});

	afterEach(function() {
		jasmine.clock().uninstall();
	});
  
	it("should define object JKY"					, function() {expect(JKY			).toBeDefined();});
	it("should define object JKY.AJAX_APP"			, function() {expect(JKY.AJAX_APP	).toBeDefined();});
	it("should define object JKY.AJAX_URL"			, function() {expect(JKY.AJAX_URL	).toBeDefined();});

	describe("test JKY.fix_flag", function() {
		it("empty should return empty"				, function() {expect(JKY.fix_flag(					)).toEqual('&nbsp;'	 );});
		it("null should return empty"				, function() {expect(JKY.fix_flag(null				)).toEqual('&nbsp;'	 );});
		it("'t' should return true"					, function() {expect(JKY.fix_flag('t', true, false	)).toBeTruthy		();});
		it("'f' should return false"				, function() {expect(JKY.fix_flag('f', true, false	)).toBeFalsy		();});
		it("'t' should return Yes"					, function() {expect(JKY.fix_flag('t', 'Yes', 'No'	)).toEqual('Yes'	 );});
		it("'f' should return No"					, function() {expect(JKY.fix_flag('f', 'Yes', 'No'	)).toEqual('No'		 );});
		it("'x' should return Any"					, function() {expect(JKY.fix_flag('x', 'Yes', 'Any'	)).toEqual('Any'	 );});
	});

});
